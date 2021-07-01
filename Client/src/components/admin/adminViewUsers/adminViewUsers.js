import React, { Component } from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Swal from "sweetalert2";


const initialState = {
    users: [],
    id: '',
    name: '',
    email: '',
    password: '',
    contact: '',
    address: '',
    organization: '',
    role:''
}

class All_Users extends React.Component {
    constructor(props) {
        super(props);
        this.deleteUsers = this.deleteUsers.bind(this);
        this.state = initialState;

    }

    componentDidMount() {
        axios.get('https://flexconferencetool.herokuapp.com/adminMainUser/')
            .then(response => {
                this.setState({ users: response.data.data });
                console.log(this.state.users);
            });
    }

    deleteUsers(e,value) {
        console.log(value);
        axios.delete(`https://flexconferencetool.herokuapp.com/adminMainUser/${value}`)
            .then(response => {
                Swal.fire(
                    'Successful!',
                    'Deleted successfully!',
                    'success'
                )
                setTimeout(()=>{
                    window.location.reload();
                },3000)            })
            .catch(error => {
                console.log(error.message);
                alert(error.message);
            })
    }

    navigateToUserEdit(e, _id){
        window.location = `/Edit-admin-conferences/${_id}`;
    }

    render() {

        const columns = [
            {
                name: 'name',
                selector: 'name',
                sortable: true,
            },

            {
                name: 'email',
                selector: 'email',
                sortable: true,
            },
            {
                name: 'contact',
                selector: 'contact',
                sortable: true,
            },
            {
                name: 'address',
                selector: 'address',
                sortable: true,
            },
            {
                name: 'organization',
                selector: 'organization',
                sortable: true,
            },
            {
                name: 'role',
                selector: 'role',
                sortable: true,
            },
            {
                name: 'Options',
                cell: row => <div>
                    <input  className="btn btn-primary" onClick={() => this.props.editUser(row._id)}  value="Edit" type="button" aria-disabled="true"/>
                    &nbsp;&nbsp;
                    <input className="btn btn-danger" onClick={(e) => this.deleteUsers(e,row._id)}  value="Delete" type="button" aria-disabled="true"/>
                </div>,
                selector: 'options',
                sortable: true,
                left: true,
            }
            ];

        const data = this.state.users;

        const tableData = {
            columns,
            data,
        }


        return (

            <div className={"container mt-4"}>
                <br></br>
                <div className={"card p-4"}>
                    <h5 className={"text-start mb-3"}>User View</h5>
                    <DataTableExtensions {...tableData}>
                        <DataTable
                            columns={columns}
                            data={data}
                            pagination
                            highlightOnHover
                            responsive
                            noHeader
                        />
                    </DataTableExtensions>
                </div>
            </div>


        );


    }
}
export default All_Users;