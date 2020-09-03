import React, { Component } from "react";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import Dashboard from "./Components/Dashboard";

class App extends Component {
    
    render() {
        const auth = localStorage.getItem('authenticated');
        return (
            <Router>
                <Route exact path="/" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/dashboard" render = {() => (auth ?  (<Dashboard/>) : (<Redirect to="/" />))}/>
            </Router>
        );
    }
}

export default App;