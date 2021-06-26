import React, { Component } from "react";
import Heading from "../home/heading/heading";
import axios from "axios";

const initialState = {
    conference: [],
}

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        axios.get(`http://localhost:8087/conference/post/conference`)
            .then(response => {
                this.setState({ conference: response.data.data[0] });
                console.log(this.state.conference);
            });
    }

    render(){
        return (
            <div className={""}>
                <Heading title={this.state.conference.title} />
            </div>
        )
    }
}
export default Home;