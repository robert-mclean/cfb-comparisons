import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateTeamsInput = {
  conference: Scalars['String'];
  name: Scalars['String'];
  primaryColor: Scalars['String'];
  secondaryColor: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTeams: Array<Team>;
};


export type MutationCreateTeamsArgs = {
  teams: Array<CreateTeamsInput>;
};

export type Player = {
  __typename?: 'Player';
  createdAt: Scalars['String'];
  height: Scalars['String'];
  id: Scalars['Float'];
  jersey: Scalars['String'];
  name: Scalars['String'];
  position: Scalars['String'];
  rating: Scalars['Float'];
  team: Team;
  updatedAt: Scalars['String'];
  weight: Scalars['String'];
  year: Scalars['String'];
};

export type PlayersArguments = {
  teamIds?: InputMaybe<Array<Scalars['Float']>>;
};

export type Query = {
  __typename?: 'Query';
  players?: Maybe<Array<Player>>;
  teams: Array<Team>;
};


export type QueryPlayersArgs = {
  args: PlayersArguments;
};


export type QueryTeamsArgs = {
  args?: InputMaybe<TeamsArguments>;
};

export type Team = {
  __typename?: 'Team';
  conference: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  players: Array<Player>;
  primaryColor: Scalars['String'];
  secondaryColor: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type TeamsArguments = {
  ids?: InputMaybe<Array<Scalars['Float']>>;
};

export type PlayersQueryVariables = Exact<{
  args: PlayersArguments;
}>;


export type PlayersQuery = { __typename?: 'Query', players?: Array<{ __typename?: 'Player', id: number, name: string, jersey: string, position: string, height: string, weight: string, year: string, rating: number, team: { __typename?: 'Team', id: number, name: string, conference: string, primaryColor: string, secondaryColor: string } }> | null };

export type TeamsQueryVariables = Exact<{
  args?: InputMaybe<TeamsArguments>;
}>;


export type TeamsQuery = { __typename?: 'Query', teams: Array<{ __typename?: 'Team', id: number, name: string, conference: string, primaryColor: string, secondaryColor: string }> };


export const PlayersDocument = gql`
    query Players($args: PlayersArguments!) {
  players(args: $args) {
    id
    name
    jersey
    position
    height
    weight
    year
    rating
    team {
      id
      name
      conference
      primaryColor
      secondaryColor
    }
  }
}
    `;

/**
 * __usePlayersQuery__
 *
 * To run a query within a React component, call `usePlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayersQuery({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function usePlayersQuery(baseOptions: Apollo.QueryHookOptions<PlayersQuery, PlayersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlayersQuery, PlayersQueryVariables>(PlayersDocument, options);
      }
export function usePlayersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlayersQuery, PlayersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlayersQuery, PlayersQueryVariables>(PlayersDocument, options);
        }
export type PlayersQueryHookResult = ReturnType<typeof usePlayersQuery>;
export type PlayersLazyQueryHookResult = ReturnType<typeof usePlayersLazyQuery>;
export type PlayersQueryResult = Apollo.QueryResult<PlayersQuery, PlayersQueryVariables>;
export const TeamsDocument = gql`
    query Teams($args: TeamsArguments) {
  teams(args: $args) {
    id
    name
    conference
    primaryColor
    secondaryColor
  }
}
    `;

/**
 * __useTeamsQuery__
 *
 * To run a query within a React component, call `useTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamsQuery({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useTeamsQuery(baseOptions?: Apollo.QueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
      }
export function useTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
        }
export type TeamsQueryHookResult = ReturnType<typeof useTeamsQuery>;
export type TeamsLazyQueryHookResult = ReturnType<typeof useTeamsLazyQuery>;
export type TeamsQueryResult = Apollo.QueryResult<TeamsQuery, TeamsQueryVariables>;