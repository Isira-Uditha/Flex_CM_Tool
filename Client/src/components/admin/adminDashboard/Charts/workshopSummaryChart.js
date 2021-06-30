import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import React, { Component } from "react";
import  $ from 'jquery';
import axios from "axios";

const initialState = {
    approved: 0,
    rejected: 0,
    pending: 0
}

class WorkshopSummaryChart extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        //API call to fetch user added workshops
        axios.get(`http://localhost:8087/admin/amountApprovesWorkshops`).then(response => {
            console.log('USER ADDED WORKSHOPS', response.data.data);
            this.setState({approved: response.data.data});
            axios.get(`http://localhost:8087/admin/amountRejectedWorkshops`).then(response => {
                console.log('USER ADDED WORKSHOPS', response.data.data);
                this.setState({rejected: response.data.data});
                console.log(response.data.data)
                axios.get(`http://localhost:8087/admin/amountPendingWorkshops`).then(response => {
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
            theme: "dark1",
            size: -1,
            title: {
                text: "Workshop Approval Status"
            },
            data: [
                {
                    // Change type to "doughnut", "line", "splineArea", etc.
                    type: "column",
                    dataPoints: [
                        { label: "Pending",  y: this.state.pending  },
                        { label: "Rejected", y:this.state.rejected },
                        { label: "Approved", y:this.state.approved},
                    ]
                }
            ]
        }
        return (
            <div>
                <CanvasJSChart options = {options} />
            </div>
        );
    }
}

export default WorkshopSummaryChart;