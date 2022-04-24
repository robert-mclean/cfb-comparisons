import { Resolver, Query, Ctx, Arg, InputType, Field } from "type-graphql";
import { Team } from "../entities/Team";
import { Context } from "../types";

@InputType()
class TeamsArguments {
  @Field(() => [Number], { nullable: true })
  ids?: number[];
}

@Resolver()
export class TeamsResolver {
  @Query(() => [Team])
  async teams(
    @Arg("args", () => TeamsArguments, { nullable: true }) args: TeamsArguments,
    @Ctx() { em }: Context
  ): Promise<Team[]> {
    const filter = {} as any; // Can't get typing to work as FilterQuery<Team>

    if (args.ids && args.ids.length) {
      filter.id = { $in: args.ids };
    }

    return (await em.find(Team, filter)) as Team[];
  }
}
