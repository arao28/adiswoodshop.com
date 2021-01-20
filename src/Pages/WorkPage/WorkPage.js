import React from 'react';

import './WorkPage.scss';

import Page from '../../Layout/Page/Page';
import { projects } from '../../Info/Projects/Projects';
import { withRouter } from 'react-router-dom';

const carouselHeight = 50;
const gapWidth = 4;

class ImageCarousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: 0,
			widths: [],
			margin: (gapWidth / 100) * window.innerHeight
		}
		this.setActive = this.setActive.bind(this);
		this.renderImages = this.renderImages.bind(this);
		this.calculateMargin = this.calculateMargin.bind(this);
	}

	componentDidMount() {
		let widths = [];
		this.props.images.forEach((imgUrl, i) => {
			let img = new Image(); img.src = imgUrl;
			const imageHeight = window.innerHeight * (carouselHeight / 100);
			img.onload = () => widths[i] = ((img.width / img.height) * imageHeight);
		})
		this.setState({widths});
	}

	setActive(i) {
		this.setState({active: i}, this.calculateMargin);
	}

	renderImages() {
		return this.props.images.map(
			(path, i) => {
				const activeStyle = (i == this.state.active) ? "active-image" : "inactive-image";
				return (<img className={activeStyle} onClick={() => this.setActive(i)} src={path}/>);
			}
		)
	}

	calculateMargin() {
		var i;
		let widths = this.state.widths;
		let gap = (gapWidth / 100) * (window.innerHeight);

		let totalWidth = 0;
		for (i = 0; i < this.state.active; i++) { totalWidth -= widths[i] }
		totalWidth += (window.innerWidth - widths[this.state.active]) / 2
		totalWidth -= gap * this.state.active;

		const minMargin = gap; const maxMargin = window.innerWidth - (this.state.widths.reduce((t,w) => t = t+w+gap, 0));
		let margin = totalWidth;
		margin = Math.min(totalWidth, minMargin);
		margin = Math.max(margin, maxMargin);

		this.setState({margin});
	}

	render() {
		return (
			<div className="work-carousel" style={{marginLeft: this.state.margin}}>
				{this.renderImages()}
			</div>
		)
	}
}

class WorkPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			images: []
		}
	}

	getWork() {
		let pathName = this.props.match.url;
		let workNav = pathName.split("/")[2];
		const workInfo = projects.find((work) => workNav === work.navigation);

		let name = workInfo.name; let images = workInfo.images; 
		this.setState({ name, images });
	}

	componentDidUpdate(prevProps) { if (this.props.location !== prevProps.location) { this.getWork() } }
	componentWillMount() { this.getWork() }

	render() {
		return (
			<Page>
				<div className="work-wrapper">
					<div className="work-info">
						<div className="work-title">{this.state.name}</div>
						<ImageCarousel images={this.state.images}/>
					</div>
				</div>
			</Page>
		);
	}
}

export default withRouter(WorkPage);