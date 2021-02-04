import React from 'react';
import Checkbox from '../../components/Checkbox';
import ItemsTableCell from '../../components/ItemsTableCell';
import ItemsTableValue from '../../components/ItemsTableValue';
import xhr from 'xhr';

var BooleanColumn = React.createClass({
	displayName: 'BooleanColumn',
	propTypes: {
		col: React.PropTypes.object,
		data: React.PropTypes.object,
	},
	getInitialState () {
		return {
			checked: this.props.data.fields[this.props.col.path],
		};
	},
	onChange (checked) {
		const { list, data, col } = this.props;
		const priorChecked = this.state.checked;
		this.setState({ checked });

		xhr({
			method: 'post',
			url: Keystone.adminPath
						+ '/toggle/'
						+	list.id
						+	'/'
						+ data.id
						+ '/'
						+ col.field.path
						+ '/'
						+ (
							checked === true
							? 'true'
							: 'false'
						),
			responseType: 'json',
		}, (err, resp, data) => {
			if (err) {
				alert('Failed to update');
				this.setState({
					checked: priorChecked,
				});
			}
		});
	},
	renderValue () {
		return (
			<ItemsTableValue truncate={false} field={this.props.col.type}>
				<Checkbox
					checked={this.state.checked}
					onChange={this.onChange}
				/>
			</ItemsTableValue>
		);
	},
	render () {
		return (
			<ItemsTableCell>
				{this.renderValue()}
			</ItemsTableCell>
		);
	},
});

module.exports = BooleanColumn;
