import React, {Component} from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import DataTableExtension from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Swal from 'sweetalert2';
import Stripe from "react-stripe-checkout";
import Notification from "../../reviewer/notification";

const initialState = {
    entries: [],
    notified: [],
    loading: false
}

class PostTable extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.deletePost = this.deletePost.bind(this);
        this.handleToken = this.handleToken.bind(this);
        this.tokenHandler = this.tokenHandler.bind(this);
      /*  this.x = this.x.bind(this);*/
        this.renderNotification = this.renderNotification.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8087/post').then(response => {
            this.setState({entries: response.data.data});
          /* this.x();*/
        })
    }

   /* x(){
        let data = [];
        for(let i =0 ; i < this.state.entries.length ; i++) {
            console.log(this.state.entries[i].notify);
            if (this.state.entries[i].notify == "1") {
                let n = {
                    value: this.state.entries[i]._id,
                    label: this.state.entries[i].title
                }
                data.push(n)
            }
        }

        this.setState({
            notified: "data"
        }, () => {
          console.log(this.state.notified.length)
            this.setState({loading: true});
        })
    }*/

    deletePost(e, id){
        axios.delete(`http://localhost:8087/post/delete/${id}`)
            .then(response => {
                alert('Deleted successfully!');
                window.location.reload();
            }).catch(error => {
                console.log(error.message);
                alert('Something went wrong');
        })
    }

    handleToken(totalAmount, token){
        axios.post('http://localhost:8087/payment/pay', {
            token: token.id,
            amount: totalAmount
        }).catch(error => {
            console.log({error: error.message});
        })
    }

    tokenHandler(token){
        this.handleToken(100, token);
    }
    renderNotification(){
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
                                return <input type="button" className="btn btn-warning" value="Pending" disabled={true} />
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
            },
            {
                name: 'Options',
                cell: row => <div>
                    <div className="btn-group">
                        <button className="btn btn-danger" onClick={e => this.deletePost(e, row._id)}>Delete</button>
                        {/*<button className="btn btn-primary" onClick={e => this.editPost(e, row._id)}>Edit</button>*/}
                        <button className="btn btn-primary" onClick={() => this.props.editPost(row._id)}>Edit</button>
                    </div>
                </div>,
                selector: 'options',
                sortable: true,
                left: true,
            },
            {
                name: 'Payment',
                cell: row => <div>
                    {(()=>{
                        if(row.status === 'pending'){
                            return <input type="button" className="btn btn-success" value="Pay" disabled={true} />
                        } else {
                            // return <input type="button" className="btn btn-success" value="Pay" onClick={e => this.makePayment(e)}/>
                            // return <a href="/pay" className="btn btn-success">Pay</a>
                            return <Stripe
                                stripeKey="pk_test_51J5ViHAHA9nESvo0LpVRniSH1A8hx0Gq3uBya8uswpVIOaz1FeeRyRicbUXd5RYFpnJj6WKuf0HOwZIDXzGYjIJa008q7s35RK"
                                token={this.tokenHandler}
                            />
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
                {this.renderNotification()}


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