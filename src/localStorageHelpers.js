const LOCALSTORAGE_ITEM_NAME = 'StreamGuesser_leaderborad';

const getLocalData = () => {
  let leaderboard = localStorage.getItem(LOCALSTORAGE_ITEM_NAME);
  if (leaderboard) leaderboard = JSON.parse(leaderboard);

  return leaderboard;
};

const addScoreToLeaderboard = (category = '', score = 0) => {
  let leaderboard = getLocalData();
  if (leaderboard) {
    let foundKey = false;
    for (let key in leaderboard) {
      console.log(key, category);

      if (key === category) {
        foundKey = true;
        if (leaderboard[key] < score) {
          console.log(leaderboard[key], score);

          leaderboard[key] = score;
          break;
        }
      }
    }

    if (!foundKey) {
      console.log(category, leaderboard[category], score);

      leaderboard[category] = score;
    }

    localStorage.setItem(LOCALSTORAGE_ITEM_NAME, JSON.stringify(leaderboard));
  } else {
    let leaderboard = {};
    leaderboard[category] = score;
    localStorage.setItem(LOCALSTORAGE_ITEM_NAME, JSON.stringify(leaderboard));
  }
};

export { getLocalData, addScoreToLeaderboard };
