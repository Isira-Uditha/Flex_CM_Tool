import React, { Component } from "react";
import Swal from "sweetalert2";
import Select from 'react-select';
import axios from "axios";
import * as RoleTypes from "../../auth/rolesTypes.constants"
import UserSession from "../../auth/userSession";

const options = [
    { value: 'Editor', label: 'Editor' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Reviewer', label: 'Reviewer' }
]

const initialState = {
    // firstName: '',
    // lastName: '',
    name: '',
    email: '',
    password: '',
    contact: '',
    address: '',
    organization: '',
    role: '',
    confirmPassword:''

}

class AdminAddMainUsers extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.selectRole = this.selectRole.bind(this);
        this.state = initialState;
        // this.validateContactNumber = this.validateContactNumber.bind(this);
    }

    // validateContactNumber(e){
    //     console.log(e.target.value.length);
    //     if(e.target.value.length>10) {
    //         alert("Insert a valid contact with ten digits.")
    //     }
    // }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })

        if(this.state.contact.length>10) {
            document.getElementById("InvalidContactAlert").style.display = "block";
        }else{
            document.getElementById("InvalidContactAlert").style.display = "none";
        }
    }

    selectRole(e) {
        this.setState({role:e.value})
        console.log("Author Selected :",this.state.role)
    }

    onSubmit(e) {
        e.preventDefault();
        let admin = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.payload,
            contact: this.state.contact,
            address: this.state.address,
            organization: this.state.organization,
            role: this.state.role
        };
        console.log('DATA TO SEND', admin);
        // axios.post('http://localhost:8087/adminMainUser/createMainUser', admin)
        //     .then(response => {
        //         alert('Data successfully added') //adding data to the database
        //     })
        //     .catch(error => {
        //         console.log(error.message);
        //         alert(error.message)
        //     })
    }

    render() {
        return(
            <div className="container">
                <br/><br/><br/><br/>
                <div className="card p-4">
                    <form onSubmit={this.onSubmit}>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3" style={{textAlign: "left"}}>
                                    <label htmlFor="file" className="form-label">First Name</label>
                                    <div className="form-floating mb-3">
                                        <input type="text"
                                               id="name"
                                               name="name"
                                               className="form-control"
                                               placeholder=""
                                               value={this.state.name}
                                               onChange={this.onChange}
                                               required
                                        />
                                        <label htmlFor="title">name</label>
                                    </div>
                                </div>
                            </div>
                            {/*<div className="col-md-6">*/}
                            {/*    <div className="mb-3" style={{textAlign: "left"}}>*/}
                            {/*        <label htmlFor="file" className="form-label">Last Name</label>*/}
                            {/*        <div className="form-floating mb-3">*/}
                            {/*            <input type="text"*/}
                            {/*                   id="lastName"*/}
                            {/*                   name="lastName"*/}
                            {/*                   className="form-control"*/}
                            {/*                   placeholder=""*/}
                            {/*                   value={this.state.lastName}*/}
                            {/*                   onChange={this.onChange}*/}
                            {/*                   required*/}
                            {/*            />*/}
                            {/*            <label htmlFor="title">First Name</label>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}


                            <div className="col-md-6">
                                <div className="mb-3" style={{textAlign: "left"}}>
                                    <label htmlFor="file" className="form-label">Email</label>
                                    <div className="form-floating">
                                        <input type="email"
                                               id="email"
                                               name="email"
                                               className="form-control"
                                               placeholder=""
                                               value={this.state.email}
                                               onChange={this.onChange}
                                               required
                                        />
                                        <label htmlFor="type">Email</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3" style={{textAlign: "left"}}>
                                    <label htmlFor="file" className="form-label">Password</label>
                                    <div className="form-floating mb-3">
                                        <input type="password"
                                               name="password"
                                               className="form-control"
                                               placeholder=""
                                               value={this.state.password}
                                               onChange={this.onChange}
                                        />
                                        <label htmlFor="title">Password</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3" style={{textAlign: "left"}}>
                                    <label htmlFor="file" className="form-label">Contact</label>
                                    <div className="form-floating">
                                        <input type="contact"
                                               name="contact"
                                               className="form-control"
                                               placeholder="Contact"
                                               value={this.state.contact}
                                               onChange={this.onChange}
                                        />
                                        <label htmlFor="type">Contact</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3" style={{textAlign: "left"}}>
                                    <label htmlFor="file" className="form-label">Address</label>
                                    <div className="form-floating mb-3">
                                        <input type="text"
                                               name="address"
                                               className="form-control"
                                               placeholder=""
                                               value={this.state.address}
                                               onChange={this.onChange}
                                               required
                                        />
                                        <label htmlFor="title">Address</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3" style={{textAlign: "left"}}>
                                    <label htmlFor="file" className="form-label">Organization</label>
                                    <div className="form-floating">
                                        <input type="organization"
                                               name="organization"
                                               className="form-control"
                                               placeholder=""
                                               value={this.state.organization}
                                               onChange={this.onChange}
                                               required
                                        />
                                        <label htmlFor="type">Organization</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3" style={{textAlign: "left"}}>
                                    <label htmlFor="file" className="form-label">Role</label>
                                    <div className="form-floating">
                                        <Select

                                            classNamePrefix="select"
                                            name="selectedRole"
                                            className="form-control"
                                            placeholder={"Select the Role"}
                                            onChange={this.onRoleSelect}
                                            options={options}
                                            required
                                        />
                                        <label htmlFor="type"></label>
                                    </div>
                                </div>
                            </div>


                        </div>


                        <br/>

                        <div className="card-footer">
                            <div className="row">
                                <div className="col-md-12" style={{textAlign: "right"}}>
                                    {/*{(() => {*/}
                                    {/*    if (this.state.post_id === 'null') {*/}
                                    {/*        return <button type="submit" className="btn btn-primary">Submit</button>*/}
                                    {/*    } else {*/}
                                    {/*        return <button type="submit" className="btn btn-primary">Update</button>*/}
                                    {/*    }*/}
                                    {/*})()}*/}

                                    <button className="btn btn-success" onClick={this.onReset}>Clear</button>
                                    &nbsp;
                                    <button type="submit" className="btn btn-primary">Submit</button>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        )
    }

}

export default AdminAddMainUsers;