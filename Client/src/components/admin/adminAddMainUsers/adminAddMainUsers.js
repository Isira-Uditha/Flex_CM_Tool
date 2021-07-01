import React, { Component } from "react";
import Swal from "sweetalert2";
import Select from 'react-select';
import axios from "axios";
import UserSession from "../../auth/userSession";

const options = [
    { value: 'Editor', label: 'Editor' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Reviewer', label: 'Reviewer' },
    { value: 'Researcher', label: 'Researcher' },
    { value: 'Attendee', label: 'Attendee' },
    { value: 'WorkShopPresenter', label: 'WorkShop Presenter' },

]

const initialState = {
    users: [],
    id:'null',
    firstName: '',
    lastName: '',
    name: '',
    email: '',
    password: '',
    contact: '',
    address: '',
    organization: '',
    role: 'null',
    confirmPassword:'',
    fetchedData: [],
    alert: [],
    alert_type: 'alert-success',
    hidden: 'hidden',
    fetchedRole: 'Select the role',

}

class AdminAddMainUsers extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.selectRole = this.selectRole.bind(this);
        this.state = initialState;
        this.validateContactNumber = this.validateContactNumber.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount() {
        const user = UserSession.getName();

        if (user == 'null') {
            window.location = '/auth';
        }


        axios.get(`http:localhost:8087/adminMainUser/getUser/${user}`).then(response => {
            this.setState({users: response.data.data});
            // this.setState({id: this.state.users.id});
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.userId != prevProps.userId) {
            this.setState({id: this.props.userId}, this.fetchData);
        }
    }

    fetchData() {
        console.log('mmmm');
        axios.get(`https://flexconferencetool.herokuapp.com/adminMainUser/getUser/${this.state.id}`).then(response =>{
            console.log('Userdafa',response.data.data);
            this.setState({fetchedData: response.data.data});
            // this.setState({firstName: response.data.data.firstName});
            // this.setState({lastName: response.data.data.lastName});
            this.setState({name: response.data.data.name});
            this.setState({email: response.data.data.email});
            this.setState({password: response.data.data.password});
            this.setState({contact: response.data.data.contact});
            this.setState({address: response.data.data.address});
            this.setState({organization: response.data.data.organization});
            this.setState({role: response.data.data.role});
            const names = this.state.name.split(" ");
            this.setState({firstName: names[0]});
            this.setState({lastName: names[1]});
            this.state.fetchedRole=this.state.role

        })
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    validateContactNumber(e) {
        console.log(e.target.value.length);
        if (e.target.value.length > 10) {
            alert("Insert a valid contact with ten digits.")
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})

        if (this.state.contact.length > 10) {
            document.getElementById("InvalidContactAlert").style.display = "block";
        } else {
            document.getElementById("InvalidContactAlert").style.display = "none";
        }
    }

    selectRole(e) {
        this.setState({role: e.value})
        console.log("Author Selected :", this.state.role)
    }

    onSubmit(e) {

        e.preventDefault();
        if (this.state.contact.length < 10) {
            document.getElementById("InvalidContactAlert").style.display = "block";
        } else {
            let admin = {
                name: this.state.firstName + " " + this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                contact: this.state.contact,
                address: this.state.address,
                organization: this.state.organization,
                role: this.state.role
            };
            console.log('DATA TO SEND', admin);
            axios.post('https://flexconferencetool.herokuapp.com/adminMainUser/createMainUser', admin)
                .then(response => {
                    Swal.fire(
                        'Successful!',
                        'Record successfully inserted!',
                        'success'
                    )
                    setTimeout(()=>{
                        window.location.reload();
                    },3000)
                   //adding data to the database
                })
                .catch(error => {
                    console.log(error.message);
                    alert(error.message)
                })
        }
    }


    onUpdate(e) {
        e.preventDefault();
        let submission = {
            name: this.state.firstName + " " + this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            contact: this.state.contact,
            address: this.state.address,
            organization: this.state.organization,

        }
        if(this.state.role != 'null'){
           submission.role= this.state.role
        } else{
            submission.role = this.state.fetchedRole
        }

        console.log('data to update', submission);
        // let res = this.validation(submission);

        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Save`,
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                // if (res) {
                    console.log('UPDATE DATA', submission);
                    axios.patch(`https://flexconferencetool.herokuapp.com/adminMainUser/updateUser/${this.state.id}`, submission).then(response => {
                        console.log(response);
                        Swal.fire('Saved!', '', 'success')
                        // this.onReset();
                        setTimeout(()=>{
                            window.location.reload();
                        }, 3000);
                    }).catch(error => {
                        console.log(error.message);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!'
                        })
                    })
                // }
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info');
            } else {
                this.onReset();
            }
        })
    }

    render() {
        return (
            <div className="container">
                <br/><br/><br/><br/>
                <div className="card p-4">
                    <div className="alert alert-danger" role="alert" style={{display: "none"}} id="InvalidContactAlert">
                        Invalid Contact Number! Contact Number should contain 10 digits
                    </div>
                    <div className="alert alert-danger" role="alert" style={{display: "none"}}
                         id="InvalidPasswordMatchAlert">
                        Password and Confirm Passwords are mismatched!
                    </div>
                    <form
                            {...(this.state.id === 'null' ? {onSubmit: this.onSubmit} : {onSubmit: this.onUpdate})}
                            encType="multipart/form-data">

                            <div className="row">
                                <h5 className={"text-start mb-3"}>User Form</h5>
                                <div className="col-md-6">
                                    <div className="mb-3" style={{textAlign: "left"}}>
                                        <label htmlFor="file" className="form-label">First Name</label>

                                        <input type="text"
                                               id="firstName"
                                               name="firstName"
                                               className="form-control"
                                               placeholder=""
                                               value={this.state.firstName}
                                               onChange={this.onChange}
                                               required
                                        />


                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3" style={{textAlign: "left"}}>
                                        <label htmlFor="file" className="form-label">Last Name</label>
                                        <input type="text"
                                               id="lastName"
                                               name="lastName"
                                               className="form-control"
                                               placeholder=""
                                               value={this.state.lastName}
                                               onChange={this.onChange}
                                               required
                                        />
                                    </div>
                                </div>


                                <div className="col-md-6">
                                    <div className="mb-3" style={{textAlign: "left"}}>
                                        <label htmlFor="file" className="form-label">Email</label>
                                        <input type="email"
                                               id="email"
                                               name="email"
                                               className="form-control"
                                               placeholder=""
                                               value={this.state.email}
                                               onChange={this.onChange}
                                               required
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3" style={{textAlign: "left"}}>
                                        <label htmlFor="file" className="form-label">Password</label>
                                        <input type="password"
                                               name="password"
                                               className="form-control"
                                               placeholder=""
                                               value={this.state.password}
                                               onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3" style={{textAlign: "left"}}>
                                        <label htmlFor="file" className="form-label">Contact</label>
                                        <input type="contact"
                                               name="contact"
                                               className="form-control"
                                               placeholder="Contact"
                                               value={this.state.contact}
                                               onChange={this.onChange}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3" style={{textAlign: "left"}}>
                                        <label htmlFor="file" className="form-label">Address</label>
                                        <input type="text"
                                               name="address"
                                               className="form-control"
                                               placeholder=""
                                               value={this.state.address}
                                               onChange={this.onChange}
                                               required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3" style={{textAlign: "left"}}>
                                        <label htmlFor="file" className="form-label">Organization</label>
                                        <input type="organization"
                                               name="organization"
                                               className="form-control"
                                               placeholder=""
                                               value={this.state.organization}
                                               onChange={this.onChange}
                                               required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3" style={{textAlign: "left"}}>
                                        <label htmlFor="file" className="form-label">Role</label>
                                        <Select
                                            classNamePrefix="select"
                                            name="selectedRole"
                                            className="form-control"
                                            placeholder={this.state.fetchedRole}
                                            onChange={this.selectRole}
                                            options={options}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="card-footer">
                                <div className="row">
                                    <div className="col-md-12" style={{textAlign: "right"}}>
                                        {(() => {
                                            if (this.state.id === 'null') {
                                                return <button type="submit" className="btn btn-primary">Submit</button>
                                            } else {
                                                return <button type="submit" className="btn btn-primary">Update</button>
                                            }
                                        })()}
                                        &nbsp;
                                        &nbsp;
                                        &nbsp;

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
