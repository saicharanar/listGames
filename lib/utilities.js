const generateTag = function (tag, content, className, id) {
  return '<' + tag + ' id="' + id + '" class="' + className + '">' + content + '</' + tag + '>';
};

const generateLink = function (tag, content, reference, target, relation) {
  return '<' + tag + ' rel="' + relation + '"' + ' href="' + reference + '" target="' + target + '">' + content + '</' + tag + '>';
};

const generateImg = function (source, width, height) {
  return '<img' + ' width="' + width + '" height="' + height + '" src="' + source + '">';
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

exports.generateLink = generateLink;
exports.generateImg = generateImg;
exports.generateTag = generateTag;
exports.unique = unique;