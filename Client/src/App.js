import React from 'react';
import './App.css';
import NavBar from "./components/navBar/navBar";
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
                        <Route path="/profile" component={UserProfile} />
                    </Switch>
                </section>
            </Router>
        </div>
    );
}

export default App;
