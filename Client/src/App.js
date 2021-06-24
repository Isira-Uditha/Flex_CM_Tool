import React from 'react';
import './App.css';
import NavBar from "./components/navBar/navBar";
import Auth from "./components/auth/auth";
import Attendee from "./components/attendee/attendee";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Router>
                <NavBar/>
                <section>
                    <Switch>
                        {/*<Route path="/" component={} exact/>*/}
                        <Route path="/auth" exact component={Auth} />
                        <Route path="/attendee/:id" exact component={Attendee} />
                    </Switch>
                </section>
            </Router>
        </div>
    );
}

export default App;
