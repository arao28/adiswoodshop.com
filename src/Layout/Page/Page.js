import React from 'react';

import './Page.scss';

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			width: window.innerWidth, 
			height: window.innerHeight,
		};

		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() { this.updateWindowDimensions(); window.addEventListener('resize', this.updateWindowDimensions); }
	componentWillUnmount() { window.removeEventListener('resize', this.updateWindowDimensions); }
	updateWindowDimensions() { this.setState({ width: window.innerWidth, height: window.innerHeight }); }

	render() {
		const aspectRatio = (this.state.width / this.state.height);
		const resize = (aspectRatio < this.props.resizeRatios[0]);
		const resizeNum = this.props.resizeRatios.map((x) => aspectRatio < x).lastIndexOf(true)
		const resizeStyle = resize ? (this.props.resizeStyle + '-' + this.props.resizePrefixes[resizeNum]) : ""
		console.log(resizeStyle)

		return (
			<div className="page-wrapper">
				<div className={"main-content" + " main-content-resize " + resizeStyle}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

Page.defaultProps = {
	resizeStyle: 'resize',
	resizeRatios: [1.3, 1],
	resizePrefixes: ["tablet", "mobile"]
}

export default Page;