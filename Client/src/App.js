import React from 'react';
import './App.css';
import Auth from "./components/auth/auth";
import NavBar from "./components/navBar/navBar";
import Attendee from "./components/attendee/attendee";
import Reviewer from "./components/reviewer/reviewer";
import UserProfile from "./components/auth/userProfile";
import Conference from "./components/conference/conference";

import UserPage from "./components/userProfile/userProfile/userProfile";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ResearchPresenter from "./components/researchPresenter/presenter/researchPresenter";

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
                        <Route path="/reviewer" exact component={Reviewer} />
                        <Route path="/presenter" exact component={ResearchPresenter} />
                    </Switch>
                </section>
            </Router>
        </div>
    );
}

export default App;
