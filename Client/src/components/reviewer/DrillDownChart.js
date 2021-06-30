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

class DrillDownChart extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        //API call to fetch user added workshops
        axios.get(`http://localhost:8087/reviewer/amountApprovesWorkshops`).then(response => {
            console.log('USER ADDED WORKSHOPS', response.data.data);
            this.setState({approved: response.data.data});
            axios.get(`http://localhost:8087/reviewer/amountRejectedWorkshops`).then(response => {
                console.log('USER ADDED WORKSHOPS', response.data.data);
                this.setState({rejected: response.data.data});
                console.log(response.data.data)
                axios.get(`http://localhost:8087/reviewer/amountPendingWorkshops`).then(response => {
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
            theme: "dark2",
            animationEnabled: true,
            size: -2,
            title: {
                text: ""
            },
            subtitles: [{
                text: "Approval Status",
                verticalAlign: "center",
                fontSize: 20,
                dockInsidePlotArea: true
            }],
            data: [{
                type: "doughnut",
                showInLegend: true,
                indexLabel: "{name}: {y}",
                yValueFormatString: "#,###'%'",
                dataPoints:
                    [

                        { name: "Pending", y: this.state.pending},
                        { name: "Rejected", y: this.state.rejected },
                        { name: "Approved", y: this.state.approved },

                    ]

            }]
        }
        return (
            <div>
                <input type="button" className="btn btn-primary" value="Summary"  data-bs-toggle="modal"  data-bs-target="#staticBackdrop1" disabled={false} />

                <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false"
                     tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Overall Summary</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className={"col-md-1"}>
                                    <CanvasJSChart options = {options}/>
                                </div>
                            </div>
                            <div className="modal-footer">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DrillDownChart;