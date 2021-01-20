import React from 'react';

import './WorkPage.scss';

import IMG1 from './random/IMG_2501.jpg';
import IMG2 from './random/A5329F47-B32B-4FBD-972F-5CF8251CB595.JPG'

import Page from '../../Layout/Page/Page';

const carouselHeight = 45;
// const gapWidth = 4;
const gapWidth = 0;

class ImageCarousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: 0,
			widths: [],
			margin: 0
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

		let totalWidth = 0;
		for (i = 0; i < this.state.active; i++) {
			totalWidth -= widths[i] //+ (window.innerHeight * (gapWidth / 100))
		}
		totalWidth += (window.innerWidth - widths[this.state.active]) / 2

		const minMargin = 0; const maxMargin = window.innerWidth - (this.state.widths.reduce((t,w) => t = t+w , 0));
		console.log(totalWidth, maxMargin);
		const margin = Math.max(Math.min(totalWidth, minMargin), maxMargin);
		console.log(margin);
		console.log()

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
	render() {
		return (
			<Page>
				<div className="work-wrapper">
					<div className="work-info">
						<div className="work-title">{this.props.name}</div>
						<ImageCarousel images={this.props.images}/>
					</div>
				</div>
			</Page>
		);
	}
}

WorkPage.defaultProps = {
	name: "Project",
	images: [IMG1, IMG2, IMG1, IMG2, IMG1]
}

export default WorkPage;