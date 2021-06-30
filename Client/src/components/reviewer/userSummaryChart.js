/* App.js */
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import React, { Component } from "react";
import axios from "axios";
import Chart from "./chart";

const initialState = {
   options: [],
   chartOptions: []

}
class UserSummaryChart extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        //API call to fetch user added workshops
        axios.get(`http://localhost:8087/reviewer/summaryOfUsers`).then(response => {
            console.log('USER ADDED WORKSHOPS', response.data.data);
            this.setState({options: response.data.data});
            let data = [];
            for(let i =0 ; i < this.state.options.length ; i++) {


                    console.log("fff"+this.state.options[i]._id);
                    let n = {
                        name: this.state.options[i]._id,
                        y: this.state.options[i].count,

                    }
                    data.push(n)
            }
            this.setState({
                chartOptions: data
            }, () => {
                console.log("bbbbbbbbbb"+this.state.chartOptions.length)

                console.log(this.state.chartOptions);
            })
        })
        console.log(this.state.options)
    }
    render() {
        const options = {
            theme: "dark2", // "light1", "dark1", "dark2",
            animationEnabled: true,
            size: -1,
            title: {
                text: ""
            },
            subtitles: [{
                text: "User Summary",
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
                 this.state.chartOptions



                    /*{ name: "Unsatisfied", y: 5 },
                    { name: "Very Unsatisfied", y: 31 },
                    { name: "Very Satisfied", y: 40 },
                    { name: "Satisfied", y: 17 },
                    { name: "Neutral", y: 7 }*/



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
}
export default UserSummaryChart;