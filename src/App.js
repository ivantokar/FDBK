import React, { Component } from 'react';
import Contact from './components/Contact';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import Store from './redux/Store';

class App extends Component {

	render() {
		return (
			<Provider store={Store}>
				<Router history={createBrowserHistory()}>
					<Switch>
						<Route component={Contact} exact path="/" />
					</Switch>
				</Router>
			</Provider>
		);
	}
}

export default App;
