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
    type: ''
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
    }

    componentDidMount() {
        this.setState({IsResearch: this.props.isResearch});
        console.log(this.state.IsResearch)

        if(this.props.isResearch == true) {
            axios.get('http://localhost:8087/post').then(response => {
                this.setState({entries: response.data.data});
                console.log(this.state.entries)
            })
        }

    }

    sendApproval(paperId , approvedPost) {

        console.log("Data to Send ", this.state.status);
        console.log("id ", paperId);
        axios.patch(`http://localhost:8087/post/approvePost/${paperId}`, approvedPost)
            .then(response => {
                window.location.reload ();
                alert("Success");
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
            };
            this.sendApproval(paperId , approvedPost)
        })
    }

    view(e , paperId, title, type, pdf_url, status){
        console.log("Model",paperId)
        this.setState({ id: paperId });

        this.setState({
            id: paperId,
            title: title
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


    render(){
        const columns = [
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
            },
            {
                name: 'Approval Status',
                cell: row => <div>
                    {(()=>{
                        if(row.status === 'pending'){
                            return <input type="button" className="btn btn-warning" value="Approve"  data-bs-toggle="modal"  data-bs-target="#staticBackdrop" onClick={e => this.view(e, row._id, row.title, row.type, row.pdf_url, row.status)}  disabled={false} />
                        /*    <input type="button" className="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal" data-bs-whatever="@mdo">Open modal for @mdo</input>*/

                        } else if(row.status === 'approved'){
                            return <input type="button" className="btn btn-success"  value="Approved" disabled={true} />
                        } else {
                            return <input type="button" className="btn btn-danger" value="Rejected" disabled={true} />
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
                                <form>
                                    <div className={"row"}>

                                        <div className={"col-md-6"}>
                                        <label htmlFor="recipient-name" className="col-form-label">Title:</label>
                                        </div>
                                        <div className={"col-md-6"}>
                                        <label htmlFor="recipient-name" className="col-form-label">{this.state.title} </label>
                                        </div>

                                      {/*  <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">Type:</label>
                                        <input type="text" className="form-control" id="recipient-name"/>
                                    </div>
                                        </div>*/}
                                        </div>
                                   {/* <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">File:</label>
                                        <input type="text" className="form-control" id="recipient-name"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">Created Date:</label>
                                        <input type="text" className="form-control" id="recipient-name"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">Status:</label>
                                        <input type="text" className="form-control" id="recipient-name" value={this.state.id} disabled={true}/>
                                    </div>*/}


                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Reject
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