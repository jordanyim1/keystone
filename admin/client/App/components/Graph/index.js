/**
 * The global Footer, displays a link to the website and the current Keystone
 * version in use
 */

import React from 'react';
import { css } from 'glamor';
import Chart from 'chart.js';
import { parseListModels } from './graphService.js';

const Graph = React.createClass({
	displayName: 'Graph',
	propTypes: {
		items: React.PropTypes.array,
		listName: React.PropTypes.string,
	},
	componentDidMount () {
		const ctx = document.getElementById('analyticsChart').getContext('2d');
		const options = {};
		const graphData = parseListModels(this.props.items);
		console.log(graphData);
		const data = {

			labels: graphData.labels,
			datasets: [{
				label: this.props.listName + ' created',
				backgroundColor: '#ffffff',
				borderColor: '#1385e5',
				data: graphData.data,
				fill: false,
			}],
		};
		
		const stackedLine = new Chart(ctx, {
			type: 'line',
			data: data,
			options: options,
		});
	},
	// Render the user
	showMessage () {
		const { message } = this.props;

		return (
			<span>Message: {message}</span>
		);
	},
	render () {
		return (
			<canvas id="analyticsChart" height="400" className={css(classes.canvas)}/>
		);
	},
});

/* eslint quote-props: ["error", "as-needed"] */

const classes = {
	canvas: {
		width: '100%',
		height: '400px',
	},

};

module.exports = Graph;
