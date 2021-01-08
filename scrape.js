const cheerio = require("cheerio");
const axios = require("axios");


const processData = async (params) => {
  var bbbData = [];  
  var pageNumber = 1;
  if (params.location) {
    console.log("Location: " + params.location)
  }

  const $ = await fetchData(pageNumber, params);
  let numberOfResults = parseInt($("h2.SubTitle-sc-1i5hw45-0 strong").first().text());
  let count = Math.ceil(numberOfResults / 15);

  while(pageNumber <= count) {
    const $ = await fetchData(pageNumber, params);
    if ($) {
       $(".MuiPaper-root .Main-sc-1wy5u2x-0").each((index, element) => {
        var data = {}
        data.name = $(element).find('.Details-sc-1vh1927-0 h3 a').text();
        data.address = $(element).find('.Details-sc-1vh1927-0 p strong').text();
        data.contact = $(element).find('.Details-sc-1vh1927-0 p.MuiTypography-gutterBottom').text();
        data.rating = $(element).find('.Badge__Container-sc-17op6x2-1 .LetterGrade-sc-1exw0et-0 ').text();
        data.accredited = false;
        if ($(element).find('.Badge__Container-sc-17op6x2-1 .Badge-sc-17op6x2-0').length > 1) {
           data.accredited = true;
        }
        bbbData.push(data);
      });
      console.log("page left:" + (count - pageNumber) + "   total data scraped:" + bbbData.length);
    } else {
      pageNumber--;
    }
    pageNumber++;

  }
  console.log('Done Scraping..');
  console.log('Data Count:' + bbbData.length);
  return bbbData;
}



const fetchData = async (pageNumber, params) => {
  var siteUrl = '';
  if (params.location) {
    siteUrl = 
      `https://www.bbb.org/search` +
      `?find_country=USA` +
      `&find_entity=60793-000` +
      `&find_id=60793-000` +
      `&find_latlng=34.039577%2C-118.297852` + 
      `&find_loc=${params.location}` + 
      `&find_text=Septic%20Tank%20Cleaning` + 
      `&find_type=Category` +
      `&page=${pageNumber}` +
      `&sort=Relevance`;
    } else {
    siteUrl = 
      `https://www.bbb.org/search` +
      `?find_country=USA` +
      `&find_entity=60793-000` +
      `&find_id=60793-000` +
      `&find_text=Septic%20Tank%20Cleaning` + 
      `&find_type=Category` +
      `&page=${pageNumber}` +
      `&sort=Distance`;
    }
  try {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
  } catch (error) {
   return false;
  }
};



module.exports = processData;