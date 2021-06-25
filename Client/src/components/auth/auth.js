import axios from "axios";

import Select from "react-select";

import React, { Component } from "react";

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
            alert("mBILE nUMBER SHOULD BE LESS THAN 10 DIGITS")
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
    }

    switchSignUp(e){
        this.setState({isSignUp:true})
        this.setState({email:''})
        this.setState({password:''})

    }

    onSubmit(e){
        e.preventDefault();

        if(this.state.isSignUp) {

            if (this.state.password != this.state.confirmPassword) {
                document.getElementById("InvalidPasswordMatchAlert").style.display = "block";
            } else {
                document.getElementById("InvalidPasswordMatchAlert").style.display = "none";
                let user = {
                    name: this.state.firstName + this.state.lastName,
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
                         alert("Successfully Added")
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
                    alert("Successfully "+response.data.data.name)
                    if(response.data.data.role == "Attendee"){
                        window.location = `/attendee/${response.data.data._id}`
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
            <div className="container"><br/>
                <center> <div className="col-md-4 ml-auto mr-auto">
                    <div className={"card p-4"} >
                        <div className="alert alert-danger" role="alert" style={{display:"none"}} id="InvalidContactAlert">
                          Invalid Contact Number!
                        </div>
                        <div className="alert alert-danger" role="alert" style={{display:"none"}} id="InvalidPasswordMatchAlert">
                           Password and Confirm Passwords are mismatched!
                        </div>
                        <h5 htmlFor="title"  className="form-label mb-4" style={{textAlign:"center"}}>{this.state.isSignUp ? 'Sign Up' : 'Sign In'}</h5>

                        <form onSubmit={this.onSubmit}>
                            {
                                this.state.isSignUp && (
                                    <div className={"row"}>
                                        <div className={"col-md-6"}>
                                            <div className="mb-3" style={{textAlign: "left"}}>
                                                <div className="form-floating">
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

                            {/* <div className="card-footer">*/}

                            <div className="row">

                                <div className="col-md-12" style={{textAlign:"center"}}>
                                   {/* {
                                        this.state.isSignUp && (
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        )
                                    }
                                    <button type="submit" className="btn btn-primary">Sign In</button>*/}

                                    { this.state.isSignUp ?   <button type="submit" className="btn btn-primary">Submit</button> :    <button type="submit" className="btn btn-primary">Sign In</button>}
                                </div>
                                {/*{
                                    this.state.isSignUp && (
                                        <a href="#" onClick={this.switchSignIn}>Already Have an Account? Click here for
                                            Sign In</a>
                                    )
                                }
                                <a href="#" onClick={this.switchSignUp}>Do Not have an Account? Click here for
                                    Sign Up</a>*/}
                                { this.state.isSignUp ? <a href="#" onClick={this.switchSignIn}>Already Have an Account? Click here for
                                    Sign In</a> :  <a href="#" onClick={this.switchSignUp}>Do Not have an Account? Click here for
                                    Sign Up</a>}
                            </div>


                            {/* </div>*/}


                        </form>

                    </div>
                </div>
                </center>
            </div>

        )
    }

}

export default Auth;