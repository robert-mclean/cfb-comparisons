import React from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { Player, Team, usePlayersQuery } from "../generated/graphql";

interface PlayerTableProps {
  teams: Team[];
}

export const PlayerTable: React.FC<PlayerTableProps> = ({ teams }) => {
  const teamIds = teams.map((team) => team.id);
  const {
    loading: playersLoading,
    error: playersError,
    data: playersData,
  } = usePlayersQuery({ variables: { args: { teamIds } } });

  console.log({ playersLoading, playersError, playersData });

  if (playersLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  const players = playersData?.players as Player[];

  return players && players.length > 0 ? (
    <Table bordered responsive striped size="sm">
      <thead>
        <tr>
          <th style={{ width: "10px" }}></th>
          <th>Name</th>
          <th>Jer.</th>
          <th>Pos.</th>
          <th className="d-none d-md-table-cell">Height</th>
          <th className="d-none d-md-table-cell">Weight</th>
          <th>Team</th>
          <th>Yr</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, index) => {
          return (
            <tr key={index}>
              <td
                style={{
                  // background: `linear-gradient(to right, ${player.team.primaryColor} 50%,  ${player.team.secondaryColor} 50%)`,
                  backgroundColor: player.team.primaryColor,
                }}
              ></td>
              <td>{player.name}</td>
              <td>{player.jersey}</td>
              <td>{player.position}</td>
              <td className="d-none d-md-table-cell">{player.height}</td>
              <td className="d-none d-md-table-cell">{player.weight}</td>
              <td>{player.team.name}</td>
              <td>{player.year}</td>
              <td>{player.rating != 0 ? player.rating : "N/A"}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  ) : (
    <Container className="mt-5 mb-5">
      <h3 className="text-center">Select teams to compare</h3>
    </Container>
  );
};
