const getRandomInt = max => {
  return Math.floor(Math.random() * max);
};

const prettyTitle = title => {
  return title
    .replace('(Official Video)', '')
    .replace('(Official Audio)', '')
    .replace('(HQ)', '')
    .replace('(Live Video)', '')
    .replace('(Official Music Video)', '')
    .replace('(Official HD Video)', '')
    .replace('(Official 4k Video)', '')
    .replace('(Video Version)', '')
    .replace('[4k]', '');
};

export { getRandomInt, prettyTitle };
