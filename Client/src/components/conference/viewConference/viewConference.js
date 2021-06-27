import React, { Component } from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Swal from 'sweetalert2'

const initialState = {
    conference: [],
}

class ViewConference extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        this.deleteConference = this.deleteConference.bind(this);
        this.postConference = this.postConference.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:8087/conference`)
            .then(response => {
                this.setState({ conference: response.data.data });
                console.log(this.state.conference);
            });
    }

    postConference(e,id){
        e.preventDefault()
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`http://localhost:8087/conference/post/${id}`)
                    .then(response => {
                        console.log(response)
                        Swal.fire(
                            'Success',
                            'Conference Posted Successfully',
                            'success'
                        )
                    }).then(response =>{
                    setTimeout(() => {
                        this.props.updateComponent();
                    },2000)
                })
                    .catch(error => {
                        console.log(error.message);
                        alert(error.message)
                    })
            }
        })

    }

    deleteConference(e,value) {
        console.log(value);
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8087/conference/${value}`)
                    .then(response => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    })
                    .then(response => {
                        setTimeout(() => {
                            this.props.updateComponent();
                        },2000)
                    })
                    .catch(error => {
                        console.log(error.message);
                        alert(error.message);
                    })
            }
        })

    }

    render(){

        const columns = [
            {
                name: 'Title',
                selector: 'title',
                sortable: true,
            },
            {
                name: 'Status',
                cell: row => <div>
                    {(()=>{
                        if(row.status === 'P'){
                            return <input  className="btn btn-warning"  value="Pending" type="reset" disabled aria-disabled="true"/>
                        }else if(row.status === 'R'){
                            return <input  className="btn btn-danger"  value="Rejected" type="reset" disabled aria-disabled="true"/>
                        }else{
                            return <input  className="btn btn-success"  value="Approved" type="reset" disabled aria-disabled="true"/>
                        }
                    })()}
                </div>,
                selector: 'status',
                sortable: true,
                left: true,
            },
            {
                name: 'Date',
                selector: 'date',
                sortable: true,
                left: true,
            },
            {
                name: 'Time',
                selector: 'time',
                sortable: true,
                left: true,
            },
            {
                name: 'Location',
                selector: 'location',
                sortable: true,
                left: true,
            },
            {
                name: 'Ticket Price',
                selector: 'ticket_price',
                sortable: true,
                left: true,
            },
            {
                name: 'Edit',
                cell: row => <div>
                    <input  className="btn btn-primary" onClick={() => this.props.editConference(row._id)}  value="Edit" type="button" aria-disabled="true"/>
                </div>,
                selector: 'options',
                sortable: true,
                left: true,
            },
            {
                name: 'Delete',
                cell: row => <div>
                    <input className="btn btn-danger" onClick={(e) => this.deleteConference(e,row._id)}  value="Delete" type="button" aria-disabled="true"/>
                </div>,
                selector: 'options',
                sortable: true,
                left: true,
            },
            {
                name: 'Post',
                cell: row => <div>
                    <input onClick={(e) => this.postConference(e,row._id)}
                           {...(row.post_status === '1' ? {className: "btn btn-success",value: "Posted",disabled:"disabled"} : {className: "btn btn-primary",value: "Post"})}
                           {...(row.status === 'A' ? {hidden: ""} : {hidden: "hidden"})} type="button" aria-disabled="true"/>
                </div>,
                selector: 'options',
                sortable: true,
                left: true,
            }
        ];

        const data = this.state.conference;

        const tableData = {
            columns,
            data,
        };

        return (
            <div className={"container mt-4"}>
                <div className={"card p-4"}>
                    <h5 htmlFor="title"  className="form-label" style={{textAlign:"left"}}>View Conferences</h5>
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
                    <div>
                </div>
            </div>
        )
    }
}

export default ViewConference;