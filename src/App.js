import React, { Component } from "react";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Table from "./Components/Table";

class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/view" component={Table} />
            </Router>
        );
    }
}

export default App;