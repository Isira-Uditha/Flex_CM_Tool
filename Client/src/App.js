import React from 'react';
import './App.css';
import Auth from "./components/auth/auth";
import NavBar from "./components/home/navBar/navBar";
import Attendee from "./components/attendee/attendee";
import Reviewer from "./components/reviewer/reviewer";
import UserProfile from "./components/auth/userProfile";
import Conference from "./components/conference/conference";
import UserPage from "./components/userProfile/userProfile/userProfile";
import AdminView from "./components/admin/adminViewConferences/adminViewAllConferences";
import AdminDashboard from "./components/admin/adminDashboard/adminDashboard";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ResearchPresenter from "./components/researchPresenter/presenter/researchPresenter";
import Home from "./components/home/home";
import DownloadTemplate from "./components/downloadTemplates/downloadTemplate";
import AdminUserhandle from "./components/admin/adminUserhandle/adminUserhandle";



function App() {
    return (
        <div className="App">
            <Router>
                <NavBar/>
                <section>
                    <Switch>
                        <Route path="/" component={Home} exact/>
                        <Route path="/userPage" component={UserPage} />
                        <Route path="/conference" component={Conference} />
                        <Route path="/auth" exact component={Auth} />
                        <Route path="/attendee" exact component={Attendee} />
                        <Route path="/profile" exact component={UserProfile} />
                        <Route path="/reviewer" exact component={Reviewer} />
                        <Route path="/presenter" exact component={ResearchPresenter} />
                        <Route path="/admin-view" component={AdminView}/>
                        <Route path="/admin-dashboard" component={AdminDashboard}/>
                        <Route path="/downloads" exact component={DownloadTemplate} />
                        <Route path="/admin-add-users" component={AdminUserhandle}/>
                    </Switch>
                </section>
            </Router>
        </div>
    );
}

export default App;
