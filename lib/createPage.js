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

const htmlFileName = (category) => './' + category.replace(/\s/g, '') + '.html';

const generateSideBody = (categories) => {
  const allCategories = ['All', ...categories];

  const listItems = allCategories.map((category) => {
    const fileName = htmlFileName(category);
    return generateTag('li', generateLink('a', category, fileName));
  });

  const list = generateTag('ul', listItems.join(''));
  return generateTag('div', list, 'sidebody');
};

const generateHead = () => {
  const link = generateLink('link', '', '../style.css', '', 'stylesheet');
  return generateTag('head', link, '', '');
};

const generateMainBody = (games) => {
  const articles = generateArticles(games);
  return generateTag('main', articles, 'mainbody', '');
};

const generatePage = (games, categories) => {
  const head = generateHead();
  const sideBody = generateSideBody(categories);
  const mainBody = generateMainBody(games);
  const body = generateTag('body', sideBody + mainBody, '', '');

  return generateTag('html', head + body, '', '');
};

const writeToFile = (fileName, data) => {
  try {
    fs.writeFileSync(fileName, data, 'utf-8');
  } catch (error) {
    throw 'error writing to' + fileName;
  }
};

const generateAllCategoriesPage = (games, categories) => {
  writeToFile('./pages/All.html', generatePage(games, categories));
};

const generateCategoryPages = (games, categories) => {
  categories.forEach((category) => {
    const fileName = './pages/' + category.replace(/\s/g, '') + '.html';
    const currentGames = getGamesOfCategory(games, category);
    writeToFile(fileName, generatePage(currentGames, categories));
  });
};

const main = (games) => {
  generateAllCategoriesPage(games, getCategories(games));
  generateCategoryPages(games, getCategories(games));
};

main(games);
