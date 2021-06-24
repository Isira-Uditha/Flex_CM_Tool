import React from 'react';
import './App.css';
import NavBar from "./components/navBar/navBar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ConferencesAdmin from './components/admin/adminViewConferences/adminViewConferences';
import RejectedConferencesAdmin  from './components/admin/adminRejectedConferences/adminRejectedConferences';
import ApprovedConferencesAdmin from './components/admin/adminApprovedConferences/adminApprovedConferences';

function App() {
    return (
        <div className="App">
            <Router>
                <NavBar/>
                <section>
                    <Switch>
                        {/*<Route path="/" component={} exact/>*/}
                        <Route path="/" component={ConferencesAdmin} exact />
                        <Route path="/approved-conferences" component={ApprovedConferencesAdmin}/>
                        <Route path="/rejected-conferences" component={RejectedConferencesAdmin}/>


                    </Switch>
                </section>
            </Router>
        </div>
    );
}

export default App;
