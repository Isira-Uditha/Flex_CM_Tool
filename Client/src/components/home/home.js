import React, { Component } from "react";
import Heading from "../home/heading/heading";
import axios from "axios";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";
import Description from "./description/description";
import "./home.css";
import CountDown from "./countdown/countdown";
import Speakers from "./speakers/speakers";

const initialState = {
    conference: [],
    loading: true,
    hidden: "",
}

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        this.displayCollapse  = this.displayCollapse.bind(this);

    }

    componentDidMount() {
        axios.get(`http://localhost:8087/conference/post/conference`)
            .then(response => {
                this.setState({ conference: response.data.data[0] });
                console.log(this.state.conference);
            }).then(
                response =>{
                    setTimeout(() => {
                        this.setState({loading:false})
                    },1500)
                });
    }

    displayCollapse(e){
        e.preventDefault()
        if(this.state.hidden === ""){
            this.setState({hidden:"show"})
        }else{
            this.setState({hidden:""})
        }
    }


    render(){
        const override = css`
            display: block;
            margin: 0 auto;
            border-color: red;
        `;
        return (
        <div className={"w-100"}>
            <div className="sweet-loading">
                <ClipLoader css={override} size={100} color={"#123abc"} loading={this.state.loading} speedMultiplier={1} />
                <BeatLoader css={override} size={20} color={"#b53019"} loading={this.state.loading} speedMultiplier={1}/>
            </div>
            <div className={""}>
                <Heading displayCollapse={this.displayCollapse} title={this.state.conference.title}  conference={this.state.conference} tracks={this.state.conference.tracks} />
                <div className={"row text-start"} style={{marginTop:"-40px"}}>
                    <div className={`collapse ${this.state.hidden} container col-md-5`} id="collapseExample">
                        <div className="card card-body bg-secondary text-white">
                            <div dangerouslySetInnerHTML={{ __html: this.state.conference.tracks }}/>
                        </div>
                    </div>
                </div>
                <br/>
                <Description date={this.state.conference.date} description={this.state.conference.description}/>
                <CountDown date={this.state.conference.date}/>
                <Speakers speakers={this.state.conference.speakers} g_speaker={this.state.conference.g_speaker} g_url={this.state.conference.g_url}/>
            </div>
        </div>
    )
    }
}
export default Home;