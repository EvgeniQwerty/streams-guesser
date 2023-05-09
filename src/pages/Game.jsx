import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button, Box, Flex, Text, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TrackData } from '../components';

import * as api from '../api';
import { TIMEOUT } from '../consts';

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

  useEffect(() => {
    setGameOver(false);
    setScore(0);
    setSelected(false);

    // api
    //   .getTracksFromPlaylist(api.getPlaylistId(name))
    //   .then(data => setTracks(data));

    setTracks(api.getTracks('rock'));
  }, [name]);

  useEffect(() => {
    if (tracks.length === 0) {
      setTracks(api.getTracks('rock'));
    }

    if (score === 0) {
      initTrack1and2(tracks, setSelected, setTrack1, setTrack2);
    } else
      setTimeout(() => {
        initTrack1and2(tracks, setSelected, setTrack1, setTrack2);
      }, TIMEOUT);
  }, [tracks, score]);

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
        left="50%"
        ml="-1.5rem"
      >
        Score: {score}
      </Text>

      {!gameOver ? (
        <Flex align="center" justify="center" h="100vh">
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
        <Flex align="center" justify="center" h="100vh" direction="column">
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
