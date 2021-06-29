import React, { Component } from "react";
import axios from "axios";
import Stripe from "react-stripe-checkout";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Swal from "sweetalert2";
import AdminPieChart from "../adminDashboard/adminPieChart";

const initialState = {
    conference: [],
    IsConference: true,
    status: '',
    show: false,
    id: '',
    title: '',
    date: '',
    location: '',
    time: '',
    ticket_price: '',
    statusView: ''

}



class All_Conferences extends React.Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        this.navigateToAdminEdit = this.navigateToAdminEdit.bind(this);
        this.deleteConference = this.deleteConference.bind(this);
        this.approveConference = this.approveConference.bind(this);
        this.rejectConference = this.rejectConference.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.view = this.view.bind(this);
        this.sendConferenceApproval = this.sendConferenceApproval.bind(this);
        // this.renderLabel = this.renderLabel(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8087/conference/')
            .then(response => {
                this.setState({ conference: response.data.data });
                console.log(this.state.conference);
            });
    }

    // componentDidMount() {
    //     this.setState({IsConference: this.props.IsConference});
    //     console.log(this.state.IsConference)
    //
    //     if(this.props.IsConference == true) {
    //         axios.get('http://localhost:8087/conference/').then(response => {
    //             this.setState({entries: response.data.data});
    //             console.log(this.state.entries)
    //             {this.state.entries.length > 0 && this.state.entries.map((item,index) => (
    //                 console.log(item.title)
    //                 /* (item.user_id > 0 && item.user_id.map((item,index) => (
    //                    /!*  console.log(item.name)*!/
    //                  )))*/
    //             ))}
    //         })
    //     }

    // }

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

    navigateToAdminEdit(e, _id){
        window.location = `/Edit-admin-conferences/${_id}`;
    }

    navigateToAdminApprove(e, _id){
        window.location = `/Edit-admin-conferences/${_id}`;
    }

    sendConferenceApproval(_id , approvedConferencePost) {

        console.log("Data to Send ", this.state.status);
        console.log("id ", _id);
        axios.patch(`http://localhost:8087/admin/approveConference/${_id}`, approvedConferencePost)
            .then(response => {
                window.location.reload ()
                Swal.fire(
                    'Approved!',
                    'Your file has been approved.',
                    'success'
                )
            })
            .catch(error => {
                console.log(error.message)
                alert(error.message)
            })
    }
 approveConference(e , _id) {

     this.setState({
         status: "A"
     }, () => {
         let approvedConferencePost = {
             status: this.state.status,
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
                 this.sendConferenceApproval(_id, approvedConferencePost)
                 console.log("bbbbbbb")

             }
         })

     })
 }


    rejectConference(e , _id) {

        this.setState({
            status: "R"
        }, () => {
            let approvedConferencePost = {
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
                    this.sendConferenceApproval(_id , approvedConferencePost)

                }
            })


        })
    }

    view(e , _id, title, date , location){
        console.log("id",_id)
        console.log("title",title)
        console.log("date",date)
       /* console.log("time",time)
        console.log("status",status)
        console.log("location",location)
        console.log("ticket_price",ticket_price)
        this.setState({ id: _id });*/

        this.setState({
            id: _id,
            title: title,
            date: date,
            location: location
           /* location: location,
            time: time,
            ticket_price: ticket_price,
            statusView: status*!/*/

        }, () => {
            console.log("Model123id",this.state.location)
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
        if(this.state.statusView == "P"){
            return <span className="badge bg-warning text-dark">Pending</span>
        }else if(this.state.statusView == "R"){
            return <span className="badge bg-danger">Rejected</span>
        }else if(this.state.statusView == "A"){
            return <span  className="badge bg-success">Approved</span>
        }
    }


    render(){

        const columns = [
            {
                name: 'Title',
                selector: 'title',
                sortable: true,
            },
            {
                name: 'Approval Status',
                cell: row => <div>
                    {(()=>{
                        if(row.status === 'P'){
                            return <h4><span style={{width:"100px"}} className="badge bg-warning">Pending</span></h4>

                        } else if(row.status === 'A'){
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
                name: 'View',
                cell: row => <div>
                    {(()=>{
                        return  <input type="button" className="btn btn-primary" value="View"  data-bs-toggle="modal"  data-bs-target="#staticBackdrop" onClick={e => this.view(e, row._id, row.title, row.date , row.location)}  disabled={false} />
                    })()}
                </div>,
                selector: ' ',
                sortable: true,
                left: true,
            },
            {
                name: 'Options',
                cell: row => <div>
                    <input  className="btn btn-primary" onClick={e => this.navigateToAdminEdit(e, row._id)}  value="Edit" type="button" aria-disabled="true"/>
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
        }

        const s = this.state.statusView



        return (
            <div className={"container mt-4"}>
                <div className={"card p-2"} style={{backgroundColor:"gray"}}>
                <h3 htmlFor="title"  className="form-label" style={{textAlign:"center" ,color:"red"}} >Admin View</h3>
                </div>
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

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                     tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Approve Conference </h5>
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
                                                <label htmlFor="recipient-name" className="col-form-label">Date:</label>
                                            </div>
                                            <div className={"col-md-6"} style={{textAlign: "left"}}>
                                                <label htmlFor="recipient-name" className="col-form-label"><b>{this.state.date} </b></label>
                                            </div>
                                        </div>
                                        <div className={"row"}>

                                            <div className={"col-md-6"} >
                                                <label htmlFor="recipient-name" className="col-form-label">Location:</label>
                                            </div>
                                            <div className={"col-md-6"} style={{textAlign: "left"}}>
                                                <label htmlFor="recipient-name" className="col-form-label"><b>{this.state.location} </b></label>
                                            </div>
                                        </div>
                                        {/*<div className={"row"}>*/}

                                        {/*    <div className={"col-md-6"} >*/}
                                        {/*        <label htmlFor="recipient-name" className="col-form-label">Time:</label>*/}
                                        {/*    </div>*/}
                                        {/*    <div className={"col-md-6"} style={{textAlign: "left"}}>*/}
                                        {/*        <label htmlFor="recipient-name" className="col-form-label"><b>{this.state.time} </b></label>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div className={"row"}>*/}

                                        {/*    <div className={"col-md-6"} >*/}
                                        {/*        <label htmlFor="recipient-name" className="col-form-label">Ticket Price</label>*/}
                                        {/*    </div>*/}
                                        {/*    <div className={"col-md-6"} style={{textAlign: "left"}}>*/}
                                        {/*        <label htmlFor="recipient-name" className="col-form-label"><b>{this.state.ticket_price} </b></label>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}

                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={e => this.rejectConference(e,this.state.id)} >Reject
                                </button>
                                <button type="button" className="btn btn-primary" onClick={e => this.approveConference(e,this.state.id)} >Approve</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default All_Conferences;