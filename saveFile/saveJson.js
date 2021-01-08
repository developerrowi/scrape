const fs = require('fs');
const processData = require('../scrape');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


const saveJson = async (location) => {
	const csvWriter = createCsvWriter({
	  path: 'bbbScraped.csv',
	  header: [
	    {id: 'name', title: 'Name'},
	    {id: 'address', title: 'Address'},
	    {id: 'contact', title: 'Contact'},
	    {id: 'rating', title: 'Rating'},
	    {id: 'accredited', title: 'Accredited'},
	  ]
	});

	console.log("Saving...");
	let results = await processData(location)
	let jsonString = JSON.stringify(results);
	await fs.writeFileSync('./bbbScraped.json', jsonString, 'utf-8');

	csvWriter
	  .writeRecords(results)
	  .then(()=> console.log('JSON and CSV file was written successfully'));
}

module.exports = saveJson;