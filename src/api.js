import axios from 'axios';
import { getRandomInt, prettyTitle } from './helpers';

// async
const getDataFromYoutube = async (videoId = '') => {
  const result = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
  );

  if (result.status === 200)
    return result.data.items.map(element => {
      return {
        trackName: prettyTitle(element.snippet.title),
        trackImg: element.snippet.thumbnails.high.url,
        streams: +element.statistics.viewCount,
      };
    });

  console.log(result.status);
  return undefined;
};

const getTracksFromPlaylist = async (playlistId = '') => {
  let finalData = [];

  let result = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
  );

  if (result.error) {
    return undefined;
  }

  if (result.status === 200) {
    result.data.items.forEach(element => {
      finalData.push(element.snippet.resourceId.videoId);
    });

    let nextPageToken = result.data.nextPageToken;

    while (nextPageToken) {
      result = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&pageToken=${nextPageToken}`
      );
      if (result.status === 200) {
        result.data.items.forEach(element =>
          finalData.push(element.snippet.resourceId.videoId)
        );

        if (result.error) {
          break;
        }
      }
      nextPageToken = result.data.nextPageToken;
    }
  }
  console.log(finalData);
  return finalData;
};

const getRandomVideoFromPlaylist = async (videoIds = []) => {
  let finalData = {};
  let res = [];
  const id = videoIds[getRandomInt(videoIds.length)];
  console.log(id);
  res = await getDataFromYoutube(id);
  finalData = await res[0];

  console.log(finalData);

  return finalData;
};
// async

// sync
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

const getTracks = (style = '') => {
  if (style === '') {
    return undefined;
  } else {
    return [
      'pRpeEdMmmQ0',
      'lWA2pjMjpBs',
      'QK8mJJJvaes',
      'hHUbLv4ThOo',
      'DUT5rEU6pqM',
      'bESGLojNYSo',
      'MrTz5xjmso4',
      'JF8BRvqGCNs',
      'SDTZ7iX4vTQ',
      '4m1EFMoRFvY',
      'CvBfHwUxHIk',
      'SRcnnId15BA',
      'dvgZkm1xWPE',
      'iEe_eraFWWs',
      'rywUS-ohqeE',
      'oofSnsGkops',
      'ViwtNLUqkMY',
      'HBxt_v0WF6Y',
      'Bg59q4puhmg',
      'ZSM3w1v-A_Y',
      '8UFIYGkROII',
      'psuRGfAaju4',
      '6hzrDeceEKc',
      '2EwViQxSJJQ',
      'J91ti_MpdHA',
      'C-dvTjK_07c',
      'pBI3lc18k8Q',
      'kVpv8-5XWOI',
      'KUmZp8pR1uc',
      '5sMKX22BHeE',
      'DmeUuoxyt_E',
      'cjVQ36NhbMk',
      'koVHN6eO4Xg',
      '3gOHvDP_vCs',
      'Kgjkth6BRRY',
      'i3Jv9fNPjgk',
      'NRdHsuuXxfk',
      'O0lf_fE3HwA',
      'fe4EK4HSPkI',
      'EAc4zHEDd7o',
      '1r9ghI7YcL0',
      'edP0L6LQzZE',
      'HpyZEzrDf4c',
      'XaKr98ktoxU',
      'IXmF4GbA86E',
      'aS85AvLl9Ik',
      'iRYvuS9OxdA',
      'eiiU-Fky18s',
      '6VJBBUqr1wM',
      'y7ZEVA5dy-Y',
      'v1c2OfAzDTI',
      'SPlQpGeTbIE',
      'raB8z_tXq7A',
      'Kk8eJh4i8Lo',
      'qvuyYj5ROmk',
      's8cbak34DR0',
      'sEXHeTcxQy4',
      'EaEPCsQ4608',
      '4H5I6y1Qvz0',
      'tolm-07if3c',
      'nEIcTstEmnQ',
      'xXNSwkmoWqs',
      '4hArEhhlt7w',
      'X-1dn0g1uQk',
      'T-gqMpZroy8',
      'hamKl-su8PE',
      'N-8MagxjOrE',
      'gNq66goYa8A',
      'lDeB5sDealI',
      'DYMY7JpnK9g',
      '-oqXwnXjgDE',
      'MPipMQvKgKk',
      '6QbBOsHsgRM',
      'e2GecVOCxSM',
      'bIGv23PvfMo',
      '5XEXIGUhk1I',
      'vdDzlmcsHcg',
      'qWuSPPLtkEQ',
      '1deZbUOzTQQ',
      'vWCNHwOutWs',
      'veqoVP4zzEg',
      'ZCPUI1ShHx4',
      '-xTiGBwkU5I',
      'ill27xmNcMA',
      'oAN4o4iCmss',
      'cs7UnnQVglc',
      'BnHkGJZTQgU',
      'cUC_rzsiua8',
      '9BMnXXrvcyA',
      '4H3Z0wxS4gM',
      'BgyJY9yndv4',
    ];
  }
};
// sync

export {
  getDataFromYoutube,
  getTracksFromPlaylist,
  getPlaylistId,
  getRandomVideoFromPlaylist,
  getTracks,
};
