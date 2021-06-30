import React, { Component } from "react";
import UserSession from "../../auth/userSession";
import Notification from "../../reviewer/notification";
import * as RoleTypes from "../../auth/rolesTypes.constants"

const initialState = {
    session: true,
    roleAdmin: false,
    roleEditor: false,
    roleReviewer: false,
    roleResearcher: false,
    roleWorkshop: false,
    roleDownloads: false,
    roleAttendee: false
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
        if (UserSession.getName() == "null") {
            this.setState({session: false})
        }else if(UserSession.getRole() == RoleTypes.ADMIN ){
            this.setState({roleAdmin: true})
        }else if(UserSession.getRole() == RoleTypes.EDITOR){
            this.setState({roleEditor: true})
        }else if(UserSession.getRole() == RoleTypes.REVIEWER){
            this.setState({roleReviewer: true})
        }else if(UserSession.getRole() == RoleTypes.RESEARCHER){
            this.setState({roleResearcher: true})
            this.setState({roleDownloads: true})
        }else if(UserSession.getRole() == RoleTypes.WORKSHOP_PRESENTEE){
            this.setState({roleWorkshop: true})
            this.setState({roleDownloads: true})
        }else if(UserSession.getRole() == RoleTypes.ATTENDEE){
            this.setState({roleAttendee: true})
        }
    }

    renderNotification(){
        return <Notification/>
    }


    render() {
        return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top w-100" style={{background:"rgb(1,71,132,0.5)"}} >
                <div className="container-fluid">
                    <a className="navbar-brand" href="/" style={{color:"yellow"}}><b>FLEX</b></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" style={{color:"whitesmoke"}} aria-current="page" href="/">Home</a>
                            </li>
                            {this.state.roleAdmin ?
                                <li className="nav-item">
                                    <a className="nav-link active" style={{color: "whitesmoke"}} aria-current="page"
                                       href="/admin-dashboard">DashBoard</a>
                                </li>: " "
                            }
                            {this.state.roleEditor ?
                                <li className="nav-item">
                                    <a className="nav-link active" style={{color: "whitesmoke"}} aria-current="page"
                                       href="/conference">Conference</a>
                                </li>: " "
                            }
                            {this.state.roleReviewer ?
                                <li className="nav-item">
                                    <a className="nav-link active" style={{color: "whitesmoke"}} aria-current="page"
                                       href="/reviewer">Review</a>
                                </li>: " "
                            }
                            {this.state.roleResearcher ?
                                <li className="nav-item">
                                    <a className="nav-link active" style={{color: "whitesmoke"}} aria-current="page"
                                       href="/userPage">Researches</a>
                                </li>: " "
                            }
                            {this.state.roleWorkshop ?
                                <li className="nav-item">
                                    <a className="nav-link active" style={{color: "whitesmoke"}} aria-current="page"
                                       href="/presenter">Workshops</a>
                                </li>: " "
                            }
                            {this.state.roleDownloads ?
                                <li className="nav-item">
                                    <a className="nav-link active" style={{color: "whitesmoke"}} aria-current="page"
                                       href="/downloads">Downloads</a>
                                </li>: " "
                            }
                            {this.state.roleAttendee ?
                                <li className="nav-item">
                                    <a className="nav-link active" style={{color: "whitesmoke"}} aria-current="page"
                                       href="/attendee">Payments</a>
                                </li>: " "
                            }

                            {this.state.session ?
                                <li className="nav-item" style={{
                                position: 'absolute',
                                right: 150,
                                top: 8,
                            }}>
                                {this.renderNotification()}
                            </li> : ""}
                            <li className="nav-item">
                                <div style={{
                                    position: 'absolute',
                                    right: 5,
                                    top: 8,
                                }}>
                                    {this.state.session ? <div><i>
                                        <svg onClick={this.ProfileNavigate} xmlns="http://www.w3.org/2000/svg"
                                             width="30" height="30" fill="currentColor"
                                             className="bi bi-person-circle" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                            <path fillRule="evenodd"
                                                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                        </svg>
                                    </i>&nbsp;
                                        <button type="button" className="btn btn-dark"  style={{ background:  "rgb(8, 48, 84, 0.5)"}} onClick={this.logout}>Sign Out
                                        </button>
                                    </div> : <a href="/auth">
                                        <button type="button" className="btn btn-dark"  style={{ background:  "rgb(8, 48, 84, 0.5)"}}>Sign In</button>
                                    </a>}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        )
    }
}

export default NavBar;