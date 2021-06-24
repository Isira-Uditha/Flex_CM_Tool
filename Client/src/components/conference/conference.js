import React, { Component } from "react";
import AddConference from "./addConference/addConference";
import ViewConference from "./viewConference/viewConference";

class Conference extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className={"container mt-4"}>
                <span className="border border-info border-5 p-2" style={{fontSize:"20px"}}><b>Conference</b></span>
                <AddConference/>
                <ViewConference/>
            </div>
        )
    }
}
export default Conference;