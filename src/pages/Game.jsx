import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Button,
  Box,
  Flex,
  Text,
  Heading,
  useMediaQuery,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TrackData } from '../components';

import * as api from '../api';
import { TIMEOUT } from '../consts';
import { addScoreToLeaderboard } from '../localStorageHelpers';

const initTrack1and2 = (tracks, setSelected, setTrack1, setTrack2) => {
  setSelected(false);

  if (tracks.length > 0) {
    api.getRandomVideoFromPlaylist(tracks).then(data => {
      setTrack1(data);
    });

    api.getRandomVideoFromPlaylist(tracks).then(data => {
      setTrack2(data);
    });
  }
};

const Game = () => {
  const [tracks, setTracks] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [track1, setTrack1] = useState(undefined);
  const [track2, setTrack2] = useState(undefined);
  const [selected, setSelected] = useState(false);

  const { name } = useParams();
  const navigate = useNavigate();

  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

  useEffect(() => {
    setGameOver(false);
    setScore(0);
    setSelected(false);

    setTracks(api.getTracks(name));
  }, [name]);

  useEffect(() => {
    if (tracks.length === 0) {
      setTracks(api.getTracks(name));
    }

    if (score === 0) {
      initTrack1and2(tracks, setSelected, setTrack1, setTrack2);
    } else
      setTimeout(() => {
        initTrack1and2(tracks, setSelected, setTrack1, setTrack2);
      }, TIMEOUT);
  }, [tracks, score, name]);

  useEffect(() => {
    if (gameOver) {
      if (score > 0) addScoreToLeaderboard(name, score);
    }
  }, [gameOver, name, score]);

  return (
    <Box>
      <Button
        pos="absolute"
        top="1rem"
        left="1rem"
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon /> Back
      </Button>

      <Text
        textAlign="center"
        pos="absolute"
        top="1rem"
        right="2rem"
        ml="-2rem"
        fontSize="2xl"
      >
        Score: <b> {score} </b>
      </Text>

      {!gameOver ? (
        <Flex
          align="center"
          justify="center"
          h="100vh"
          direction={isLargerThan800 ? 'row' : 'column'}
        >
          <TrackData
            trackName={track1?.trackName}
            trackImg={track1?.trackImg}
            streams={track1?.streams}
            moreStreams={track1?.streams > track2?.streams}
            score={score}
            setScore={setScore}
            setGameOver={setGameOver}
            selected={selected}
            setSelected={setSelected}
          />
          <TrackData
            trackName={track2?.trackName}
            trackImg={track2?.trackImg}
            streams={track2?.streams}
            moreStreams={track2?.streams > track1?.streams}
            score={score}
            setScore={setScore}
            setGameOver={setGameOver}
            selected={selected}
            setSelected={setSelected}
          />
        </Flex>
      ) : (
        <Flex
          align="center"
          justify="center"
          h="100vh"
          direction="column"
          opacity={gameOver ? '100' : '0'}
          transition=".5s all"
        >
          <Heading size="4xl" mb="1rem">
            Game over!
          </Heading>
          <Button
            onClick={() => {
              setGameOver(false);
              setScore(0);
              setSelected(false);
              initTrack1and2(tracks, setSelected, setTrack1, setTrack2);
            }}
          >
            Retry
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export { Game };
