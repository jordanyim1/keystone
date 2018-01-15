/**
 * Created by jordan on 15/01/2018.
 */
import moment from 'moment';
import _ from 'lodash';

/**
 * 
 * @param models
 * @returns {object} - graphData
 */
export function parseListModels (models) {
	console.log(models);
	
	// Convert to moments
	const createDates = models.map(model => (moment(model.fields.createdAt)));
	
	console.log(createDates);
	
	// Group values by day
	const graphData = _(createDates).groupBy(date => date.startOf('day').format())
		.map((items, date) => ({
			date: moment(date),
			count: items.length,
		}))
		.value()
		.sort((a, b) => a.date.isAfter(b.date) ? 1 : -1);
	
	graphData.forEach(x => {
		x.label = x.date.format('MMM D');
	});

	return {
		labels: graphData.map(x => x.label),
		data: graphData.map(x => x.count),
	};
}
