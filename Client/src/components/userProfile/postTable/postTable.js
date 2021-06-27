import React, {Component} from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import DataTableExtension from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Swal from 'sweetalert2';
import Stripe from "react-stripe-checkout";
import UserSession from "../../auth/userSession";

const initialState = {
    entries: [],
    user_id: 'null',
    userDetails: [],
    payment: 'pending',
    current_post: 'null',
    postDetails: []
}

class PostTable extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.deletePost = this.deletePost.bind(this);
        this.handleToken = this.handleToken.bind(this);
        this.tokenHandler = this.tokenHandler.bind(this);
        this.currentPayPost = this.currentPayPost.bind(this);
        this.paymentHandler = this.paymentHandler.bind(this);
    }

    componentDidMount() {
        //cheking the available user session
        const user = UserSession.getName();

        //API call to fetch user details
        axios.get(`http://localhost:8087/user/getUser/${user}`).then(response => {
            // console.log(response.data.data)
            this.setState({userDetails: response.data.data});
            this.setState({user_id: this.state.userDetails._id});
        })

        //API call to fetch user added posts
        axios.get(`http://localhost:8087/post/user/${user}`).then(response => {
            this.setState({entries: response.data.data});
        })
    }

    deletePost(e, id) {
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
                axios.delete(`http://localhost:8087/post/delete/${id}`)
                    .then(response => {
                        console.log(response);
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
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

    handleToken(totalAmount, token) {
        //API call to stripe payment gateway
        axios.post('http://localhost:8087/payment/pay', {
            token: token.id,
            amount: totalAmount,
            customer_name: this.state.user_id
        }).then(response => {
            console.log(response);

            //Invoking payment handler to update the payment details
            this.paymentHandler(this.state.current_post);
        }).catch(error => {
            console.log({error: error.message});
        })
    }

    tokenHandler(token) {
        console.log('TOKEN', token);
        this.handleToken(100, token);
    }

    currentPayPost(e, postId) {
        console.log('POST ID', postId);
        this.setState({current_post: postId});
    }

    paymentHandler(postId) {
        this.setState({payment: 'paid'});
        console.log(this.state.payment);

        //API call to fetch post details
        axios.get(`http://localhost:8087/post/${postId}`).then(response => {
            console.log(response.data.data);
            this.setState({postDetails: response.data.data});
            console.log(this.state.postDetails.payment_status);

            //Setting payment status to the array
            this.state.postDetails.payment_status = this.state.payment;

            //API call to update payment details of the post
            axios.patch(`http://localhost:8087/post/update/${postId}`, this.state.postDetails).then(response => {
                console.log(response);
            }).catch(error => {
                console.log('Something went wrong in updating payment details!', error.message);
            })

        }).catch(error => {
            console.log(error.message);
        })
    }

    render() {
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
                    {(() => {
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
                    {(() => {
                        if (row.status === 'pending') {
                            return <h5><span style={{width: "100px"}} className="badge bg-warning">Pending</span></h5>
                        } else if (row.status === 'approved') {
                            return <h5><span style={{width: "100px"}} className="badge bg-success">Approved</span></h5>
                        } else {
                            return <h5><span style={{width: "100px"}} className="badge bg-danger">Rejected</span></h5>
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
                            return <div className="btn-group">
                                <button className="btn btn-primary" onClick={() => this.props.editPost(row._id)}
                                        disabled={true}>Edit
                                </button>
                                <button className="btn btn-danger" onClick={e => this.deletePost(e, row._id)}
                                        disabled={true}>Delete
                                </button>
                            </div>
                        } else {
                            return <div className="btn-group">
                                <button className="btn btn-primary" onClick={() => this.props.editPost(row._id)}>Edit
                                </button>
                                <button className="btn btn-danger" onClick={e => this.deletePost(e, row._id)}>Delete
                                </button>
                            </div>
                        }
                    })()}
                </div>,
                selector: 'options',
                sortable: true,
                left: true,
            },
            {
                name: 'Payment',
                cell: row => <div>
                    {(() => {
                        if (row.status === 'pending') {
                            return <h5><span style={{width: "100px"}} className="badge bg-warning">Pending</span></h5>
                        } else if (row.status === 'reject') {
                            return <h5><span style={{width: "100px"}} className="badge bg-danger">Rejected</span></h5>
                        } else if (row.payment_status === 'paid') {
                            return <h5><span style={{width: "100px"}} className="badge bg-success">Paid</span></h5>
                        } else {
                            return <button style={{width: "150px"}} className="invisible" onClick={e => this.currentPayPost(e, row._id)}>
                                <Stripe
                                    stripeKey="pk_test_51J5ViHAHA9nESvo0LpVRniSH1A8hx0Gq3uBya8uswpVIOaz1FeeRyRicbUXd5RYFpnJj6WKuf0HOwZIDXzGYjIJa008q7s35RK"
                                    token={this.tokenHandler}
                                />
                            </button>
                        }
                    })()}
                </div>,
                selector: 'status',
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

export default PostTable;