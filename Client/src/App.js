import React from 'react';
import './App.css';
import NavBar from "./components/navBar/navBar";
import Conference from "./components/conference/conference";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Router>
                <NavBar/>
                <section>
                    <Switch>
                        <Route path="/conference" component={Conference} exact/>
                    </Switch>
                </section>
            </Router>
        </div>
    );
}

export default App;
