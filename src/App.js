import React from 'react';

import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';

import {
	CSSTransition,
	TransitionGroup
} from 'react-transition-group';

import HomePage from './Pages/HomePage/HomePage';
import WorkPage from './Pages/WorkPage/WorkPage';

function App() {
	return (
		<Router>
			<Route render={({location}) => (
				<TransitionGroup>
					<CSSTransition key={location.key} timeout={300} classNames="fade">
						<Switch location={location}>
							<Route path="/work/:work_id"><WorkPage/></Route>
							<Route path="/" exact><HomePage/></Route>
						</Switch>
					</CSSTransition>
				</TransitionGroup>
			)}/>
		</Router>
	);
}

export default App;
