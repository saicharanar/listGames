const games = require('../data/gameData.json');
const { generateTag, generateImg, unique, generateLink } = require('./utilities.js');
const fs = require('fs');

const generateArticle = (game) => {
  const img = generateImg(game.src, '280', '350');
  const figCaption = generateTag('figcaption', game.name, '', '');
  const figure = generateTag('figure', img + figCaption, 'coverart', '');

  return generateTag('article', figure, 'game', game.id);
};

const generateCategoryPage = (games) => {
  const articles = games.map((game) => {
    return generateArticle(game);
  });

  return generateTag('main', articles.join(''), 'mainbody', '');
};

const getCategories = (games) => games.map((game) => game.genre).flat();

const getGamesOfCategory = (games, category) => games.filter((game) => game.genre.includes(category));

// const getGamesOfCategory = (games, category) => {
//   return games.filter((game) => {
//     category = /category/;
//     category.test(game.genre);
//   });
// };

const generateSideBody = (categories) => {
  const listItems = categories.map((category) => {
    const fileName = './' + category.replace(/\s/g, '') + '.html';
    return generateTag(
      'li',
      generateLink('a', category, fileName, '', ''),
      '',
      ''
    );
  });
  const list = generateTag('ul', listItems.join(''), '', '');
  return generateTag('div', list, 'sidebody', '');
};

const generateHead = () => {
  const link = generateLink('link', '', '../style.css', '', 'stylesheet');
  return generateTag('head', link, '', '');
};

const generatePage = (games, category) => {
  const currentGames = getGamesOfCategory(games, category);
  const categories = unique(getCategories(games));
  const sideBody = generateSideBody(categories);
  const mainBody = generateCategoryPage(currentGames);
  const head = generateHead();
  const body = generateTag('body', sideBody + mainBody, '', '');

  return generateTag('html', head + body, '', '');
};

const main = (games) => {
  const categories = unique(getCategories(games));
  categories.forEach((category) => {
    const fileName = './pages/' + category.replace(/\s/g, '') + '.html';
    fs.writeFileSync(fileName, generatePage(games, category, fileName), 'utf8');
  });
};

main(games);