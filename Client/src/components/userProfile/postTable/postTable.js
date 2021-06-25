import React, {Component} from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import DataTableExtension from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Swal from 'sweetalert2';

const initialState = {
    entries: []
}

class PostTable extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.deletePost = this.deletePost.bind(this);
        this.editPost = this.editPost.bind(this);
        this.makePayment = this.makePayment.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8087/post').then(response => {
            console.log(response.data.data);
            this.setState({entries: response.data.data});
            console.log('LENGTH', this.state.entries.length);
        })
    }

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

    editPost(e, id){

    }

    makePayment(){

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
                        <button className="btn btn-primary" onClick={e => this.editPost(e, row._id)}>Edit</button>
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
                            return <input type="button" className="btn btn-success" value="Pay" onClick={this.makePayment()}/>
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
                    <h5 htmlfor="title" className="form-label" style={{textAlign: "left"}}>Uploads</h5>
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