const games = require('../data/gameData.json');
const {
  generateTag,
  generateImg,
  generateLink,
  getCategories,
} = require('./utilities.js');
const fs = require('fs');

const getGamesOfCategory = (games, category) => {
  return games.filter((game) => game.genre.includes(category));
};

const generateArticle = (game) => {
  const img = generateImg(game.src, '280', '350');
  const figCaption = generateTag('figcaption', game.name, '', '');
  const figure = generateTag('figure', img + figCaption, 'coverart', '');

  return generateTag('article', figure, 'game', game.id);
};

const generateArticles = (games) => {
  return games.map((game) => {
    return generateArticle(game);
  }).join('');

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

const generateMainBody = (games) => {
  const articles = generateArticles(games);
  return generateTag('main', articles, 'mainbody', '');
};

const generatePage = (games, [...categories]) => {
  const head = generateHead();
  const sideBody = generateSideBody(categories);
  const mainBody = generateMainBody(games);
  const body = generateTag('body', sideBody + mainBody, '', '');

  return generateTag('html', head + body, '', '');
};

const generateAllCategoriesPage = (games, categories) => {
  try {
    // eslint-disable-next-line max-len
    fs.writeFileSync('./pages/All.html', generatePage(games, categories), 'utf8');
  } catch (error) {
    throw 'Creating All file failed';
  }
};

const generateCategoryPages = (games, categories) => {
  categories.forEach((category) => {
    const fileName = './pages/' + category.replace(/\s/g, '') + '.html';
    const currentGames = getGamesOfCategory(games, category);
    try {
      // eslint-disable-next-line max-len
      fs.writeFileSync(fileName, generatePage(currentGames, categories), 'utf8');
    } catch (error) {
      throw 'Error creating category files';
    }
  });
};

const main = (games) => {
  generateAllCategoriesPage(games, getCategories(games));
  generateCategoryPages(games, getCategories(games));
};

main(games);
