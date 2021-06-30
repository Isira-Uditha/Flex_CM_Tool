/* App.js */
import Notification from "../../../reviewer/notification";

import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import React, { Component } from "react";
import axios from "axios";

const initialState = {
    options: [],
    chartOptions: []

}
class UserSummaryBarChart extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this.addSymbols = this.addSymbols.bind(this);
    }

    componentDidMount() {
        //API call to fetch user added workshops
        axios.get(`http://localhost:8087/admin/summaryOfUsers`).then(response => {
            console.log('USER ADDED WORKSHOPS', response.data.data);
            this.setState({options: response.data.data});
            let data = [];
            for(let i =0 ; i < this.state.options.length ; i++) {


                console.log("fff"+this.state.options[i]._id);
                let n = {
                    y: this.state.options[i].count,
                    label: this.state.options[i]._id
                }
                data.push(n)
            }
            this.setState({
                chartOptions: data
            }, () => {
                console.log("bbbbbbbbbbgggg"+this.state.chartOptions.length)

                console.log(this.state.chartOptions);
            })
        })
        console.log(this.state.options)
    }
    render() {
        const options = {
            animationEnabled: true,
            theme: "dark2",
            title:{
                text: "User Status in Past Week"
            },
            axisX: {
                title: "User Role",
                reversed: true,
            },
            axisY: {
                title: "User Amount",
                includeZero: true,
                labelFormatter: this.addSymbols
            },
            data: [{
                type: "bar",
                dataPoints:
                this.state.chartOptions
            }]
        }
        return (
            <div>
                <CanvasJSChart options = {options}
                    /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
    addSymbols(e){
        var suffixes = ["", "K", "M", "B"];
        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(10)), 0);
        if(order > suffixes.length - 1)
            order = suffixes.length - 1;
        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }
}
export default UserSummaryBarChart;