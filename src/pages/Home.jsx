import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
  Flex,
  Center,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { GITHUB_REPO_NAME } from '../consts';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Flex
      bg="greenyellow"
      h="100vh"
      align="center"
      justify="center"
      p="2rem"
      direction="column"
    >
      <Center pb="2rem" fontSize="6xl">
        <Heading>Streams Guesser v0.1</Heading>
      </Center>

      <SimpleGrid spacing="2rem" minChildWidth="15rem">
        <Card>
          <CardHeader>
            <Heading size="md">Rock</Heading>
          </CardHeader>
          <CardBody>
            <Text>Best rock hits from 80 to our days</Text>
          </CardBody>
          <CardFooter>
            <Button onClick={() => navigate(`/${GITHUB_REPO_NAME}/rock`)}>
              Play
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md">Techno</Heading>
          </CardHeader>
          <CardBody>
            <Text>All the bangers from Jeff Mills to Robert Hood</Text>
          </CardBody>
          <CardFooter>
            <Button onClick={() => navigate(`/${GITHUB_REPO_NAME}/techno`)}>
              Play
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md">Pop</Heading>
          </CardHeader>
          <CardBody>
            <Text>No comments</Text>
          </CardBody>
          <CardFooter>
            <Button onClick={() => navigate(`/${GITHUB_REPO_NAME}/pop`)}>
              Play
            </Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </Flex>
  );
};

export { Home };
