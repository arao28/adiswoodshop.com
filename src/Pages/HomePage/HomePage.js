import React from 'react';

import './HomePage.scss';

import Page from '../../Layout/Page/Page';
import { projects } from '../../Info/Projects/Projects';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
	renderProjects() {
		return projects.map((p) => 
			<Link to={"/work/" + p.navigation}>
				<div className="home-project">
					<p>{p.name}</p>
					<div className="home-project-logo">
						{[...Array(3)].map(() => <div className="home-project-logo-part"/>)}
					</div>
				</div>
			</Link>);
	}

	render() {
		return (
			<Page>
				<div className="home-wrapper">
					<div className="home-title">
						<div className="home-title-logo">
							{[...Array(3)].map(() => <div className="home-title-logo-part"/>)}
						</div>
						<h1 className="home-title-text">Adi Rao</h1>
					</div>
					<div className="home-projects-wrapper">
						{this.renderProjects()}
					</div>
				</div>
			</Page>
		);
	}
}

HomePage.defaultProps = {
}

export default HomePage;