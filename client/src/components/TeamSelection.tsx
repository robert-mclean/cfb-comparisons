import React, { Dispatch, SetStateAction } from "react";
import { Formik } from "formik";
import { Accordion, Button, Container, Form, FormCheck } from "react-bootstrap";

import { Player, Team, usePlayersQuery } from "../generated/graphql";

interface TeamSelectionProps {
  setSelectedTeams: Dispatch<SetStateAction<any[]>>;
  teams: Team[];
}

export const TeamSelection: React.FC<TeamSelectionProps> = ({
  setSelectedTeams,
  teams,
}) => {
  if (!teams) {
    return <></>;
  }

  const teamsByConference = new Map<string, Team[]>();
  const defaultFormValues: { [key: string]: any } = new Object();
  teams.forEach((team) => {
    if (!teamsByConference.get(team.conference)) {
      teamsByConference.set(team.conference, new Array());
    }

    teamsByConference.get(team.conference)?.push(team);

    defaultFormValues[team.id.toString()] = false;
  });

  return (
    <Formik
      initialValues={defaultFormValues}
      onSubmit={(teamOptions) => {
        const seletedTeamIds = Object.keys(teamOptions).filter(
          (id) => teamOptions[id]
        );

        setSelectedTeams(
          teams.filter((team) => seletedTeamIds.includes(team.id.toString()))
        );
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <Form onSubmit={handleSubmit}>
          <Accordion key="1">
            {Array.from(teamsByConference.keys()).map((conference, index) => {
              return (
                <Accordion.Item key={index} eventKey={index.toString()}>
                  <Accordion.Header>{conference}</Accordion.Header>
                  <Accordion.Body>
                    {teamsByConference
                      .get(conference)
                      ?.map((teamInConference) => (
                        <Form.Check key={teamInConference.id}>
                          <Form.Check.Input
                            id={teamInConference.id.toString()}
                            onChange={(e) => {
                              handleChange(e);

                              e.target.style.backgroundColor =
                                e.target.style.backgroundColor === ""
                                  ? teamInConference.primaryColor
                                  : "";
                            }}
                            value={values[teamInConference.id.toString()]}
                          ></Form.Check.Input>
                          <Form.Check.Label>
                            {teamInConference.name}
                          </Form.Check.Label>
                        </Form.Check>
                      ))}
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
          <Container className="text-center mt-2 mb-2">
            <Button variant="primary" type="submit">
              Compare
            </Button>
          </Container>
        </Form>
      )}
    </Formik>
  );
};
