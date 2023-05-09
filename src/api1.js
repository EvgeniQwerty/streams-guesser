// const getToken = async () => {
//   const result = await fetch('https://accounts.spotify.com/api/token', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       Authorization:
//         'Basic ' +
//         btoa(
//           '2028cfc5dba44da2a1ecf205bfdc6f83' +
//             ':' +
//             '8ddda59dd0cb4349a403ec28576f783c'
//         ),
//     },
//     body: 'grant_type=client_credentials',
//   });

//   const data = await result.json();

//   return data.access_token;
// };

// const getTracks = async (playlistId, token) => {
//   const result = await fetch(
//     `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
//     {
//       method: 'GET',
//       headers: { Authorization: 'Bearer ' + token },
//     }
//   );

//   let data = await result.json();

//   console.log(data.items);

//   return data.items;
// };

// const getPlaylistId = category => {
//   switch (category) {
//     case 'rock':
//       return '37i9dQZF1DWXRqgorJj26U';
//     case 'techno':
//       return '6nbV27JnCOdzr8wn2qOsiM';
//     case 'pop':
//       return '13Jd6NS2kvaoVorVFi7luv';
//     default:
//       return undefined;
//   }
// };

// const getStreams = async (artist = '', track = '') => {
//   const LASTFM_API_KEY = 'df1623f1a96992ddfa2c2615c87300b7';

//   if (artist && track) {
//     const result = await fetch(
//       `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${LASTFM_API_KEY}&artist=${artist}&track=${encodeURI(
//         track
//       )}&format=json`,
//       {
//         method: 'GET',
//       }
//     );

//     const data = await result.json();
//     console.log(data);
//     return data.playcount;
//   } else return undefined;
// };

// export { getToken, getTracks, getPlaylistId, getStreams };

import axios from 'axios';

const prettyTitle = title => {
  return title
    .replace('(Official Video)', '')
    .replace('(Official Audio)', '')
    .replace('(HQ)', '')
    .replace('(Live Video)', '');
};

const getDataFromYoutube = async (videoId1 = '', videoId2 = '') => {
  const YOUTUBE_API_KEY = 'AIzaSyBzFK0ujKk8vDbFL4Y7D93MARS7QqRnQFE';

  const result = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${videoId1}%2C${videoId2}&key=${YOUTUBE_API_KEY}`
  );

  if (result.status === '200')
    return result.data.items.map(element => {
      return {
        title: element.snippet.title,
        img: element.snippet.thumbnails.maxres.url,
        streams: +element.statistics.viewCount,
      };
    });

  console.log(result.status);
  return undefined;
};

const getPlaylistId = (style = '') => {
  switch (style) {
    case 'rock':
      return 'PLZN_exA7d4RVmCQrG5VlWIjMOkMFZVVOc';
    case 'techno':
      return 'PL8B49BE0477264C8F';
    case 'pop':
      return 'PL0muGYF7SDkWOQe3mInrLAxII6QONYtCH';
    default:
      return undefined;
  }
};

const getTracksFromPlaylist = async (playlistId = '') => {
  const YOUTUBE_API_KEY = 'AIzaSyBzFK0ujKk8vDbFL4Y7D93MARS7QqRnQFE';

  let finalData = [];

  let result = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`
  );

  if (result.status === 200) {
    result.data.items.forEach(element =>
      finalData.push(element.snippet.resourceId.videoId)
    );

    let nextPageToken = result.data.nextPageToken;
    console.log(nextPageToken);

    while (nextPageToken) {
      result = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}&pageToken=${nextPageToken}`
      );
      if (result.status === 200) {
        result.data.items.forEach(element =>
          finalData.push(element.snippet.resourceId.videoId)
        );
      }
      nextPageToken = result.data.nextPageToken;
    }
  }
  return finalData;
};

export { getDataFromYoutube, getTracksFromPlaylist, getPlaylistId };
