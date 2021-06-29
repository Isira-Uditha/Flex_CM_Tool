import React from 'react';
import './App.css';
import Auth from "./components/auth/auth";
import NavBar from "./components/navBar/navBar";
import Attendee from "./components/attendee/attendee";
import Reviewer from "./components/reviewer/reviewer";
import UserProfile from "./components/auth/userProfile";
import Conference from "./components/conference/conference";

import UserPage from "./components/userProfile/userProfile/userProfile";
import ConferencesAdmin from "./components/admin/adminViewConferences/adminViewConferences";
import ApprovedConferencesAdmin from "./components/admin/adminApprovedConferences/adminApprovedConferences";
import RejectedConferencesAdmin from "./components/admin/adminRejectedConferences/adminRejectedConferences";
import AdminView from "./components/admin/adminViewConferences/adminViewAllConferences";
import EditConferenceAdmin from "./components/admin/adminEditConferences/adminEditConferences";
import AdminDashboard from "./components/admin/adminDashboard/adminDashboard";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ResearchPresenter from "./components/researchPresenter/presenter/researchPresenter";
import Home from "./components/home/home"
import AdminAddMainUsers from "./components/admin/adminAddMainUsers/adminAddMainUsers";


function App() {
    return (
        <div className="App">
            <Router>
                <NavBar/>
                <section>
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route path="/userPage" component={UserPage} />
                        <Route path="/conference" component={Conference} exact/>
                        <Route path="/auth" exact component={Auth} />
                        <Route path="/attendee" exact component={Attendee} />
                        <Route path="/profile" exact component={UserProfile} />
                        <Route path="/reviewer" exact component={Reviewer} />
                        <Route path="/presenter" exact component={ResearchPresenter} />
                        <Route path="/admin" component={ConferencesAdmin} />
                        <Route path="/approved-conferences" component={ApprovedConferencesAdmin}/>
                        <Route path="/rejected-conferences" component={RejectedConferencesAdmin}/>
                        <Route path="/Edit-admin-conferences/:id" component={EditConferenceAdmin}/>
                        <Route path="/admin-view" component={AdminView}/>
                        <Route path="/admin-dashboard" component={AdminDashboard}/>
                        <Route path="/admin-add-users" component={AdminAddMainUsers}/>

                    </Switch>
                </section>
            </Router>
        </div>
    );
}

export default App;
