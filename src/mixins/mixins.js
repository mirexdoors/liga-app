export const translit = (name) => {

  const ru = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
    'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i',
    'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
    'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
  }, n_name = [];

  name = name.replace(/[ъь]+/g, '').replace(/й/g, 'i');
  name = name.replace(' ', '_').replace(/й/g, 'i');

  for (let i = 0; i < name.length; ++i) {
    n_name.push(
      ru[name[i]]
      || ru[name[i].toLowerCase()] == undefined && name[i]
      || ru[name[i].toLowerCase()].replace(/^(.)/, function (match) {
        return match
      })
    );
  }
  return  n_name.join('');
};

export const getColor = (player) => {
  if (player.status !== 'false') {
    if (player.division == 1) return "backgroundColor: #883838";
    else if (player.division == 2) return "backgroundColor: #b79a2f";
    else return "backgroundColor: rgb(121, 175, 115)";
  } else {
    return "opacity: 0.5; text-decoration: line-through";
  }
};

export const getPercentTotal = (player, teams) => {
  const points = player.points;
  const totalTeamPoints = teams[player.team].total;
  return ((points / totalTeamPoints) * 100).toFixed(2) + "%";
};

export const getTopData = (items, sortParam) => {
  const sortedItems = items.map(object => ({...object}));

  if (sortParam) {
    sortedItems.sort((a, b) => {
      if (parseFloat(a.sortParam) < parseFloat(b.sortParam)) {
        return 1;
      } else if (parseFloat(a[sortParam]) > parseFloat(b[sortParam])) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  return sortedItems.slice(0, 15);
};

export const convertPlayersDataToFlat = (teams) => {
  const resultArray = [];
  for (let team in teams) {
    teams[team].players.forEach((player) => {
      player.repeatGames = player.games - player.unique_games;
      player.efficiency = (player.games > 9 && !isNaN((player.points / player.games).toFixed(2))) ? (player.points / player.games).toFixed(2) : "0";
      resultArray.push(player);
    });
  }
  return resultArray;
};

export const getGamesInfo = (data, allGames, uniqGames) => {
  const ALL_POSSIBLE_MATCHES = 4356;
  const ALL_POSSIBLE_MATCHES_UNIQ = 1452;
  let totalMatches = 0;
  let uniqMatches = 0;
  for (let team in data) {
    totalMatches += data[team]['total_games'];
    uniqMatches += data[team]['total_unique_games'];
  }

  allGames.gamesPlayed.value = totalMatches / 2;
  allGames.gamesLeft.value = ALL_POSSIBLE_MATCHES - totalMatches / 2;
  allGames.percentOfMax.value = (((totalMatches / 2) / ALL_POSSIBLE_MATCHES) * 100).toFixed(2) + '%';
  uniqGames.gamesPlayed.value = uniqMatches / 2;
  uniqGames.gamesLeft.value = ALL_POSSIBLE_MATCHES_UNIQ - uniqMatches / 2;
  uniqGames.percentOfMax.value = (((uniqMatches / 2) / ALL_POSSIBLE_MATCHES_UNIQ) * 100).toFixed(2) + '%';

  return true;
};
export const getDaysPassed = () => {
  const d0 = new Date('September 01, 2019 00:00:00');
  const d1 = new Date();
  return Math.round((d1.getTime() - d0.getTime()) / (1000 * 60 * 60 * 24) + 1);
};
export const getDaysLeft = () => {
  const d0 = new Date('December 13, 2019');
  const d1 = new Date();
  return Math.round((d0.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
};