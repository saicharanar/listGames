// const stringify = (attributes) => ;

// const openTag = (tagName, attributes) => '<' + tagName + stringify(attributes) + '>';

// const closeTag = (tagName) => '</' + tagName + '>';


const generateTag = (tag, content, className, id) => '<' + tag + ' id="' + id + '" class="' + className + '">' + content + '</' + tag + '>';

const generateLink = (tag, content, reference, target, relation) => '<' + tag + ' rel="' + relation + '"' + ' href="' + reference + '" target="' + target + '">' + content + '</' + tag + '>';

const generateImg = (source, width, height) => '<img' + ' width="' + width + '" height="' + height + '" src="' + source + '">';

const unique = (list) => {
  const set = [];
  list.forEach((item) => {
    if (!set.includes(item)) {
      set.push(item);
    }
  });

  return set;
};

const getCategories = (games) => unique(games.map((game) => game.genre).flat());

exports.getCategories = getCategories;
exports.generateLink = generateLink;
exports.generateImg = generateImg;
exports.generateTag = generateTag;
exports.unique = unique;
