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

        //API call to get the user that is currently
        axios.get(`https://flexconferencetool.herokuapp.com/user/getUser/${user}`).then(response => {
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
        // API call to fetch the post data for the update purpose
        axios.get(`https://flexconferencetool.herokuapp.com/post/${this.state.post_id}`).then(response => {
            this.setState({fetchedData: response.data.data});
            this.setState({title: response.data.data.title});
            this.setState({type: response.data.data.type});
        })
    }

    onChange(e) {
        if(e.target.type == "file") {
            console.log(e);
            const scope = this
            let reader = new FileReader(); // getting reader object to read uploaded file
            let value = reader.readAsDataURL(e.target.files[0]); //Converting the uploaded file into base 64
            reader.onload = function () {
                //Setting the state
                scope.setState({pdf: reader.result})
                console.log('FILE CONVERTED');
            };
        }else {
            this.setState({ [e.target.name]: e.target.value })
        }
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
            //API call to create a new post
            axios.post('https://flexconferencetool.herokuapp.com/post/create', submission).then(response => {
                console.log(response)
                this.displayAlert('Uploaded Successfully', 'alert-success');
                Swal.fire(
                    'Success',
                    'Submission completed',
                    'success'
                )
                setTimeout(() => {
                    this.onReset();
                    this.props.parentReload();
                }, 3000);
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

        // checking whether the pdf url should be updated or not
        if (this.state.pdf_url != 'null') {
            submission.pdf_url = this.state.pdf_url;
        } else {
            submission.pdf_url = this.state.fetchedData.pdf_url;
        }

        // Validating the data inserted by the user
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
                    // API call to update the post
                    axios.patch(`https://flexconferencetool.herokuapp.com/post/update/${this.props.postId}`, submission).then(response => {
                        console.log(response);
                        Swal.fire('Saved!', '', 'success')

                        //After successful update, reload the page
                        setTimeout(() => {
                            this.onReset();
                            this.props.parentReload();
                        }, 3000);
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
                <br />
                <br />
                <div className="card p-4">
                    {this.state.alert.map((item) => (
                        <div key={item} className={`alert ${this.state.alert_type} alert-dismissable fade show`}
                             role="alert" hidden={this.state.hidden}>
                            <strong>{item}</strong>
                            <button type="button" className="btn-close" data-bs-dismiss="alert"
                                    aria-label="Close"></button>
                        </div>
                    ))}
                    <h5 className="card-title" style={{textAlign: "left"}}>
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
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="title"
                                           name="title"
                                           className="form-control"
                                           placeholder="Title"
                                           value={this.state.title}
                                           onChange={this.onChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3" style={{textAlign: "left"}}>
                                    <label htmlFor="type" className="form-label">Type</label>
                                    <input type="text"
                                           name="type"
                                           className="form-control"
                                           placeholder="Type"
                                           value={this.state.type}
                                           onChange={this.onChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="mb-3" style={{textAlign: "left"}}>
                                    <label htmlFor="file" className="form-label">Type</label>
                                    <input type="file"
                                           name="pdf"
                                           className="form-control"
                                           // value={this.state.pdf}
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