import React, { Component } from "react";

class NavBar extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary" >
                <div className="container-fluid">
                    <a className="navbar-brand" href="#" style={{color:"whitesmoke"}}><b>FLEX</b></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" style={{color:"whitesmoke"}} aria-current="page" href="/conference">Conference</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" style={{color:"whitesmoke"}} href="/"></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" style={{color:"whitesmoke"}} href="/"></a>
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