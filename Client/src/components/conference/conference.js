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
        this.updateComponent = this.updateComponent.bind(this)
    }

    editConference(id){
        this.setState({conference_id: id})
    }

    updateComponent(){
        window.location.reload ();
    }

    render(){
        return (
            <div className={"container mt-4"}>
                <AddConference updateComponent={this.updateComponent} conference_id={this.state.conference_id}/>
                <ViewConference updateComponent={this.updateComponent} editConference={this.editConference}/>
            </div>
        )
    }
}
export default Conference;