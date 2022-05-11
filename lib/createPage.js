const games = require('../data/gameData.json');
const {
  generateTag,
  generateImg,
  generateLink,
  getCategories,
} = require('./utilities.js');
const fs = require('fs');

const getGamesOfCategory = (games, category) =>
  games.filter((game) => game.genre.includes(category));

const generateArticle = (game) => {
  const img = generateImg(game.src, '280', '350');
  const figCaption = generateTag('figcaption', game.name, '', '');
  const figure = generateTag('figure', img + figCaption, 'coverart', '');

  return generateTag('article', figure, 'game', game.id);
};

const generateArticles = (games) => {
  const articles = games.map((game) => {
    return generateArticle(game);
  });

  return generateTag('main', articles.join(''), 'mainbody', '');
};

const generateSideBody = (categories) => {
  categories.unshift('All');
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

const generateMainBody = (games, category) => {
  const currentGames = getGamesOfCategory(games, category);
  const mainBody = generateArticles(currentGames);

  return mainBody;
};

const generatePage = (games, category) => {
  const head = generateHead();
  const sideBody = generateSideBody(getCategories(games));
  const mainBody = generateMainBody(games, category);
  const body = generateTag('body', sideBody + mainBody, '', '');

  return generateTag('html', head + body, '', '');
};

const generateAllCategoriesPage = (games) => {
  const head = generateHead();
  const sideBody = generateSideBody(getCategories(games));
  const mainBody = generateArticles(games);
  const body = generateTag('body', sideBody + mainBody, '', '');
  const page = generateTag('html', head + body, '', '');

  fs.writeFileSync('./pages/All.html', page, 'utf8');
};

const generateCategoryPages = (games, categories) => {
  categories.forEach((category) => {
    const fileName = './pages/' + category.replace(/\s/g, '') + '.html';
    fs.writeFileSync(fileName, generatePage(games, category), 'utf8');
  });
};

const main = (games) => {
  const categories = getCategories(games);
  generateAllCategoriesPage(games);
  generateCategoryPages(games, categories);
};

main(games);
