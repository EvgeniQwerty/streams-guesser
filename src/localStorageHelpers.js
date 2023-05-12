const LOCALSTORAGE_ITEM_NAME = 'StreamGuesser_leaderborad';

const getLocalData = () => {
  let leaderboard = localStorage.getItem(LOCALSTORAGE_ITEM_NAME);
  if (leaderboard) leaderboard = JSON.parse(leaderboard);

  return leaderboard;
};

const addScoreToLeaderboard = (category, score) => {
  let leaderboard = getLocalData();
  if (leaderboard) {
    let foundKey = false;
    for (let key in leaderboard) {
      if (key === category) {
        if (leaderboard[key] < score) {
          leaderboard[key] = score;
          foundKey = true;
          break;
        }
      }
    }

    if (!foundKey) {
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
