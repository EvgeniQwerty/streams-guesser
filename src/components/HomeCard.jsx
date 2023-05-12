import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { GITHUB_REPO_NAME } from '../consts';

const HomeCard = props => {
  const { category, categoryForURL, description } = props;

  const navigate = useNavigate();

  return (
    <Card bg="gray.50">
      <CardHeader>
        <Heading size="md">{category}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{description}</Text>
      </CardBody>
      <CardFooter>
        <Button
          onClick={() => navigate(`/${GITHUB_REPO_NAME}/${categoryForURL}`)}
        >
          Play
        </Button>
      </CardFooter>
    </Card>
  );
};

export { HomeCard };
