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
    .replace('[Official Music Video]', '')
    .replace('(Official HD Video)', '')
    .replace('(Official 4k Video)', '')
    .replace('(Video Version)', '')
    .replace('[4k]', '')
    .replace('[Official Video]', '')
    .replace('(Video)', '')
    .replace('(HD)', '')
    .replace('[HQ]', '')
    .replace('[HD]', '')
    .replace('[OFFICIAL VIDEO]', '')
    .replace('(Official 4K Video)', '')
    .replace('(Official Lyric Video)', '');
};

const humanizeCategory = category => {
  switch (category) {
    default:
      return category;
    case 'rock':
      return 'Rock Classics';
    case '2000alt':
      return "2000's Alternative";
    case '7090hits':
      return "70-90's Hits";
    case '2000hits':
      return "2000's Hits";
  }
};

export { getRandomInt, prettyTitle, humanizeCategory };
