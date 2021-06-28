import React, { Component } from "react";
import {css} from "@emotion/react";
import axios from "axios";

const initialState = {
    days:'',
    hours:'',
    minutes:'',
    seconds:'',
    date:'',
    conference:'',
}

class CountDown extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        this.countDown  = this.countDown.bind(this);

    }

    componentDidMount() {
        this.countDown();
    }

    countDown(){
        console.log(this.props.date)
        let now = new Date()
        // let eventDate = new Date(this.state.conference.date.slice(0,4),this.state.conference.date.slice(5,7),this.state.conference.date.slice(8,10));
        let eventDate = new Date(this.props.date.slice(0,4),this.props.date.slice(5,7),this.props.date.slice(8,10));

        let currentTime = now.getTime();
        let eventTime = eventDate.getTime();

        let remTime = eventTime - currentTime;

        let s = Math.floor(remTime / 1000);
        let m = Math.floor(s / 60);
        let h = Math.floor(m / 60);
        let d = Math.floor(h / 24);

        d %= 30;
        h %= 24;
        m %= 60;
        s %= 60;

        d = (d < 10) ? "0" + d : d;
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;

        this.setState({days:d})
        this.setState({hours:h})
        this.setState({minutes:m})
        this.setState({seconds:s})

        setTimeout(() => {
            this.countDown();
        },1000)


    }


    render(){

        return (
            <div className={"container w-50"}>
                <div className={"form-group m-5"}>
                    <div className={"card row" } style={{background:"rgb(255,255,255,0.2)"}}>
                        <table className="table table-borderless">
                            <tbody>
                            <tr style={{fontSize:"5rem",fontFamily:"Verdana",fontStyle:"bold"}}>
                                <td class="border border-secondary border-5" id={"days"}>{this.state.days}</td>
                                <td class="border border-secondary border-5" id={"hours"}>{this.state.hours}</td>
                                <td class="border border-secondary border-5" id={"minutes"}>{this.state.minutes}</td>
                                <td class="border border-secondary border-5" id={"seconds"}>{this.state.seconds}</td>
                            </tr>
                            <tr style={{fontSize:"25px",fontFamily:"Garamond",fontStyle:"bold"}}>
                                <td>Days</td>
                                <td>Hours</td>
                                <td>Minutes</td>
                                <td>Seconds</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default CountDown;