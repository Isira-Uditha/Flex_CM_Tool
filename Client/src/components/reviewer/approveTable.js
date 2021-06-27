import React, { Component } from "react";
import axios from "axios";
import Stripe from "react-stripe-checkout";
import DataTableExtension from "react-data-table-component-extensions";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import Modal from "./approveModel";

const initialState = {
    IsResearch: true,
    entries: [],
    status: '',
    show: false,
    id: '',
    title: '',
    type: '',
    pdf_url: '',
    created_date: '',
    statusView: ''
}

class ApproveTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        this.approvePaper = this.approvePaper.bind(this);
        this.sendApproval = this.sendApproval.bind(this);
        this.view = this.view.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.rejectPaper = this.rejectPaper.bind(this);
        this.renderLabel = this.renderLabel.bind(this);
    }

    componentDidMount() {
        this.setState({IsResearch: this.props.isResearch});
        console.log(this.state.IsResearch)

        if(this.props.isResearch == true) {
            axios.get('http://localhost:8087/post').then(response => {
                this.setState({entries: response.data.data});
                console.log(this.state.entries)
                {this.state.entries.length > 0 && this.state.entries.map((item,index) => (
                    console.log(item.user_id.name)

                ))}
            })
        }

    }

    sendApproval(paperId , approvedPost) {

        console.log("Data to Send ", this.state.status);
        console.log("id ", paperId);
        axios.patch(`http://localhost:8087/post/approvePost/${paperId}`, approvedPost)
            .then(response => {
                window.location.reload ()
            })
            .catch(error => {
                console.log(error.message)
                alert(error.message)
            })

    }

    approvePaper(e , paperId) {
   /*     e.preventDefault()*/
        this.setState({
            status: "approved"
        }, () => {
            let approvedPost = {
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
                    this.sendApproval(paperId , approvedPost)

                }
            })

        })
    }

    rejectPaper(e , paperId) {
        /*     e.preventDefault()*/
        this.setState({
            status: "reject"
        }, () => {
            let approvedPost = {
                status: this.state.status,
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
                    this.sendApproval(paperId , approvedPost)

                }
            })


        })
    }

    view(e , paperId, title, type, pdf_url, status , created_date){
        console.log("Model",paperId)
        this.setState({ id: paperId });

        this.setState({
            id: paperId,
            title: title,
            type: type,
            pdf_url: pdf_url,
            created_date: created_date,
            statusView: status

        }, () => {
            console.log("Model123id",this.state.title)
        })

    }

    showModal = () => {
        this.setState({ show: true });
        console.log("Model",this.state.show)
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    renderLabel(){
        if(this.state.statusView == "pending"){
            return <span className="badge bg-warning text-dark">Pending Paper</span>
        }else if(this.state.statusView == "reject"){
            return <span className="badge bg-danger">Rejected Paper</span>
        }else if(this.state.statusView == "approved"){
            return <span  className="badge bg-success">Approved Paper</span>
        }
    }


    render(){
        const columns = [
            {
                name: 'Researcher',
                selector: 'user_id.name',
                sortable: true,
            },
            {
                name: 'Title',
                selector: 'title',
                sortable: true,
            },
            {
                name: 'Type',
                selector: 'type',
                sortable: true,
                left: true,
            },
            {
                name: 'File',
                cell: row => <div>
                    {(()=>{
                        return <a href={row.pdf_url}>Download</a>
                    })()}
                </div>,
                selector: 'pdf_url',
                sortable: true,
                left: true,
            },{
                name: 'View',
                cell: row => <div>
                    {(()=>{
                        return  <input type="button" className="btn btn-primary" value="View"  data-bs-toggle="modal"  data-bs-target="#staticBackdrop" onClick={e => this.view(e, row._id, row.title, row.type, row.pdf_url, row.status, row.createdAt)}  disabled={false} />
                    })()}
                </div>,
                selector: ' ',
                sortable: true,
                left: true,
            },
            {
                name: 'Approval Status',
                cell: row => <div>
                    {(()=>{
                        if(row.status === 'pending'){
                          /*  return <input type="button" className="btn btn-warning" value="Pending"  data-bs-toggle="modal"  disabled={true} />*/
                            return <h4><span style={{width:"100px"}} className="badge bg-warning">Pending</span></h4>
                        /*    <input type="button" className="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal" data-bs-whatever="@mdo">Open modal for @mdo</input>*/

                        } else if(row.status === 'approved'){
                         /*   return <input type="button" className="btn btn-success"  value="Approved" disabled={true} />*/
                            return <h4><span style={{width:"100px"}}  className="badge bg-success">Approved</span></h4>

                        } else {
                            return <h4><span style={{width:"100px"}}  className="badge bg-danger">Reject</span></h4>

                        }
                    })()}
                </div>,
                selector: 'status',
                sortable: true,
                center: true,
            },
            {
                name: 'Created Date',
                selector: 'createdAt',
                sortable: true,
                left: true,
            }/*,
            {
                name: 'Options',
                cell: row => <div>
                    <div className="btn-group">
                        <button className="btn btn-danger" onClick={e => this.deletePost(e, row._id)}>Delete</button>
                        {/!*<button className="btn btn-primary" onClick={e => this.editPost(e, row._id)}>Edit</button>*!/}

                    </div>
                </div>,
                selector: 'options',
                sortable: true,
                left: true,
            }*/

        ]

        const data = this.state.entries;

        const tableData = {
            columns,
            data
        }

        const s = this.state.statusView

        return(
            <div className="container mt-4">
                <div className="card p-4">
                    <h5 htmlFor="title" className="form-label" style={{textAlign: "left"}}>Uploads</h5>
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
                                <h5 className="modal-title" id="staticBackdropLabel">Approve Research Paper </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className={"col-md-12"}>
                                <form >
                                    <div className={"row"}>



                                        {this.renderLabel()}
                                        {/*<label htmlFor="recipient-name" className="col-form-label">{this.state.statusView} </label>*/}

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
                                            <label htmlFor="recipient-name" className="col-form-label">Type:</label>
                                        </div>
                                        <div className={"col-md-6"} style={{textAlign: "left"}}>
                                            <label htmlFor="recipient-name" className="col-form-label"><b>{this.state.type} </b></label>
                                        </div>
                                    </div>
                                    <div className={"row"}>

                                        <div className={"col-md-6"} >
                                            <label htmlFor="recipient-name" className="col-form-label">File:</label>
                                        </div>
                                        <div className={"col-md-6"} style={{textAlign: "left"}}>
                                            <label htmlFor="recipient-name" className="col-form-label"><b>{this.state.pdf_url} </b></label>
                                        </div>
                                    </div>
                                    <div className={"row"}>

                                        <div className={"col-md-6"} >
                                            <label htmlFor="recipient-name" className="col-form-label">Created Date:</label>
                                        </div>
                                        <div className={"col-md-6"} style={{textAlign: "left"}}>
                                            <label htmlFor="recipient-name" className="col-form-label"><b>{this.state.created_date} </b></label>
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


export default ApproveTable;