import { Box, Flex, Text, Image } from '@chakra-ui/react';
import { TIMEOUT } from '../consts';

const TrackData = props => {
  const {
    trackName,
    trackImg,
    streams,
    moreStreams,
    score,
    setScore,
    setGameOver,
    selected,
    setSelected,
  } = props;

  let [artist, track] = trackName
    ? trackName.split('-')
    : [undefined, undefined];

  if (trackName) {
    if (!trackName.includes('-')) {
      [artist, track] = trackName.split(':');
    } else {
    }
  }

  return (
    <Flex
      w="50vw"
      h="100vh"
      direction="column"
      align="center"
      justify="center"
      _hover={{ bg: 'rgba(128, 128, 128, 0.2)' }}
      transition=".3s all"
      onClick={() => {
        if (!selected)
          if (moreStreams) setScore(score + 1);
          else {
            setTimeout(() => {
              setGameOver(true);
            }, TIMEOUT);
          }
        setSelected(true);
      }}
    >
      <Image
        src={trackImg}
        alt={trackName}
        objectFit="cover"
        w="45vw"
        boxShadow=".4rem .4rem .8rem 0rem rgba(34, 60, 80, 0.4)"
        aspectRatio="16/9"
      ></Image>

      <Box direction="column" textAlign="center">
        <Text fontSize="4xl" fontWeight="700">
          {artist}
        </Text>
        <Text fontSize="2xl">{track}</Text>
        {/* <Text fontSize="3xl">{streams}</Text> */}
        {selected ? (
          <Text fontSize="4xl" color={moreStreams ? 'green.300' : 'red.300'}>
            {streams.toLocaleString('ru')}
          </Text>
        ) : null}
      </Box>
    </Flex>
  );
};

export { TrackData };
