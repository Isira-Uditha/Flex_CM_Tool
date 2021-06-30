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
class Chart extends Component {
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
                    // this.setState({seriesPie: [this.state.rejected,this.state.approved]});
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
                text: "Approval Status "
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
                <input type="button" className="btn btn-primary" value="Summary"  data-bs-toggle="modal"  data-bs-target="#staticBackdrop1" disabled={false} />

                <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false"
                     tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Overall Summary</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <CanvasJSChart options = {options}
                                />
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

export default Chart;