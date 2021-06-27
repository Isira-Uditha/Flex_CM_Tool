import React from 'react';
import './App.css';
import NavBar from "./components/navBar/navBar";
import Conference from "./components/conference/conference";
import ConferencesAdmin from "./components/admin/adminViewConferences/adminViewConferences";
import ApprovedConferencesAdmin from "./components/admin/adminApprovedConferences/adminApprovedConferences";
import RejectedConferencesAdmin from "./components/admin/adminRejectedConferences/adminRejectedConferences";
import AdminView from "./components/admin/adminViewConferences/adminViewAllConferences";
import EditConferenceAdmin from "./components/admin/adminEditConferences/adminEditConferences";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
    return (
        <div className="App">
            <Router>
                <NavBar/>
                <section>
                    <Switch>
                        <Route path="/conference" component={Conference} exact/>
                        <Route path="/admin" component={ConferencesAdmin} />
                        <Route path="/approved-conferences" component={ApprovedConferencesAdmin}/>
                        <Route path="/rejected-conferences" component={RejectedConferencesAdmin}/>
                        <Route path="/Edit-admin-conferences/:id" component={EditConferenceAdmin}/>
                        <Route path="/admin-view" component={AdminView}/>
                    </Switch>
                </section>
            </Router>
        </div>
    );
}

export default App;
