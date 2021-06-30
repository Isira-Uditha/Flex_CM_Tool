import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import UserSession from "./userSession";
import React, { Component } from "react";
import {common} from "@material-ui/core/colors";
import * as RoleTypes from "./rolesTypes.constants"

const options = [
    { value: 'Attendee', label: 'Attendee' },
    { value: 'WorkShopPresenter', label: 'WorkShop Presenter' },
    { value: 'Researcher', label: 'Researcher' }
]

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contact: '',
    address: '',
    organization: '',
    selectedRole: '',
    confirmPassword: '',
    isSignUp: false
}

class Auth extends React.Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.switchSignIn = this.switchSignIn.bind(this);
        this.switchSignUp = this.switchSignUp.bind(this);
        this.onRoleSelect = this.onRoleSelect.bind(this);
        this.validateContactNumber = this.validateContactNumber.bind(this);
    }

    validateContactNumber(e){
        console.log(e.target.value.length);
        if(e.target.value.length>10) {
            alert("MOBILE nUMBER SHOULD BE LESS THAN 10 DIGITS")
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })

        if(this.state.contact.length>10) {
            document.getElementById("InvalidContactAlert").style.display = "block";
        }else{
            document.getElementById("InvalidContactAlert").style.display = "none";
        }
    }

    onRoleSelect(e) {
        this.setState({selectedRole:e.value})
        console.log("Author Selected :",this.state.selectedRole)
    }

    switchSignIn(e){
        this.setState({isSignUp:false})
        this.setState({email:''})
        this.setState({password:''})
    }

    switchSignUp(e){
        this.setState({isSignUp:true})
        this.setState({email:''})
        this.setState({password:''})

    }

    onSubmit(e){
        e.preventDefault();

        if(this.state.isSignUp) {
           const { value } = this.state.password;
            const re = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\\w\\s]).{8,}$");
            const isOk = re.test(this.state.password);

            if (!isOk) {
                document.getElementById("WeakPasswordMatchAlert").style.display = "block";
            }else if (this.state.password != this.state.confirmPassword) {
                document.getElementById("InvalidPasswordMatchAlert").style.display = "block";
            }else if(this.state.contact.length<10){
                document.getElementById("InvalidContactAlert").style.display = "block";
            }
            else {
                document.getElementById("InvalidPasswordMatchAlert").style.display = "none";
                document.getElementById("WeakPasswordMatchAlert").style.display = "none";
                let user = {
                    name: this.state.firstName + " " + this.state.lastName,
                    email: this.state.email,
                    password: this.state.password,
                    contact: this.state.contact,
                    address: this.state.address,
                    organization: this.state.organization,
                    role: this.state.selectedRole,

                };
                console.log("Data to Send ", user);
                 axios.post('http://localhost:8087/user/create', user)
                     .then(response => {
                         Swal.fire({
                             icon: 'success',
                             title: 'Welcome to Flex Conference',
                             text: 'Your account is successfully created as Attendee',
                         })
                         this.setState({isSignUp:false})
                     })
                     .catch(error => {
                         console.log(error.message)
                         alert(error.message)
                     })
            }
        }else{

            let user = {
                email: this.state.email,
                password: this.state.password,
            };
            axios.post('http://localhost:8087/user/login', user)
                .then(response => {
                    UserSession.setName(response.data.data._id)
                    UserSession.setRole(response.data.data.role)

                    if(response.data.data.role == RoleTypes.ATTENDEE){
                        window.location = `/attendee`
                    }else if(response.data.data.role == RoleTypes.RESEARCHER){
                        window.location = `/userPage`
                    }else if(response.data.data.role == RoleTypes.WORKSHOP_PRESENTEE){
                        window.location = `/presenter`
                    }else if(response.data.data.role == RoleTypes.ADMIN){
                        /*window.location = `/attendee`*/
                    }else if(response.data.data.role == RoleTypes.REVIEWER){
                        window.location = `/reviewer`
                    }else if(response.data.data.role == RoleTypes.EDITOR){
                        window.location = `/conference`
                    }
                })
                .catch(error => {
                    console.log(error.message)
                    alert(error.message)
                })
            console.log("Data to Send ", user);
        }
    }
    render() {
        return(
            <div className="container"><br/><br/><br/><br/>
                <center> <div className="col-md-4 ml-auto mr-auto" >
                    <div className={"card p-4"} style={{background:"rgb(255,255,255,0.5)"}} >
                        <div className="alert alert-danger" role="alert" style={{display:"none"}} id="InvalidContactAlert">
                          Invalid Contact Number! Contact Number should contain 10 digits
                        </div>
                        <div className="alert alert-danger" role="alert" style={{display:"none"}} id="InvalidPasswordMatchAlert">
                           Password and Confirm Passwords are mismatched!
                        </div>
                        <div className="alert alert-danger" role="alert" style={{display:"none"}} id="WeakPasswordMatchAlert">
                           Password must cotain At least one upper case English letter, one lower case, one digit, one special character  and Minimum eight in length
                        </div>
                        <h5 htmlFor="title"  className="form-label mb-4" style={{textAlign:"center"}}>{this.state.isSignUp ? 'Sign Up' : 'Sign In'}</h5>

                        <form onSubmit={this.onSubmit}>
                            {
                                this.state.isSignUp && (
                                    <div className={"row"}>
                                        <div className={"col-md-6"}>
                                            <div className="mb-3" style={{textAlign: "left"}}>
                                                <div className="form-floating" >
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="firstName"
                                                        name="firstName"
                                                        placeholder="First Name"
                                                        value={this.state.firstName}
                                                        onChange={this.onChange}
                                                        required
                                                    />
                                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={"col-md-6"}>
                                            <div className="mb-3" style={{textAlign: "left"}}>
                                                <div className="form-floating">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="lastName"
                                                        name="lastName"
                                                        placeholder="LastName"
                                                        value={this.state.lastName}
                                                        onChange={this.onChange}
                                                        required
                                                    />
                                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div className={"row"}>
                                <div className="mb-3" style={{textAlign:"left"}}>
                                    <div className="form-floating">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder="name@example.com"
                                            value={this.state.email}
                                            onChange={this.onChange}
                                            required
                                        />
                                        <label htmlFor="email" className="form-label">Email</label>
                                    </div>
                                </div>
                                {
                                    this.state.isSignUp && (
                                        <div className="mb-3" style={{textAlign: "left"}}>
                                            <div className="form-floating">
                                                <input
                                                    type="Number"
                                                    className="form-control"
                                                    id="contact"
                                                    name="contact"
                                                    placeholder="0716525135"
                                                    pattern="^\d{10}$"
                                                    value={this.state.contact}
                                                    onChange={this.onChange}
                                                    required

                                                /><label htmlFor="contactNumber" className="form-label">Contact
                                                Number</label>
                                            </div>
                                        </div>
                                    )
                                }

                                {
                                    this.state.isSignUp && (
                                        <div className="mb-3" style={{textAlign: "left"}}>
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="address"
                                                    name="address"
                                                    placeholder="Example Place , Example Country"
                                                    value={this.state.address}
                                                    onChange={this.onChange}
                                                    required

                                                />
                                                <label htmlFor="address" className="form-label">Address</label>
                                            </div>
                                        </div>
                                    )
                                }

                                {
                                    this.state.isSignUp && (
                                        <div className="mb-3" style={{textAlign: "left"}}>
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="organization"
                                                    name="organization"
                                                    placeholder="OrganizationName"
                                                    value={this.state.organization}
                                                    onChange={this.onChange}
                                                    required

                                                />
                                                <label htmlFor="organization"
                                                       className="form-label">Organization</label>
                                            </div>
                                        </div>
                                    )
                                }

                                {
                                    this.state.isSignUp && (
                                        <div className="mb-3" style={{textAlign: "left"}}>
                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                name="selectedRole"
                                                placeholder={"Select the Role"}
                                                onChange={this.onRoleSelect}
                                                options={options}
                                                required
                                            />

                                        </div>
                                    )
                                }

                                <div className="mb-3" style={{textAlign:"left"}}>
                                    <div className="form-floating">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        required

                                    />
                                        <label htmlFor="password" className="form-label">Password</label>
                                    </div>
                                </div>

                                {
                                    this.state.isSignUp && (
                                        <div className="mb-3" style={{textAlign: "left"}}>
                                            <div className="form-floating">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    placeholder="ConfirmPassword"
                                                    value={this.state.confirmPassword}
                                                    onChange={this.onChange}
                                                    required
                                                />
                                                <label htmlFor="confirmPassword" className="form-label">Confirm
                                                    Password</label>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>

                            <div className="row">
                                <div className="col-md-12" style={{textAlign:"center"}}>
                                    { this.state.isSignUp ?   <button type="submit" className="btn btn-primary">Sign Up</button> :    <button type="submit" className="btn btn-primary">Sign In</button>}
                                </div>
                                <br/>      <br/>
                                { this.state.isSignUp ? <a href="#" onClick={this.switchSignIn}>Already Have an Account? Click here for
                                    Sign In</a> :  <a href="#" onClick={this.switchSignUp}>Do Not have an Account? Click here for
                                    Sign Up</a>}
                            </div>
                        </form>
                    </div>
                </div>
                </center>
            </div>
        )
    }
}

export default Auth;