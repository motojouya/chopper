const request = require('request');
// const {
//   JSDOM
// } = require('jsdom');
const cheerio = require('cheerio');

const scraper = ($) => {

  const informationNameMap = {
    '調理時間': 'time',
    '冷蔵保存': 'keepable',
    '人数': 'amount',
  };

  const title = $('h1.entry-title').text();

  const infoText = $('div.entry-content > p').eq(2).text();

  const info = infoText.split('　').filter(text => text).reduce((acc, text) => {
    const [name, value] = text.split('：');
    acc[informationNameMap[name]] = value;
    return acc;
  }, {});

  const ingredients = [];
  $('h3.ingredients + ul > li')
    .map((i, ingredient) => {
      return $(ingredient).text();
    })
    .map((i, ingredient) => {
      const [item, amount] = ingredient.split('　');
      return { item, amount };
    })
    .each((i, ingredient) => {
      ingredients.push(ingredient);
    });

  const processes = [];
  $('h3.process + ol > li')
    .map((i, process) => $(process).text().split('<img')[0])
    .each((i, process) => {
      processes.push(process);
    });

  const point = $('h3.point + p').text();

  return {
    title,
    info,
    ingredients,
    processes,
    point,
  };
};


exports.handler = async (event, context, callback) => {

  const articleId = event.queryStringParameters.article;
  const url = 'https://mariegohan.com/' + articleId;
  //TODO articleIdは数値以外はoutなので、そのバリデーション

  request(url, (e, response, body) => {
    if (e) {
      console.error(e)
    }

    try {
      const $ = cheerio.load(body);
      const result = scraper($);
      result.url = url;
      console.log(result);
      return callback(null, {
        statusCode: 200,
        // headers: {'content-type': 'application/json'},
        // body: JSON.stringify(result),
        body: JSON.stringify({a: 'test'}),
      });
    } catch (err) {
      return callback(err);
    }
  });
}
