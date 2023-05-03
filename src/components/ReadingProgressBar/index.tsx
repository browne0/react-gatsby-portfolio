import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from './throttle';

export default class ProgressBar extends Component {
	static propTypes = {
		targetEl: PropTypes.string.isRequired,
		rootEl: PropTypes.string,
		className: PropTypes.string,
	};

	static defaultProps = {};

// @ts-expect-error TS(7006): Parameter 'props' implicitly has an 'any' type.
	constructor(props) {
		super(props);

// @ts-expect-error TS(2339): Property 'targetEl' does not exist on type 'Progre... Remove this comment to see the full error message
		this.targetEl = null;
// @ts-expect-error TS(2339): Property 'rootEl' does not exist on type 'Progress... Remove this comment to see the full error message
		this.rootEl = null;
// @ts-expect-error TS(2339): Property 'max' does not exist on type 'ProgressBar... Remove this comment to see the full error message
		this.max = 0;
// @ts-expect-error TS(2339): Property 'viewportH' does not exist on type 'Progr... Remove this comment to see the full error message
		this.viewportH = 0;
// @ts-expect-error TS(2339): Property 'targetHeight' does not exist on type 'Pr... Remove this comment to see the full error message
		this.targetHeight = 0;

		this.state = {
			value: 0,
		};
	}

	componentDidMount() {
// @ts-expect-error TS(2339): Property 'timeout' does not exist on type 'Progres... Remove this comment to see the full error message
		this.timeout = setTimeout(() => {
// @ts-expect-error TS(2339): Property 'unmounted' does not exist on type 'Progr... Remove this comment to see the full error message
			if (this.unmounted) return;
			const { props } = this;

// @ts-expect-error TS(2339): Property 'targetEl' does not exist on type 'Progre... Remove this comment to see the full error message
			this.targetEl = props.targetEl
// @ts-expect-error TS(2339): Property 'targetEl' does not exist on type 'Readon... Remove this comment to see the full error message
				? document.querySelector(props.targetEl)
				: document.body;
// @ts-expect-error TS(2339): Property 'rootEl' does not exist on type 'Progress... Remove this comment to see the full error message
			this.rootEl = props.rootEl
// @ts-expect-error TS(2339): Property 'rootEl' does not exist on type 'Readonly... Remove this comment to see the full error message
				? document.querySelector(props.rootEl)
				: window;

			this.measure();
			window.addEventListener('scroll', this.handleScroll);
			window.addEventListener('resize', this.handleResize);
		}, 101);
	}

	componentWillUnmount() {
// @ts-expect-error TS(2339): Property 'timeout' does not exist on type 'Progres... Remove this comment to see the full error message
		if (this.timeout) clearTimeout(this.timeout);
// @ts-expect-error TS(2339): Property 'unmounted' does not exist on type 'Progr... Remove this comment to see the full error message
		this.unmounted = true;
		window.removeEventListener('scroll', this.handleScroll);
		window.removeEventListener('resize', this.handleResize);
	}

	measureViewportHeight() {
// @ts-expect-error TS(2339): Property 'rootEl' does not exist on type 'Readonly... Remove this comment to see the full error message
		return !this.props.rootEl
			? Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
// @ts-expect-error TS(2339): Property 'rootEl' does not exist on type 'Progress... Remove this comment to see the full error message
			: this.rootEl.clientHeight;
	}

	measure() {
// @ts-expect-error TS(2339): Property 'targetHeight' does not exist on type 'Pr... Remove this comment to see the full error message
		this.targetHeight = this.targetEl.getBoundingClientRect().height;
// @ts-expect-error TS(2339): Property 'viewportH' does not exist on type 'Progr... Remove this comment to see the full error message
		this.viewportH = this.measureViewportHeight();
// @ts-expect-error TS(2339): Property 'max' does not exist on type 'ProgressBar... Remove this comment to see the full error message
		this.max = document.scrollingElement.scrollHeight - this.viewportH;
		this.update();
	}

	handleResize = () => {
		throttle(this.measure(), 100);
	};

	handleScroll = () => {
		throttle(this.update(), 100);
	};

	update = () => {
// @ts-expect-error TS(2531): Object is possibly 'null'.
		const value = document.scrollingElement.scrollTop;

		this.setState({
			value,
		});
	};

	render() {
		return (
			<progress
// @ts-expect-error TS(2339): Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
				value={this.state.value}
// @ts-expect-error TS(2339): Property 'max' does not exist on type 'ProgressBar... Remove this comment to see the full error message
				max={this.max}
// @ts-expect-error TS(2339): Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
				className={this.props.className}
			/>
		);
	}
}
