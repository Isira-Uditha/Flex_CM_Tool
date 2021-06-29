import React, { Component } from "react";
import ApproveTable from "./approveTable";
import ApproveWorkshopTable from "./approveWorkshopTable";
import Chart from "./chart";
import DrillDownChart from "./DrillDownChart";
import UserSummaryChart from "./userSummaryChart";

const initialState = {
    approveResearch: true,
    approveWorkshop:false,
    isResearch: true,
}

class Reviewer extends React.Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        this.switchWorkshopApprove = this.switchWorkshopApprove.bind(this);
        this.switchResearchApprove = this.switchResearchApprove.bind(this);
    }

    switchWorkshopApprove(e) {
        this.setState({approveWorkshop:true})
        this.setState({approveResearch:false})
        this.setState({isResearch:false})
    }

    switchResearchApprove(e) {
        this.setState({approveResearch:true})
        this.setState({approveWorkshop:false})
        this.setState({isResearch:true})
    }

    render(){
        return(
            <div className="container">
            <br/> <br/> <br/> <br/>
                <div>
                    <ul className="nav nav-tabs">
                        <li className="nav-item" onClick={this.switchResearchApprove}>
                            <a className= {(this.state.approveResearch)? "nav-link active" : "nav-link"} aria-current="page" href="#" style={{  color: "#000000"}}>Research Paper Review</a>
                        </li>
                        <li className="nav-item" onClick={this.switchWorkshopApprove}>
                            <a className={(this.state.approveWorkshop)? "nav-link active" : "nav-link"}  href="#"  style={{  color: "#000000"}}>Workshop Proposal Review</a>
                        </li>
                    </ul>
                </div>
                <div>
                    {
                        this.state.approveWorkshop && (
                    <div>
                        <br/><br/>

                        <ApproveWorkshopTable/>
                        <div style={{
                            position: 'absolute',
                            right: 220,
                            top: 160,
                        }}
                        >
                            <DrillDownChart/>
                        </div>

                    </div>
                        )
                    }
                    {
                        this.state.approveResearch && (
                            <div>
                            <br/><br/>
                                <div  style={{
                                    position: 'absolute',
                                    right: 220,
                                    top: 160,
                                }}>
                                <Chart/>
                                </div>
                        <ApproveTable  isResearch = {this.state.isResearch} />
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}
export default Reviewer;