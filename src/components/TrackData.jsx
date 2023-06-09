import { Box, Flex, Text, Image, useMediaQuery } from '@chakra-ui/react';
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

  const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  const [isLargerThan550] = useMediaQuery('(min-width: 550px)');

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
      w={isLargerThan800 ? '50vw' : '100vw'}
      h={isLargerThan800 ? '100vh' : '50vh'}
      direction="column"
      align="center"
      justify={isLargerThan800 ? 'center' : 'flex-end'}
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
        w={isLargerThan800 ? '45vw' : isLargerThan550 ? '50vw' : '75vw'}
        boxShadow=".4rem .4rem .8rem 0rem rgba(34, 60, 80, 0.4)"
        aspectRatio="16/9"
        opacity={selected ? '0' : '100'}
        transition=".8s all"
      ></Image>

      <Box direction="column" textAlign="center">
        <Text fontSize={isLargerThan550 ? '4xl' : '2xl'} fontWeight="700">
          {artist}
        </Text>
        <Text fontSize={isLargerThan1000 ? '2xl' : 'xl'}>{track}</Text>
        <Text
          fontSize="4xl"
          color={moreStreams ? 'green.300' : 'red.300'}
          opacity={selected ? '100' : '0'}
          transition=".3s all"
        >
          {streams?.toLocaleString('ru')}
        </Text>

        <Text
          fontSize="4xl"
          color={moreStreams ? 'green.300' : 'red.300'}
          transition=".3s all"
        >
          {streams?.toLocaleString('ru')}
        </Text>

      </Box>
    </Flex>
  );
};

export { TrackData };
