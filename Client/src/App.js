import React from 'react';
import './App.css';
import NavBar from "./components/navBar/navBar";
import Conference from "./components/conference/conference";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserPage from "./components/userProfile/userProfile/userProfile";
import Auth from "./components/auth/auth";
import Attendee from "./components/attendee/attendee";
import UserProfile from "./components/auth/userProfile";

function App() {
    return (
        <div className="App">
            <Router>
                <NavBar/>
                <section>
                    <Switch>
                        <Route path="/userPage" component={UserPage} />
                        <Route path="/conference" component={Conference} exact/>
                        <Route path="/auth" exact component={Auth} />
                        <Route path="/attendee" exact component={Attendee} />
                        <Route path="/profile" exact component={UserProfile} />
                    </Switch>
                </section>
            </Router>
        </div>
    );
}

export default App;
