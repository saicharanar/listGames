const games = require('../data/gameData.json');
const fs = require('fs');

const generateTag = function (tag, content, className) {
  return '<' + tag + ' class="' + className + '">' + content + '</' + tag + '>';
};

const getCategories = function (games) {
  return games.map((game) => game.genre).flat();
};

const unique = (list) => {
  const set = [];
  list.forEach((item) => {
    if (!set.includes(item)) {
      set.push(item);
    }
  })

  return set;
};

const generatePage = (games, category) => {
  const currentGames = games.filter((game) => {
    return game.genre.includes(category);
  });

  return currentGames.map((game) => {
    return generateTag('div', game.name, '');
  }).join('');
};

const main = function (games) {
  const categories = unique(getCategories(games));
  categories.forEach((category) => {
    const fileName = './pages/' + category.replace(/\s/g, '');

    fs.writeFileSync(fileName + '.html', generatePage(games, category), 'utf8');
  });

  // fs.writeFileSync('./index.html', generateTag('html', page.join(''), ''), 'utf8');
};

main(games);