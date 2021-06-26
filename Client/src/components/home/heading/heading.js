import React, { Component } from "react";
import ConferenceImg from "../../../assets/header-bg.jpg"

const initialState = {
    hidden: "",
}

class Home extends Component{
    constructor(props) {
        super(props);
        this.canvasRender  = this.canvasRender.bind(this);
        this.state = initialState;
    }

    canvasRender(e){
        e.preventDefault()
        if(this.state.hidden === ""){
            this.setState({hidden:"show"})
        }else{
            this.setState({hidden:""})
        }
    }
    render(){
        return (
            // <div style={{marginTop:"56px"}}>
            <div>
            <div className={"text-white align-middle"} style={{background:"rgb(1,71,132,0.7)",backgroundImage:`url(${ConferenceImg})`,backgroundSize: "cover",height:"700px"}}  >
                <div className={"row"}>
                    <div className={"col-md-12"} style={{fontFamily:"Georgia",fontSize:"6rem"}}>

                        <div className={"mb-5"}></div>
                        <div className={"row mb-5"}></div>
                        <div className={"row mb-5"}>
                            <span className={"align-middle border-5"}  style={{fontSize:"2rem",fontStyle: 'italic'}} >Welcome To Flex Conference</span>
                        </div>
                        <span className={"align-middle border border-5 p-3"}>{this.props.title}</span>
                        <div className={"row"}>
                            <div className={"text-center  mt-3"}>
                                <button type={"button"} style={{fontSize:"2rem",fontFamily:"Monospace",fontStyle:"bold"}} onClick={(e) => {this.canvasRender(e)}}  className="btn btn-warning text-white">Tell Me More</button>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className={`collapse ${this.state.hidden} container col-md-6`} id="collapseExample">
                                <div className="card card-body">
                                    <label className={"text-primary"}>Some placeholder content for the collapse component. This panel is hidden by default but
                                        revealed when the user activates the relevant trigger.</label>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            </div>
        )
    }
}
export default Home;