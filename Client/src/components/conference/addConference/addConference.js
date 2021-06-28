import React, { Component } from "react";
import Select from 'react-select';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import GuestList from "../guestList/guestList";
import Swal from 'sweetalert2'

const initialState = {
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    tracks: '',
    speakers: [{index: Math.random(),speaker: '', url: ''}],
    ticket_price: '',
    g_speaker: '',
    g_url: '',
    conference_id: '',
    conference:[],
    alert: [],
    alert_type: 'alert-success',
    hidden: 'hidden',
}

class AddConference extends Component{
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onHandle = this.onHandle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClear = this.onClear.bind(this);
        this.addNewRow  = this.addNewRow .bind(this);
        this.quillChange = this.quillChange.bind(this);
        this.getConference = this.getConference.bind(this);
        this.clickOnDelete  = this.clickOnDelete.bind(this);
        this.onUpdate  = this.onUpdate.bind(this);
        this.displayAlert  = this.displayAlert.bind(this);
        this.validation  = this.validation.bind(this);
        this.state = initialState;

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.conference_id !== prevProps.conference_id) {
            this.setState({conference_id:this.props.conference_id},this.getConference)
        }

    }

    validation(conference){
        let array = [];
        let i = 0;
        if(conference.title === ''){
            array[i] = 'Title field is required';
            i++;
        }
        if(conference.date === ''){
            array[i] = 'Date field is required';
            i++;
        }
        if(conference.location === ''){
            array[i] = 'Location field is required';
            i++;
        }
        if(conference.time === ''){
            array[i] = 'Time field is required';
            i++;
        }
        if(conference.ticket_price === ''){
            array[i] = 'Ticket field is required';
            i++;
        }
        if(conference.description === ''){
            array[i] = 'Description field is required';
            i++;
        }

        this.setState({ alert: conference ? array.map(array => array) : [] });
        console.log(conference);
        if(array[0]){
            this.displayAlert(this.state.alert,"alert-danger")
            return(false)
        }

        return(true)

    }

    displayAlert(message,type){
        this.setState({alert_type:type});
        this.setState({hidden:''});
    }

    getConference(){
        axios.get(`http://localhost:8087/conference/${this.state.conference_id}`)
            .then(response => {
                    this.setState({ conference: response.data.data });
                }
            ).then(() => {
                console.log(this.state.conference)
                this.setState({ title: this.state.conference.title });
                this.setState({ location: this.state.conference.location });
                this.setState({ description: this.state.conference.description });
                this.setState({ ticket_price: this.state.conference.ticket_price });
                this.setState({ tracks: this.state.conference.tracks });
                this.setState({ time: this.state.conference.time });
                this.setState({ date: this.state.conference.date });
                // this.setState(() => ({
                //     speakers: [...this.state.conference.speakers, { index: Math.random(), speaker: this.state.conference.speakers.speaker, url: this.state.conference.speakers.url}],
                // }));
                this.setState({
                    speakers: this.state.conference.speakers,
                });
                this.setState({ g_speaker: this.state.conference.g_speaker });
            }
        );
    }

    onChange(e) {
        console.log(e.target.type)
        if(e.target.type == "file") {
            console.log("xxxx")
            const scope = this
            let reader = new FileReader();
            let value = reader.readAsDataURL(e.target.files[0]);
            reader.onload = function () {
                console.log(reader.result)
            };
            this.setState({g_url: reader.result})
        }else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    quillChange(value) {
        this.setState({ tracks: value })
    }


    onHandle(e){
        if (["speaker", "url"].includes(e.target.name)) {
            let speakers = [...this.state.speakers]
            if(e.target.type === "file"){
                let reader = new FileReader();
                let value = reader.readAsDataURL(e.target.files[0]);
                reader.onload = function () {
                    speakers[e.target.dataset.id][e.target.name] = reader.result;

                };
            }else{
                speakers[e.target.dataset.id][e.target.name] = e.target.value;
            }
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    onClear(e) {
        this.setState({
            title: '',
            description: '',
            date: '',
            time: '',
            location: '',
            speakers: [{index: Math.random(),speaker: '', url: ''}],
            ticket_price: '',
            tracks: '',
            g_url: '',
            g_speaker: '',
        },this.props.updateComponent())
    };

    addNewRow = () => {
        this.setState((prevState) => ({
            speakers: [...prevState.speakers, { index: Math.random(), speaker: "", url: ""}],
        }));
    }

    clickOnDelete(record) {
        this.setState({
            speakers: this.state.speakers.filter(r => r !== record)
        });
    }


    onSubmit(e) {
        e.preventDefault();
        let conference = {
            title: this.state.title,
            description: this.state.description,
            date: this.state.date,
            time: this.state.time,
            location: this.state.location,
            speakers: this.state.speakers,
            ticket_price: this.state.ticket_price,
            tracks: this.state.tracks,
            g_url: this.state.g_url,
            g_speaker: this.state.g_speaker,
            status: 'P',
            post_status: '0'
        };
        let res = this.validation(conference)
        if(res){

            axios.post('http://localhost:8087/conference/create', conference)
                .then(response => {
                    console.log(response);
                    this.displayAlert('Conference successfully inserted', 'alert-success')
                    Swal.fire(
                        'Success',
                        'Conference Data successfully inserted',
                        'success'
                    )
                }).then(response =>{
                setTimeout(() => {
                    this.onClear();
                    this.props.updateComponent();
                },2000)
            })
                .catch(error => {
                    console.log(error.message);
                    alert(error.message)
                })
        }

    }

    onUpdate(e) {
        e.preventDefault();
        let conference = {
            title: this.state.title,
            description: this.state.description,
            date: this.state.date,
            time: this.state.time,
            location: this.state.location,
            speakers: this.state.speakers,
            ticket_price: this.state.ticket_price,
            tracks: this.state.tracks,
            g_speaker: this.state.g_speaker,
        };
        console.log(conference)
        if(this.state.g_url !== ''){
            conference.g_url = this.state.g_url;
        }else{
            conference.g_url = this.state.conference.g_url;
        }

        let res = this.validation(conference)
        if(res) {
            console.log('DATA TO SEND Update', conference);
            axios.patch(`http://localhost:8087/conference/${this.props.conference_id}`, conference)
                .then(response => {
                    Swal.fire(
                        'Success',
                        'Conference Data successfully updated',
                        'success'
                    )
                }).then(response =>{
                    setTimeout(() => {
                        this.onClear();
                        this.props.updateComponent();
                    },2000)
            })
                .catch(error => {
                    console.log(error.message);
                    alert(error.message)
                })
        }
    }


    render(){
        return (
            <div className="container"><br/>
                <div className={"card p-4"}>
                    {this.state.alert.map((item) => (
                        <div key={item} className={`alert ${this.state.alert_type} alert-dismissible fade show`} role="alert" hidden={this.state.hidden}>
                            <strong>{item}</strong>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    ))}
                    <h5 htmlFor="title"  className="form-label mb-4" style={{textAlign:"left"}}>
                        {(()=>{
                            if(this.props.conference_id === 'null'){
                                return 'Add Conference'
                            }else{
                                return 'Edit Conference'
                            }
                        })()}
                    </h5>
                    <form {...(this.props.conference_id === 'null' ? {onSubmit: this.onSubmit} : {onSubmit: this.onUpdate})} onChange={this.onHandle}>
                        <div className={"row"}>
                            <div className={"col-md-6"}>
                                <div className="mb-3" style={{textAlign:"left"}}>
                                    <label htmlFor="title"  className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        value={this.state.title}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="mb-3" style={{textAlign:"left"}}>
                                    <label htmlFor="location"  className="form-label">Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="location"
                                        name="location"
                                        value={this.state.location}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="mb-3" style={{textAlign:"left"}}>
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        type="String"
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.onChange}
                                        rows={4}
                                    />
                                </div>
                            </div>
                            <div className={"col-md-6"}>
                                <div className="mb-3" style={{textAlign:"left"}}>
                                    <label htmlFor="date" className="form-label">Date</label>
                                    <input
                                        type="Date"
                                        className="form-control"
                                        id="date"
                                        name="date"
                                        value ={this.state.date}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="mb-3" style={{textAlign:"left"}}>
                                    <label htmlFor="time" className="form-label">Time</label>
                                    <input
                                        type="Time"
                                        className="form-control"
                                        id="time"
                                        name="time"
                                        value={this.state.time}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="mb-3" style={{textAlign:"left"}}>
                                    <label htmlFor="ticket_price"  className="form-label">Ticket Price</label>
                                    <input
                                        type="Number"
                                        className="form-control"
                                        id="ticket_price"
                                        name="ticket_price"
                                        value={this.state.ticket_price}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div  style={{textAlign: "left"}}><label htmlFor="speaker" className="form-label">Key Note Speakers</label></div>
                        <table className="table table-borderless">
                            <thead>
                            <tr>
                                <th className="required" style={{textAlign:"left"}} >Speaker</th>
                                <th className="required" style={{textAlign:"left"}}>Image</th>
                                <th className="required" style={{textAlign:"left"}} >Option</th>
                            </tr>
                            </thead>
                            <tbody>
                            <GuestList add={this.addNewRow} delete={this.clickOnDelete} guestList={this.state.speakers} />
                            </tbody>
                            <tfoot>
                            </tfoot>
                        </table>
                        <div className={"row"}>
                            <label htmlFor="g_speaker" style={{textAlign: "left"}} className="form-label">Guest Speaker</label>
                            <div className={"col-md-4"}>
                                <div className="mb-3">
                                    <input
                                        type="String"
                                        className="form-control"
                                        id="g_speaker"
                                        name="g_speaker"
                                        value={this.state.g_speaker}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                            <div className={"col-md-4"}>
                                <div className="mb-3">
                                    <input
                                        type="File"
                                        className="form-control"
                                        id="g_url"
                                        name="g_url"
                                        value={this.state.g_url}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={"row mb-5"}>
                            <div className={"col-md-12"} style={{textAlign: "left"}}>
                                <label htmlFor="tracks" className="form-label">Conference Tracks</label>
                                <ReactQuill value={this.state.tracks} onChange={(e)=>this.quillChange(e)} style={{height: '300px'}}/>
                            </div>
                        </div>
                        <br/>
                        <div className="card-footer">
                            <div className="row">
                                <div className={"col-md-12"} style={{textAlign:"right"}}>
                                    {(()=>{
                                        if(this.props.conference_id === 'null'){
                                            return <button type="submit" className="btn btn-success">Add</button>

                                        }else{
                                            return <button type="submit" className="btn btn-success">Update</button>
                                        }
                                    })()}
                                    &nbsp;&nbsp;&nbsp;
                                    {(()=>{
                                        if(this.props.conference_id === 'null'){
                                            return <button type="button" className="btn btn-secondary" onClick={this.onClear}>Reset</button>
                                        }
                                    })()}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddConference;