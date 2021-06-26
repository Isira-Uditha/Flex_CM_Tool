import React, { Component } from "react";
import AddConference from "./addConference/addConference";
import ViewConference from "./viewConference/viewConference";

const initialState = {
    conference_id: 'null',
}

class Conference extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        this.editConference = this.editConference.bind(this)
    }

    editConference(id){
        this.setState({conference_id: id})
    }

    render(){
        return (
            <div className={"container mt-4"}>
                <span className="border border-info border-5 p-2" style={{fontSize:"20px"}}><b>Conference</b></span>
                <AddConference conference_id={this.state.conference_id}/>
                <ViewConference editConference={this.editConference}/>
            </div>
        )
    }
}
export default Conference;