import React, { Component } from "react";
import UserSession from "../auth/userSession";

const initialState = {
    session: true,
}

class NavBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        this.logout = this.logout.bind(this);
        this.ProfileNavigate = this.ProfileNavigate.bind(this);
    }

    logout(e){
        UserSession.setName("null");
        window.location = `/auth`
    }

    ProfileNavigate(e){
        console.log("Navigate")
        window.location = `/profile`
    }

    componentDidMount() {
        if(UserSession.getName() == "null")
            this.setState({session:false})
    }


    render() {
        return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top w-100" style={{background:"rgb(1,71,132,0.5)"}} >
                <div className="container-fluid">
                    <a className="navbar-brand" href="#" style={{color:"yellow"}}><b>FLEX</b></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {this.state.session ?
                                <li className="nav-item">
                                    <a className="nav-link active" style={{color: "whitesmoke"}} aria-current="page"
                                       href="/conference">Conference</a>
                                </li>: " "
                            }
                            <li className="nav-item">
                                <a className="nav-link active" style={{color:"whitesmoke"}} aria-current="page" href="/home">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" style={{color:"whitesmoke"}} href="/"></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" style={{color:"whitesmoke"}} href="/"></a>
                            </li>

                        </ul>

                        <div style={{ position: 'absolute',
                            right: 5,
                            top: 8,}}>
                            {this.state.session ? <div> <i> <svg onClick={this.ProfileNavigate} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                                              className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fillrule="evenodd"
                                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg></i>&nbsp; <button type="button" className="btn btn-dark" onClick={this.logout}>Sign Out</button></div>:  <a href="/auth"><button type="button" className="btn btn-dark" >Sign In</button></a>}

                        </div>

                    </div>
                </div>
            </nav>
        </div>
        )
    }
}

export default NavBar;