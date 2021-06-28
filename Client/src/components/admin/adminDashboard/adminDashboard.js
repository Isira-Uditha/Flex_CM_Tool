import React, { Component } from "react";
import Chart from "react-apexcharts";
import '../../../App.css'

class AdminDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: ['Approved_Conferences', 'Rejected_Conferences']
                }
            },
            series: [
                {
                    name: "series-1",
                    data: [30, 40]
                }
            ],

            optionsPie: {},
            seriesPie: [45, 55 ],
            labelsPie: ['A', 'B']
        };
    }

    render() {
        return (


            <div className="container">
               {/* <div class="sidenav1">
                    <a href="#">Conferences</a>
                    <a href="#">Researchers</a>
                </div>*/}
                <br/><br/>
                <div className="row">
                <div className="bar_graph">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="bar"
                            width="500"
                        />
                    </div>
                </div>

                <div className="donut" >
                    <Chart options={this.state.optionsPie} series={this.state.seriesPie} type="donut" width="380" />
                </div>
                </div>
            </div>




        );
    }
}

export default AdminDashboard;
