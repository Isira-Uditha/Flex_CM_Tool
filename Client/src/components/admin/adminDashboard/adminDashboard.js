import React, { Component } from "react";
import ResearchSummaryChart from "./Charts/researchSummaryChart";
import WorkshopSummaryChart from "./Charts/workshopSummaryChart";
import UserSummaryBarChart from "./Charts/userSummaryBarChart";
import ConferenceChart from "./Charts/conferenceChart";

class AdminDashboard extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <br/>    <br/>       <br/>    <br/><br/>
                <div className="row">
                    <div className={"col-md-5"}>
                        <UserSummaryBarChart/>
                    </div>
                    <div className={"col-md-5"}>
                        <ResearchSummaryChart/>
                    </div>
                    <br/>
                    <div className={"col-md-2"}>
                        <div className="card m-2 border-secondary border-4"
                             style={{width: "18rem", background: "rgb(255,255,255,0.8)"}}>
                            {/* <img className="card-img-top mx-auto mt-2" style={{  width: "100%", height: "15vw", objectFit: "cover"}}  alt="Card image cap"/>*/}
                            <div className="card-body">
                                <h5 className="card-title">User Management</h5>
                                <p className="card-text">All Users Managed by the Administator</p>
                                <br/>
                                <a href={"/admin-add-users"}
                                   style={{background: "rgb(8, 48, 84, 0.7)"}} className="btn btn-primary">Manage Users</a>
                            </div>
                        </div>
                        <br/>
                        <div className="card m-2 border-secondary border-4"
                             style={{width: "18rem", background: "rgb(255,255,255,0.8)"}}>
                            {/* <img className="card-img-top mx-auto mt-2" style={{  width: "100%", height: "15vw", objectFit: "cover"}}  alt="Card image cap"/>*/}
                            <div className="card-body">
                                <h5 className="card-title">Conference Management</h5>
                                <p className="card-text">All Approval and Rejecetions of Conferences are managed by the Administrator..</p>
                                <br/>
                                <a href={"/admin-view"}
                                   style={{background: "rgb(8, 48, 84, 0.7)"}} className="btn btn-primary">Manage Conferences</a>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className={"col-md-5"}>
                        <WorkshopSummaryChart/>
                    </div>
                    <div className={"col-md-5"}>
                        <ConferenceChart/>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminDashboard;
