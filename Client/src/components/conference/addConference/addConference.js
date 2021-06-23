import React, { Component } from "react";
import Select from 'react-select';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// const initialSpeakers = [
//     {speaker: '', url: ''},
// ]

const initialState = {
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    tracks: '',
    speakers: [{speaker: '', url: ''}],
    ticket_price: '',
    k_speaker: [],
    g_speaker: [],
    k_url: [],
    g_url: [],
}



class AddConference extends Component{
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleSpeakerChange = this.handleSpeakerChange.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleAddField = this.handleAddField.bind(this);
        this.handleRemoveField = this.handleRemoveField.bind(this);
        this.onClear = this.onClear.bind(this);
        this.state = initialState;
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleAddField(e){
        e.preventDefault();
        this.setState({speakers: [...this.state.speakers,{speaker: '', url: ''}]});
    }
    handleSpeakerChange(e,index){
        e.preventDefault();
        console.log(e.target.value);
        this.state.k_speaker[index] = e.target.value;
        this.setState({k_speaker: this.state.k_speaker});
    }

    handleUrlChange(e,index){
        e.preventDefault();
        console.log(e.target.value);
        this.state.k_urls[index] = e.target.value;
        this.setState({k_urls: this.state.k_urls});
    }


    handleRemoveField(e,index){
        e.preventDefault();
        console.log(index);
        this.state.k_speaker.splice(index,1)
        this.setState({k_speaker: this.state.k_speaker});
        this.state.k_url.splice(index,1)
        this.setState({k_url: this.state.k_url});
        this.state.speakers.splice(index,1)
        this.setState({speakers: this.state.speakers});


    }







    onClear(e) {
        this.setState({
            title: '',
            description: '',
            date: '',
            time: '',
            location: '',
            speakers: '',
            ticket_price: '',
        })
    };


    onSubmit(e) {
        e.preventDefault();
        let conference = {
            title: this.state.title,
            description: this.state.description,
            date: this.state.date,
            time: this.state.time,
            location: this.state.location,
            k_url: this.state.k_url,
            k_speaker: this.state.k_speaker,
            ticket_price: this.state.ticket_price,
        };
        console.log('DATA TO SEND', conference);
        // axios.post('http://localhost:8085/conference/create', conference)
        //     .then(response => {
        //         alert('Conference Data successfully inserted')
        //         this.onClear();
        //     })
        //     .catch(error => {
        //         console.log(error.message);
        //         alert(error.message)
        //     })
    }

    render(){
        return (
            <div className="container"><br/>
                <div className={"card p-4"}>
                    <h5 htmlFor="title"  className="form-label mb-4" style={{textAlign:"left"}}>Add Conference</h5>
                    <form onSubmit={this.onSubmit}>
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
                            { this.state.speakers.map((speakers, index) => (
                                <div className={"row"} key={index}>
                                    <div className={"col-md-4"}>
                                        <div className="mb-3">
                                            <input
                                                type="String"
                                                className="form-control"
                                                id="speaker"
                                                name="speaker"
                                                value={this.state.speakers.speaker}
                                                onChange={(e)=>this.handleSpeakerChange(e,index)}
                                            />
                                        </div>
                                    </div>
                                    <div className={"col-md-4"}>
                                        <div className="mb-3">
                                            <input
                                                type="File"
                                                className="form-control"
                                                id="urls"
                                                name="urls"
                                                value={this.state.speakers.url}
                                                onChange={(e)=>this.handleUrlChange(e,index)}
                                            />
                                        </div>
                                    </div>
                                    <div className={"col-md-4"}>
                                        <div className="mb-3">
                                            <div className={"row"}>
                                                <div className={"col-md-2"} style={{textAlign:"left"}}>
                                                    <button type="button" className="btn btn-warning" onClick={this.handleAddField} style={{color:"white"}}>Add</button>
                                                </div>
                                                <div className={"col-md-6"} style={{textAlign:"left"}}>
                                                    <button type="button" className="btn btn-danger" onClick={(e)=> this.handleRemoveField(e,index)}>Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                                        id="g_urls"
                                        name="g_urls"
                                        value={this.state.g_url}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={"row mb-5"}>
                            <div className={"col-md-12"} style={{textAlign: "left"}}>
                                <label htmlFor="tracks" className="form-label">Conference Tracks</label>
                                <ReactQuill value={this.state.tracks} onChange={this.onChange} style={{height: '300px'}}/>
                            </div>
                        </div>
                        <br/>
                        <div className="card-footer">
                            <div className="row">
                                <div className={"col-md-12"} style={{textAlign:"right"}}>
                                    <button type="submit" className="btn btn-success">Add</button>
                                    &nbsp;&nbsp;&nbsp;
                                    <button type="button" className="btn btn-secondary">Reset</button>
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