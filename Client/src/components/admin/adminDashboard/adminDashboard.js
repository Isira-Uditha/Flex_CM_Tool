import React, { Component } from "react";
import AdminPieChart from "./adminPieChart";
import ResearchSummaryChart from "./Charts/researchSummaryChart";
import WorkshopSummaryChart from "./Charts/workshopSummaryChart";
import UserSummaryBarChart from "./Charts/userSummaryBarChart";


class AdminDashboard extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div className="container">
                <br/><br/>                <br/><br/>

                {/*<div className="card" style={{width: "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk
                            of the card's content.</p>
                        <a href="#" className="card-link">Card link</a>
                        <a href="#" className="card-link">Another link</a>
                    </div>
                </div>
*/}
                <a href="/admin-view"><button type="button" className="btn btn-secondary">aprrove</button></a>


                <a href="/admin-add-users"><button type="button" className="btn btn-secondary">add Users</button></a>
                {/*<AdminPieChart></AdminPieChart>*/}
                <div className="row">
                    <div className={"col-md-5"}>
                        <ResearchSummaryChart/>
                    </div>
                    <div className={"col-md-5"}>
                        <UserSummaryBarChart/>

                    </div>

                </div>
                <br/>
                <div className="row">
                    <div className={"col-md-5"}>
                        <WorkshopSummaryChart/>
                    </div>
                    <div className={"col-md-5"}>
                      {/*  <UserSummaryBarChart/>*/}

                    </div>

                </div>
               </div>


        );
    }
}

export default AdminDashboard;
