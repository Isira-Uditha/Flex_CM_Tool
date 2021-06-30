import React, { Component } from "react";
import './description.css'

const initialState = {
    loading: true,
    year: '',
}



class Description extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({year:this.props.date.slice(0,4)})
        }, 1000)
    }

    render(){

        return (
            <div className={""}>
                <div className="dec-card" >
                    <br/>
                    <div className={"row"}>
                        <div className={"col-md-2"}>&nbsp;</div>
                        <div className={"col-md-8"}>
                            <span className={"align-middle text-uppercase  text-warning"}  style={{fontSize:"30px",fontStyle: 'bold',fontFamily:'Georgia'}} >International Conference On Advancement In Computing <h1>{this.state.year}</h1></span>
                        </div>
                        <div className={"col-md-2"}>&nbsp;</div>
                    </div>
                    <br/>
                    <br/>
                    <div className="row">
                        <div className={"col-md-2"}>&nbsp;</div>
                        <div className={"col-md-8"}>
                            <div class={"card bg-transparent border-light"}>
                                <div className={"card-body text-white"}>
                                    {this.props.description}
                                </div>
                            </div>
                        </div>
                        <div className={"col-md-2"}>&nbsp;</div>
                    </div>
                    <br/>
                    <br/>
                </div>
            </div>
        )
    }
}
export default Description;