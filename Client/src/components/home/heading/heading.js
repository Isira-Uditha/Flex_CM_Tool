import React, { Component } from "react";
import ConferenceImg from "../../../assets/header-bg.jpg";


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
            <div className={"text-white align-middle"} style={{background:"rgb(1,71,132,0.7)",backgroundImage:`url(${ConferenceImg})`,backgroundSize: "cover",height:"650px"}}  >
                <div className={"row"}>
                    <div className={"col-md-12"}>
                        <div className={"row mb-5"}>&nbsp;</div>
                        <div className={"row mb-5"}>&nbsp;</div>
                        <div className={"row mb-5"}>
                            <span className={"align-middle border-5"}  style={{fontSize:"2rem",fontStyle: 'italic'}} >Welcome To Flex Conference</span>
                        </div>
                        <span className={"text-uppercase align-middle border border-5 p-3 mb-5"} style={{fontFamily:"Georgia",fontSize:"5rem"}}>{this.props.title}</span>
                        <div className={"row"}>
                            <div className={"mt-5"}>
                                <div className={"row mb-3"}></div>
                                <button type={"button"} style={{fontSize:"2rem",fontFamily:"Monospace",fontStyle:"bold"}} onClick={(e) => {this.canvasRender(e),this.props.displayCollapse(e)}}  className="btn btn-warning text-white">{(this.state.hidden == "" ?("Tell Me More") : "Close")}</button>
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