import axios from "axios";
import Select from "react-select";
import UserSession from "../auth/userSession";
import React, { Component } from "react";


class Attendee extends React.Component{
    constructor(props) {
        super(props);


    }

    componentDidMount() {
      /*  axios.get(`http://localhost:8087/user/getUser/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ books: response.data.data })
                console.log(response.data.data)
            })
            .catch(error => {
                alert(error.message)
            })*/

        const user = UserSession.getName();

        if(user == "null"){
            window.location = `/auth`
        }



    }

    render() {
        return(
            <h1>Attendee</h1>
        )
    }
}

export default Attendee;