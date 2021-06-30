import React, {Component} from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import DataTableExtension from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Swal from 'sweetalert2';
import UserSession from "../../auth/userSession";
import Notification from "../../reviewer/notification";

const initialState = {
    entries: [],
    user_id: 'null',
    userDetails: [],
    payment: 'pending',
    workshopDetails: [],
    notified: [],
    loading: false
}

class PresenterTable extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.deleteWorkshop = this.deleteWorkshop.bind(this);
        this.renderNotification = this.renderNotification.bind(this);
    }

    componentDidMount() {
        //checking the available user session
        const user = UserSession.getName();

        //API call to fetch user details
        axios.get(`http://localhost:8087/user/getUser/${user}`).then(response => {
            console.log('LOGGED USER', response.data.data)
            this.setState({userDetails: response.data.data});
            this.setState({user_id: this.state.userDetails._id});
        })

        //API call to fetch user added workshops
        axios.get(`http://localhost:8087/workshop/user/${user}`).then(response => {
            console.log('USER ADDED WORKSHOPS', response.data.data);
            this.setState({entries: response.data.data});
        })
    }

    deleteWorkshop(e, id) {
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
                //API call to delete post
                axios.delete(`http://localhost:8087/workshop/delete/${id}`)
                    .then(response => {
                        console.log(response);
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        setTimeout(()=>{
                            this.props.parentReload();
                        },3000);
                    }).catch(error => {
                    console.log(error.message);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    })
                })
            }
        })
    }

    renderNotification() {
        return <Notification/>
    }

    render() {
        const columns = [
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
                name: 'Approval Status',
                cell: row => <div>
                    {(() => {
                        if (row.status === 'pending') {
                            return <h5><span className="btn btn-warning disabled">Pending</span></h5>
                        } else if (row.status === 'approved') {
                            return <h5><span className="btn btn-success disabled">Approved</span></h5>
                        } else {
                            return <h5><span className="btn btn-danger disabled">Rejected</span></h5>
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
            {
                name: 'Options',
                cell: row => <div>
                    {(() => {
                        if (row.status === 'approved') {
                            return <div>
                                <button className="btn btn-primary" onClick={() => this.props.editWorkshop(row._id)}
                                        disabled={true}>Edit
                                </button>&nbsp;&nbsp;
                                <button className="btn btn-danger" onClick={e => this.deleteWorkshop(e, row._id)}
                                        disabled={true}>Delete
                                </button>
                            </div>
                        } else {
                            return <div>
                                <button className="btn btn-primary"
                                        onClick={() => this.props.editWorkshop(row._id)}>Edit
                                </button>&nbsp;&nbsp;
                                <button className="btn btn-danger" onClick={e => this.deleteWorkshop(e, row._id)}>Delete
                                </button>
                            </div>
                        }
                    })()}
                </div>,
                selector: 'options',
                sortable: true,
                left: true,
            }
        ]

        const data = this.state.entries;

        const tableData = {
            columns,
            data
        }

        return (
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
            </div>

        )
    }
}

export default PresenterTable;