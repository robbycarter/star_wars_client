import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
/** importing our pages */
import People from "./people";
import Person from "./person";

export default function Pages() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<People />
				</Route>
				<Route path="/person/:id">
					<Person/>
				</Route>
			</Switch>
		</Router>
	);
}
