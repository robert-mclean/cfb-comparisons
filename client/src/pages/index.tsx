import type { NextPage } from "next";
import { useState } from "react";
import {
  Alert,
  Col,
  Container,
  Nav,
  Navbar,
  Row,
  Spinner,
} from "react-bootstrap";
import { Github } from "react-bootstrap-icons";
import { PlayerTable } from "../components/PlayerTable";
import { TeamSelection } from "../components/TeamSelection";
import { Team, useTeamsQuery } from "../generated/graphql";

const Home: NextPage = () => {
  const {
    loading: teamsLoading,
    error: teamsError,
    data: teamsData,
  } = useTeamsQuery({
    variables: {
      args: {},
    },
  });

  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);

  if (teamsError) {
    console.log(teamsError);
  }

  const allTeams: Team[] = teamsData?.teams as Team[];

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>CFB Roster Comparisons</Navbar.Brand>
          <Nav>
            <Nav.Link
              href="https://github.com/robert-mclean/cfb-comparisons"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <Github />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {teamsError ? (
        <>
          <Alert className="m-5" variant="danger">
            Server error encountered. Please wait a few minutes and try again
          </Alert>
        </>
      ) : teamsLoading ? (
        <Col className="d-flex align-items-center justify-content-center">
          <Spinner className="m-5" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Col>
      ) : (
        <Container className="mt-3">
          <Row>
            <Col xs={12} lg={3}>
              <TeamSelection
                teams={allTeams}
                setSelectedTeams={setSelectedTeams}
              ></TeamSelection>
            </Col>
            <Col
              className="d-flex align-items-center justify-content-center"
              xs={12}
              lg={9}
            >
              <PlayerTable teams={selectedTeams}></PlayerTable>
            </Col>
          </Row>
        </Container>
      )}
      <Navbar className="mt-5 mp-5">
        <Container>
          <Nav>
            <Nav.Link
              href="https://github.com/robert-mclean"
              target="_blank"
              rel="noreferrer"
            >
              Site by Robert McLean.
            </Nav.Link>
            <Nav.Link
              href="https://icons8.com/icon/a8PyBWawy3IK/football"
              target="_blank"
              rel="noreferrer"
            >
              Icon from icons8.
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Home;
