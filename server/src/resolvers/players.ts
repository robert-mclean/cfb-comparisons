import { Resolver, Query, Ctx, Arg, InputType, Field } from "type-graphql";
import { Player } from "../entities/Player";
import { Context } from "../types";

@InputType()
class PlayersArguments {
  @Field(() => [Number], { nullable: true })
  teamIds?: number[];
}

@Resolver()
export class PlayersResolver {
  @Query(() => [Player], { nullable: true })
  async players(
    @Arg("args", () => PlayersArguments) args: PlayersArguments,
    @Ctx() { em }: Context
  ): Promise<Player[]> {
    const filter = {} as any; // Can't get typing to work as FilterQuery<Team>

    if (args.teamIds) {
      filter.team = { $in: args.teamIds };
    }

    const players = await (
      await em.find<Player>(Player, filter, ["team"])
    ).sort((a, b) => {
      if (a.rating != b.rating) {
        return b.rating - a.rating;
      } else {
        return a.name < b.name ? -1 : 1;
      }
    });

    return players;
  }
}
