import React, {Component} from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import UserSession from "../../auth/userSession";
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const initialState = {
    title: '',
    description: '',
    pdf: '',
    status: 'pending',
    workshop_id: 'null',
    user_id: 'null',
    notify: '0',
    notes: '',
    date: '',
    time: '',
    conference: [],
    options: [],
    selected: 'null',
    fetchedSelect: '',
    selectedConference: 'Select Conference',
    fetchedData: [],
    alert: [],
    userDetails: [],
    alert_type: 'alert-success',
    hidden: 'hidden'
}

class PresenterForm extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.displayAlert = this.displayAlert.bind(this);
        this.onConferenceSelect = this.onConferenceSelect.bind(this);
        this.quillChange = this.quillChange.bind(this);
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

        axios.get('http://localhost:8087/conference/').then(response => {
            console.log('CONFERENCE DATA', response.data.data);
            this.setState({conference: response.data.data}, () => {
                let data = [];
                this.state.conference.map((item, index) => {
                    let conference = {
                        value: item._id,
                        label: item.title
                    }
                    data.push(conference);
                });
                this.setState({options: data});
            });
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.workshopId != prevProps.workshopId) {
            this.setState({workshop_id: this.props.workshopId}, this.fetchData);
        }
    }

    fetchData() {
        axios.get(`http://localhost:8087/workshop/${this.state.workshop_id}`).then(response => {
            console.log(response.data.data);
            this.setState({fetchedData: response.data.data});
            this.setState({title: response.data.data.title});
            this.setState({description: response.data.data.description});
            this.setState({date: response.data.data.date});
            this.setState({time: response.data.data.time});
            this.setState({notes: response.data.data.notes});
            this.setState({fetchedSelect: response.data.data.conference_id});

        }).then(response => {
            console.log('ID',this.state.fetchedSelect);
            axios.get(`http://localhost:8087/conference/${this.state.fetchedSelect}`).then(response => {
                console.log(response.data.data);
                this.setState({selectedConference: response.data.data.title});
            })
        })
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onReset() {
        this.setState({
            title: '',
            description: '',
            pdf: '',
            status: 'pending',
            post_id: 'null',
            selected: '',
            date: '',
            time: '',
            notes: '',
            notify: '0'
        })
    }

    validation(workshop) {
        let array = [];
        let i = 0;

        if (workshop.title == '') {
            array[i] = 'Title field is required!';
            i++;
        }

        if (workshop.description == '') {
            array[i] = 'Type field is required!';
            i++;
        }

        if (workshop.selected == '') {
            array[i] = 'Conference required!';
            i++;
        }

        if (workshop.date == '') {
            array[i] = 'Date required!';
            i++;
        }

        if (workshop.time == '') {
            array[i] = 'Time required!';
            i++;
        }

        this.setState({alert: workshop ? array.map(array => array) : []});

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

    onConferenceSelect(e) {
        this.setState({selected: e ? e.value : ''});
    }

    quillChange(value) {
        this.setState({notes: value})
    }

    onSubmit(e) {
        e.preventDefault();
        let submission = {
            title: this.state.title,
            description: this.state.description,
            pdf_url: this.state.pdf,
            status: this.state.status,
            notes: this.state.notes,
            date: this.state.date,
            time: this.state.time,
            conductor_id: this.state.user_id,
            conference_id: this.state.selected,
            notify: this.state.notify
        }

        let result = this.validation(submission);

        if (result) {
            console.log('DATA TO SEND ', submission);
            axios.post('http://localhost:8087/workshop/create', submission).then(response => {
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
            description: this.state.type,
            pdf_url: this.state.pdf,
            status: this.state.status,
            notes: this.state.notes,
            date: this.state.date,
            time: this.state.time,
            conductor_id: this.state.user_id,
            conference_id: this.state.selected,
            notify: this.state.notify
        }

        if(this.state.selected != 'null'){
            submission.conference_id = this.state.selected
        } else {
            submission.conference_id = this.state.fetchedData.conference_id
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
                    axios.patch(`http://localhost:8087/workshop/update/${this.props.workshopId}`, submission).then(response => {
                        console.log(response);
                        Swal.fire('Saved!', '', 'success')

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
                            if (this.props.workshopId == 'null') {
                                return 'Add Workshop Details'
                            } else {
                                return 'Edit your submission'
                            }
                        })()}
                    </h5>
                    <br/>
                    <form
                        {...(this.props.workshopId === 'null' ? {onSubmit: this.onSubmit} : {onSubmit: this.onUpdate})}
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
                                    <label htmlFor="file" className="form-label">Conference</label>
                                    <Select
                                        placeholder={this.state.selectedConference}
                                        options={this.state.options}
                                        onChange={this.onConferenceSelect}
                                        className={"basic-multi-select"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3" style={{textAlign: "left"}}>
                                    <label htmlFor="date" className="form-label">Date</label>
                                    <input
                                        type="Date"
                                        className="form-control"
                                        name="date"
                                        value={this.state.date}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3" style={{textAlign: "left"}}>
                                    <label htmlFor="time" className="form-label">Time</label>
                                    <input
                                        type="Time"
                                        className="form-control"
                                        name="time"
                                        value={this.state.time}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3" style={{textAlign: "left"}}>
                                    <label htmlFor="type" className="form-label">Description</label>
                                    <textarea type="text"
                                              name="description"
                                              className="form-control"
                                              placeholder="Description"
                                              value={this.state.description}
                                              onChange={this.onChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-md-12" style={{textAlign: "left"}}>
                                <label htmlFor="notes" className="form-label">Notes</label>
                                <ReactQuill
                                    value={this.state.notes}
                                    onChange={(e) => this.quillChange(e)}
                                    style={{height: '200px'}}
                                />
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-md-12" style={{textAlign: "right"}}>
                                    {(() => {
                                        if (this.state.workshop_id === 'null') {
                                            return <button type="submit" className="btn btn-primary">Submit</button>
                                        } else {
                                            return <button type="submit" className="btn btn-primary">Update</button>
                                        }
                                    })()}
                                    &nbsp;
                                    &nbsp;
                                    <button className="btn btn-secondary" onClick={this.onReset}>Clear</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default PresenterForm;