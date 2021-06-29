import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import React, { Component } from "react";
import axios from "axios";

const initialState = {
    approved: 0,
    rejected: 0,
    pending: 0
}
class ResearchSummaryChart extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    componentDidMount() {
        //API call to fetch user added workshops
        axios.get(`http://localhost:8087/reviewer/amountApprovesResearches`).then(response => {
            console.log('USER ADDED WORKSHOPS', response.data.data);
            this.setState({approved: response.data.data});
            axios.get(`http://localhost:8087/reviewer/amountRejectedResearches`).then(response => {
                console.log('USER ADDED WORKSHOPS', response.data.data);
                this.setState({rejected: response.data.data});
                console.log(response.data.data)
                // this.setState({seriesPie: [this.state.rejected,this.state.approved]});
                axios.get(`http://localhost:8087/reviewer/amountPendingResearches`).then(response => {
                    console.log('USER ADDED WORKSHOPS', response.data.data);
                    this.setState({pending: response.data.data});
                    console.log(response.data.data)
                })
            })
        })
        console.log(this.state.rejected)
    }

    render() {
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "dark2", // "light1", "dark1", "dark2",
            size: 1,
            title:{
                text: "Research Approval Status "
            },
            data: [{
                type: "pie",
                indexLabel: "{label}: {y}%",
                startAngle: -90,
                dataPoints: [
                    { y: this.state.approved, label: "Approve" },
                    { y: this.state.rejected, label: "Rejected" },
                    { y: this.state.pending, label: "Pending" },
                ]
            }]
        }

        return (
            <div>
                                <CanvasJSChart options = {options}
                                />
            </div>

        );
    }
}

export default ResearchSummaryChart;