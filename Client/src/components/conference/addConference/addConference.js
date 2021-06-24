import React, { Component } from "react";
import Select from 'react-select';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import GuestList from "../guestList/guestList";

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
        this. clickOnDelete  = this.clickOnDelete.bind(this);
        this.state = initialState;
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    quillChange(value) {
        this.setState({ tracks: value })
    }


    onHandle(e){
        if (["speaker", "url"].includes(e.target.name)) {
            let speakers = [...this.state.speakers]
            speakers[e.target.dataset.id][e.target.name] = e.target.value;
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
        })
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
            status: 'P'
        };
        console.log('DATA TO SEND', conference);
        axios.post('http://localhost:8087/conference/create', conference)
            .then(response => {
                alert('Conference Data successfully inserted')
                // this.onClear();
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render(){
        return (
            <div className="container"><br/>
                <div className={"card p-4"}>
                    <h5 htmlFor="title"  className="form-label mb-4" style={{textAlign:"left"}}>Add Conference</h5>
                    <form onSubmit={this.onSubmit} onChange={this.onHandle}>
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
                                        value={this.state.date}
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
                                    <button type="submit" className="btn btn-success">Add</button>
                                    &nbsp;&nbsp;&nbsp;
                                    <button type="button" className="btn btn-secondary" onClick={this.onClear}>Reset</button>
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