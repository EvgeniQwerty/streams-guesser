import {
  Button,
  Heading,
  SimpleGrid,
  Flex,
  Center,
  Textarea,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import * as api from '../api';
import { HomeCard } from '../components/HomeCard';
import { getLocalData } from '../localStorageHelpers';
import { humanizeCategory } from '../helpers';

const Home = () => {
  const leaderboard = getLocalData();
  let keys = undefined;
  if (leaderboard) {
    keys = Object.keys(leaderboard);
  }

  return (
    <Flex h="100vh" align="center" justify="center" p="2rem" direction="column">
      <Center pb="2rem" fontSize="6xl">
        <Heading>Streams Guesser v0.2</Heading>
      </Center>

      <SimpleGrid spacing="1rem" columns="4" mb="4rem">
        <HomeCard
          category={humanizeCategory('rock')}
          categoryForURL="rock"
          description="AC/DC to Black Sabbath"
        ></HomeCard>

        <HomeCard
          category={humanizeCategory('2000alt')}
          categoryForURL="2000alt"
          description="Nickelback to Coldplay"
        ></HomeCard>

        {/* <HomeCard
          category="Techno Classics"
          categoryForURL="techno"
          description="No comments"
        ></HomeCard> */}

        <HomeCard
          category={humanizeCategory('7090hits')}
          categoryForURL="7090hits"
          description="Bee Gees to Spice Girls"
        ></HomeCard>

        <HomeCard
          category={humanizeCategory('2000hits')}
          categoryForURL="2000hits"
          description="No comments"
        ></HomeCard>
      </SimpleGrid>

      <Box>
        <Heading mb="1rem">Leaderboard</Heading>
        <Table>
          <Thead>
            <Tr>
              <Th>Category</Th>
              <Th>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaderboard
              ? keys.map(key => (
                  <Tr>
                    <Td>{humanizeCategory(key)}</Td>{' '}
                    <Td isNumeric>{leaderboard[key]}</Td>
                  </Tr>
                ))
              : null}
          </Tbody>
        </Table>
      </Box>

      <Box mt="2rem" display="none">
        <Textarea id="playlist"></Textarea>

        <Textarea id="ids"></Textarea>

        <Button
          onClick={() => {
            const textarea = document.querySelector('#ids');
            const playlist = document.querySelector('#playlist');

            api.getTracksFromPlaylist(playlist.value).then(data =>
              data.forEach(elem => {
                textarea.value += "'" + elem + "', ";
              })
            );
          }}
        >
          Return Ids
        </Button>
      </Box>
    </Flex>
  );
};

export { Home };
