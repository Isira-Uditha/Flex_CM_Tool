import React, { Component } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import '../../../App.css'

const initialState = {
    approved: 0,
    rejected: 0,
    pending: 0

}
class AdminPieChart extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.state = {

            optionsPie: {},
            seriesPie: [],
            labelsPie: ['Approved', 'Pending']
        };
    }

    componentDidMount() {
        //API call to fetch user added workshops
        axios.get(`http://localhost:8087/admin/amountApprovedConference`).then(response => {
            console.log('USER ADDED WORKSHOPS', response.data.data);
            this.setState({approved: response.data.data});
            axios.get(`http://localhost:8087/admin/amountRejectedConference`).then(response => {
                console.log('USER ADDED WORKSHOPS', response.data.data);
                this.setState({rejected: response.data.data});
                console.log(response.data.data)

                axios.get(`http://localhost:8087/admin/amountPendingConference`).then(response => {
                    console.log('USER ADDED WORKSHOPS', response.data.data);
                    this.setState({pending: response.data.data});
                    console.log(response.data.data)

                    this.setState({seriesPie: [this.state.rejected,this.state.approved,this.state.pending]});
                })


            })


        })



        console.log(this.state.rejected)
    }

   render(){
        return(


                <div className="card-body" style={{height: "10rem"}}>
               <div className="donut" >
                   <Chart options={this.state.optionsPie} series={this.state.seriesPie} type="donut" width="380" />
               </div>
                </div>




        );
   }
}

export default AdminPieChart;