import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import UserSession from "./userSession";
import React, { Component } from "react";
import {common} from "@material-ui/core/colors";

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

class UserProfile extends React.Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        this.state = { disabled: true }
        this.onChange = this.onChange.bind(this);
        this.switchToEdit = this.switchToEdit.bind(this);

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })

        if(this.state.contact.length>10) {
            document.getElementById("InvalidContactAlert").style.display = "block";
        }else{
            document.getElementById("InvalidContactAlert").style.display = "none";
        }


    }

    componentDidMount() {
        const user = UserSession.getName();

      axios.get(`http://localhost:8087/user/getUser/${user}`)
           .then(response => {
               this.setState({email:response.data.data.email})
               console.log(response.data.data)
           })
           .catch(error => {
               alert(error.message)
           })

    }

    switchToEdit(e) {
       console.log("rrr");
        this.setState( {disabled: !this.state.disabled} )



    }


    render(){
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
                    <h5 htmlFor="title"  className="form-label mb-4" style={{textAlign:"center"}}>Profile</h5>
                 <label onClick={this.switchToEdit}>Edit</label>

                    <form onSubmit={this.onSubmit}>

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
                                                    disabled = {(this.state.disabled)? "disabled" : ""}
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
                                        disabled = {(this.state.disabled)? "disabled" : ""}
                                        required
                                    />
                                    <label htmlFor="email" className="form-label">Email</label>
                                </div>
                            </div>

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


                            </div>
                            {/*{
                                    this.state.isSignUp && (
                                        <a href="#" onClick={this.switchSignIn}>Already Have an Account? Click here for
                                            Sign In</a>
                                    )
                                }
                                <a href="#" onClick={this.switchSignUp}>Do Not have an Account? Click here for
                                    Sign Up</a>*/}
                            <br/>

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

export default UserProfile;