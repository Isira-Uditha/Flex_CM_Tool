import React, { Component } from "react";
import CanvasJSReact from './canvasjs.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
import axios from "axios";

const initialState = {
    approved: 0,
    rejected: 0,
    pending: 0

}

class ConferenceSummary extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        axios.get(`http://localhost:8087/admin/admin/amountApprovedConference`).then(response => {
            const data = response.data.data;
            this.setState({approved: data});
        }).then(data => {
            axios.get(`http://localhost:8087/admin/admin/amountRejectedConference`).then(response => {
                console.log('rejected xxxxxx', response.data.data);
                this.setState({rejected: response.data.data});
                console.log(response.data.data)
            }).then(data => {
                axios.get(`http://localhost:8087/admin/amountPendingResearches`).then(response => {
                    console.log('consference pending', response.data.data);
                    this.setState({pending: response.data.data});
                    console.log(response.data.data)
                })
            })
        })
        console.log(this.state.rejected)
    }

    render(){
        const options = {
            theme: "dark2", // "light1", "dark1", "dark2",
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
            <div className={"w-100"} style={{background:"rgb(1,71,132,0.7)"}}>
                <CanvasJSChart options = {options}/>
            </div>
        )
    }
}
export default ConferenceSummary;