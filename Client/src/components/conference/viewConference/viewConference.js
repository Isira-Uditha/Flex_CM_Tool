import React, { Component } from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

const initialState = {
    conference: [],
}

class ViewConference extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        this.deleteConference = this.deleteConference.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:8087/conference`)
            .then(response => {
                this.setState({ conference: response.data.data });
                console.log(this.state.conference);
            });
    }

    deleteConference(e,value) {
        console.log(value);
        axios.delete(`http://localhost:8087/conference/${value}`)
            .then(response => {
                alert('Author deleted successfully');
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message);
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
                name: 'Options',
                cell: row => <div>
                    <input  className="btn btn-primary" onClick={() => this.props.editConference(row._id)}  value="Edit" type="button" aria-disabled="true"/>
                    &nbsp;&nbsp;
                    <input className="btn btn-danger" onClick={(e) => this.deleteConference(e,row._id)}  value="Delete" type="button" aria-disabled="true"/>
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