import React, { Component } from "react";
import axios from "axios";
import Stripe from "react-stripe-checkout";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Swal from "sweetalert2";
import AdminPieChart from "../adminDashboard/adminPieChart";
import ResearchSummaryChart from "../adminDashboard/Charts/researchSummaryChart";

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
        super(props)
        this.state = initialState;

    }

    componentDidMount() {
        axios.get('http://localhost:8087/adminMainUser/')
            .then(response => {
                this.setState({ users: response.data.data });
                console.log(this.state.users);
            });
    }


    render() {

        const columns = [
            {
                name: 'name',
                selector: 'name',
                sortable: true,
            },
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