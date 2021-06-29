import React, { Component } from "react";
import axios from "axios";


const initialState = {
    conferenceId:'',
    workshops:[],
    hidden: '',
}

class Workshops extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentWillMount() {
        if(this.props.conference_id != null){
            this.setState({conferenceId:this.props.conference_id})
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8087/conference/workshop/${this.state.conferenceId}`)
            .then(response => {
                console.log(response.data)
                    this.setState({ workshops: response.data.data });
            }).catch(error => {
                console.log(error.message);
        })
    }

    render(){

        return (
            <div className={"w-100"} style={{background:"rgb(1,71,132,0.7)"}}>
                <div className={"container"}>
                    <div className={"col-md-12"}>
                        <br/>
                        <h2 className={"text-white text-uppercase"}>Workshop Line-up</h2>
                        <br/>
                        <br/>
                        <div className={"row"} style={{justifyContent:"center"}}>
                            {this.state.workshops.length > 0 && this.state.workshops.map((item, index) => (
                                <div className="card m-4 border-2" style={{width: "18rem",background:"rgb(255,255,255,0.3)"}} key={index}>
                                    <div className="card-body">
                                        <h4 className="card-title text-uppercase" style={{color: "rgb(8, 48, 84)"}}>{item.title}</h4>
                                        <div className={"row"}>
                                            <h6 className="card-title text-start text-white">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</h6>
                                        </div>
                                        <p className="card-title text-start  text-white">Date: {item.date}</p>
                                        <p className="card-title text-start text-white">Time : {item.time}</p>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Workshops;