import type { NextPage } from "next";
import { useState } from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
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

  const allTeams: Team[] = teamsData?.teams as Team[];

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>CFB Roster Comparisons</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link>About</Nav.Link>
              <Nav.Link>Contact</Nav.Link>
              <Nav.Link>Github</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-3">
        {JSON.stringify(teamsError)}
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
    </>
  );
};

export default Home;
