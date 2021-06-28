import React, {Component} from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import UserSession from "../../auth/userSession";

const initialState = {
    title: '',
    type: '',
    pdf: '',
    payment: 'pending',
    status: 'pending',
    post_id: 'null',
    user_id: 'null',
    notify: '0',
    fetchedData: [],
    alert: [],
    userDetails: [],
    alert_type: 'alert-success',
    hidden: 'hidden'
}

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.displayAlert = this.displayAlert.bind(this);
    }

    componentDidMount() {
        const user = UserSession.getName();

        if (user == 'null') {
            window.location = '/auth';
        }

        axios.get(`http://localhost:8087/user/getUser/${user}`).then(response => {
            this.setState({userDetails: response.data.data});
            this.setState({user_id: this.state.userDetails._id});
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.postId != prevProps.postId) {
            this.setState({post_id: this.props.postId}, this.fetchData);
        }
    }

    fetchData() {
        axios.get(`http://localhost:8087/post/${this.state.post_id}`).then(response => {
            this.setState({fetchedData: response.data.data});
            this.setState({title: response.data.data.title});
            this.setState({type: response.data.data.type});
        })
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onReset() {
        this.setState({
            title: '',
            type: '',
            pdf: '',
            status: 'pending',
            post_id: 'null',
            payment: 'pending',
            notify: '0'
        })
    }

    validation(post) {
        let array = [];
        let i = 0;
        if (post.title == '') {
            array[i] = 'Title field is required!';
            i++;
        }
        if (post.type == '') {
            array[i] = 'Type field is required!';
            i++;
        }

        if (post.pdf_url == '') {
            array[i] = 'Research paper upload required!';
            i++;
        }

        this.setState({alert: post ? array.map(array => array) : []});

        if (array[0]) {
            this.displayAlert(this.alert, "alert-danger");
            return (false);
        }
        return (true);
    }

    displayAlert(msg, type) {
        this.setState({alert_type: type});
        this.setState({hidden: ''});
    }

    onSubmit(e) {
        e.preventDefault();
        let submission = {
            title: this.state.title,
            type: this.state.type,
            pdf_url: this.state.pdf,
            status: this.state.status,
            user_id: this.state.user_id,
            payment_status: this.state.payment,
            notify: this.state.notify
        }

        let result = this.validation(submission);

        if (result) {
            console.log('DATA TO SEND ', submission);
            axios.post('http://localhost:8087/post/create', submission).then(response => {
                console.log(response)
                this.displayAlert('Uploaded Successfully', 'alert-success');
                Swal.fire(
                    'Success',
                    'Submission completed',
                    'success'
                )
                this.onReset();
            }).catch(error => {
                console.log(error.message);
                alert(error.message);
            });
        }
    }

    onUpdate(e) {
        e.preventDefault();
        let submission = {
            title: this.state.title,
            type: this.state.type,
            status: this.state.status,
            user_id: this.state.user_id,
            payment_status: this.state.payment,
            notify: this.state.notify
        }

        if (this.state.pdf_url != 'null') {
            submission.pdf_url = this.state.pdf_url;
        } else {
            submission.pdf_url = this.state.fetchedData.pdf_url;
        }

        let res = this.validation(submission);

        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Save`,
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                if (res) {
                    console.log('UPDATE DATA', submission);
                    axios.patch(`http://localhost:8087/post/update/${this.props.postId}`, submission).then(response => {
                        console.log(response);
                        Swal.fire('Saved!', '', 'success')
                        this.onReset();
                        window.location.reload();
                    }).catch(error => {
                        console.log(error.message);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!'
                        })
                    })
                }
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info');
            } else {
                this.onReset();
            }
        })
    }

    render() {
        return (
            <div className="container">
                <div className="card p-4">
                    {this.state.alert.map((item) => (
                        <div key={item} className={`alert ${this.state.alert_type} alert-dismissable fade show`}
                             role="alert" hidden={this.state.hidden}>
                            <strong>{item}</strong>
                            <button type="button" className="btn-close" data-bs-dismiss="alert"
                                    aria-label="Close"></button>
                        </div>
                    ))}
                    <h5 className="card-title">
                        {(() => {
                            if (this.props.postId == 'null') {
                                return 'Add your Research Papers'
                            } else {
                                return 'Edit your submission'
                            }
                        })()}
                    </h5>
                    <form
                        {...(this.props.postId === 'null' ? {onSubmit: this.onSubmit} : {onSubmit: this.onUpdate})}
                        encType="multipart/form-data">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3" style={{textAlign: "left"}}>
                                    <div className="form-floating mb-3">
                                        <input type="title"
                                               name="title"
                                               className="form-control"
                                               placeholder="Title"
                                               value={this.state.title}
                                               onChange={this.onChange}
                                        />
                                        <label htmlFor="title">Title</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3" style={{textAlign: "left"}}>
                                    <div className="form-floating">
                                        <input type="text"
                                               name="type"
                                               className="form-control"
                                               placeholder="Type"
                                               value={this.state.type}
                                               onChange={this.onChange}
                                        />
                                        <label htmlFor="type">Type</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="mb-3" style={{textAlign: "left"}}>
                                    <label htmlFor="file" className="form-label">Type</label>
                                    <input type="file"
                                           name="pdf"
                                           className="form-control"
                                           placeholder="Add your pdf here"
                                           value={this.state.pdf}
                                           onChange={this.onChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-md-12" style={{textAlign: "right"}}>
                                    {(() => {
                                        if (this.state.post_id === 'null') {
                                            return <button type="submit" className="btn btn-primary">Submit</button>
                                        } else {
                                            return <button type="submit" className="btn btn-primary">Update</button>
                                        }
                                    })()}
                                    &nbsp;
                                    &nbsp;
                                    <button className="btn btn-success" onClick={this.onReset}>Clear</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default PostForm;