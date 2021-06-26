import React from 'react';
import './App.css';
import NavBar from "./components/navBar/navBar";
import Conference from "./components/conference/conference";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserProfile from "./components/userProfile/userProfile/userProfile";

function App() {
    return (
        <div className="App">
            <Router>
                <NavBar/>
                <section>
                    <Switch>
                        {/*<Route path="/" component={} exact/>*/}
                        <Route path="/userPage" component={UserProfile} />
                        <Route path="/conference" component={Conference} exact/>
                    </Switch>
                </section>
            </Router>
        </div>
    );
}

export default App;
