import axios from "axios";
import Swal from "sweetalert2";
import React, { Component } from "react";
import DataTable from "react-data-table-component";
import DataTableExtension from "react-data-table-component-extensions";

const initialState = {
    entries: [],
    user_id: 'null',
    userDetails: [],
    payment: 'pending',
    workshopDetails: [],
    notified: [],
    loading: false,
    status: '',
    show: false,
    id: '',
    title: '',
    description: '',
    date: '',
    time: '',
    notes: '',
    conductor_id:'',
    conference_id:'',
    notify:'',
    createdAt: '',
    IsResearch: true,
    created_date: '',
    statusView: ''
}

class ApproveWorkshopTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        this.view = this.view.bind(this);
        this.renderLabel = this.renderLabel.bind(this);
        this.rejectPaper = this.rejectPaper.bind(this);
        this.approvePaper = this.approvePaper.bind(this);
        this.sendApproval = this.sendApproval.bind(this);
    }

    componentDidMount() {
        //API call to fetch user added workshops
        axios.get(`https://flexconferencetool.herokuapp.com/workshop/`).then(response => {
            console.log('USER ADDED WORKSHOPS', response.data.data);
            this.setState({entries: response.data.data});
            {this.state.entries.length > 0 && this.state.entries.map((item,index) => (
                console.log(item.status)
            ))}
        })
    }

    view(e , paperId, title, description, date, time , notes, conductor_id,  status, notify, createdAt, conference_id){
        this.setState({
            id: paperId,
            title: title,
            description: description,
            date: date,
            time: time,
            notes: notes,
            conductor_id: conductor_id,
            conference_id: conference_id,
            statusView: status,
            created_date: createdAt
        }, () => {
            console.log("Model123id",this.state.title)
        })
    }

    renderLabel(){
        if(this.state.statusView == "pending"){
            return <span className="badge bg-warning text-dark">Pending Paper</span>
        }else if(this.state.statusView == "approved"){
            return <span  className="badge bg-success">Approved Paper</span>
        }else{
            return <span className="badge bg-danger">Rejected Paper</span>
        }
    }

    approvePaper(e , paperId) {
        this.setState({
            status: "approved"
        }, () => {
            let approvedWorkshop = {
                status: this.state.status,
                notify: "1"
            };
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Approve it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.sendApproval(paperId , approvedWorkshop)
                }
            })
        })
    }

    sendApproval(paperId , approvedWorkshop) {
        axios.patch(`https://flexconferencetool.herokuapp.com/reviewer/approveWorkshop/${paperId}`, approvedWorkshop)
            .then(response => {
                window.location.reload ()
            })
            .catch(error => {
                console.log(error.message)
                alert(error.message)
            })
    }

    rejectPaper(e , paperId) {
        this.setState({
            status: "reject"
        }, () => {
            let approveWorkshop = {
                status: this.state.status,
                notify: "2"
            };
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Reject it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.sendApproval(paperId , approveWorkshop)
                }
            })
        })
    }

    render(){

        const columns = [
            {
                name: 'Workshop Conductor',
                selector: 'conductor_id.name',
                sortable: true,
            },
            {
                name: 'Title',
                selector: 'title',
                sortable: true,
            },
            {
                name: 'Description',
                selector: 'description',
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
                name: 'View',
                cell: row => <div>
                    {(()=>{
                        return  <input type="button" className="btn btn-primary" value="View"  data-bs-toggle="modal"  data-bs-target="#staticBackdrop" onClick={e => this.view(e, row._id, row.title, row.description, row.date, row.time, row.notes , row.conductor_id.name , row.status , row.notify , row.createdAt , row.conference_id)}  disabled={false} />
                    })()}
                </div>,
                selector: ' ',
                sortable: true,
                left: true,
            },
            {
                name: 'Approval Status',
                cell: row => <div>
                    {(() => {
                        if (row.status === 'pending') {
                           /* return <h5><span style={{width: "100px"}} className="badge bg-warning">Pending</span></h5>*/
                            return <input type="button" style={{width:"100px"}} className="btn btn-warning" value="Pending"  data-bs-toggle="modal"  disabled={true} />
                        } else if (row.status === 'approved') {
                            /*return <h5><span style={{width: "100px"}} className="badge bg-success">Approved</span></h5>*/
                            return <input type="button" style={{width:"100px"}} className="btn btn-success"  value="Approved" disabled={true} />
                        } else {
                       /*     return <h5><span style={{width: "100px"}} className="badge bg-danger">Rejected</span></h5>*/
                            return <input type="button" style={{width:"100px"}} className="btn btn-danger"  value="Rejected" disabled={true} />
                        }
                    })()}
                </div>,
                selector: 'status',
                sortable: true,
                center: true,
            },
            {
                name: 'Created/Updated Date',
                selector: 'createdAt',
                sortable: true,
                left: true,
            },
        ]

        const data = this.state.entries;

        const tableData = {
            columns,
            data
        }
        return(
            <div className="container mt-4">
                <div className="card p-4">
                    <h5 htmlFor="title" className="form-label" style={{textAlign: "left"}}>Workshop Proposals</h5>
                    <DataTableExtension {...tableData}>
                        <DataTable columns={columns}
                                   data={data}
                                   pagination
                                   highlightOnHover
                                   responsive
                                   noHeader
                        />
                    </DataTableExtension>
                </div>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                     tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Approve Workshop</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className={"col-md-12"}>
                                    <form >
                                        <div className={"row"}>
                                            {this.renderLabel()}
                                        </div>
                                        <div className={"row"}>
                                            <div className={"col-md-6"}>
                                                <label htmlFor="recipient-name" className="col-form-label">Title:</label>
                                            </div>
                                            <div className={"col-md-6"} style={{textAlign: "left"}}>
                                                <label htmlFor="recipient-name" className="col-form-label"><b>{this.state.title} </b></label>
                                            </div>
                                        </div>
                                        <div className={"row"}>
                                            <div className={"col-md-6"}>
                                                <label htmlFor="recipient-name" className="col-form-label">Description:</label>
                                            </div>
                                            <div className={"col-md-6"} style={{textAlign: "left"}}>
                                                <label htmlFor="recipient-name" className="col-form-label"><b>{this.state.description} </b></label>
                                            </div>
                                        </div>
                                        <div className={"row"}>
                                            <div className={"col-md-6"} >
                                                <label htmlFor="recipient-name" className="col-form-label">Date:</label>
                                            </div>
                                            <div className={"col-md-6"} style={{textAlign: "left"}}>
                                                <label htmlFor="recipient-name" className="col-form-label"><b>{this.state.date} </b></label>
                                            </div>
                                        </div>
                                        <div className={"row"}>
                                            <div className={"col-md-6"} >
                                                <label htmlFor="recipient-name" className="col-form-label">Time:</label>
                                            </div>
                                            <div className={"col-md-6"} style={{textAlign: "left"}}>
                                                <label htmlFor="recipient-name" className="col-form-label"><b>{this.state.time} </b></label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={e => this.rejectPaper(e,this.state.id)} >Reject
                                </button>
                                <button type="button" className="btn btn-primary" onClick={e => this.approvePaper(e,this.state.id)} >Approve</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ApproveWorkshopTable;