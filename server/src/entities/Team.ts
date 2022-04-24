import { Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field } from "type-graphql";
import { Player } from "./Player";

@ObjectType()
@Entity()
export class Team {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => [Player])
  @OneToMany(() => Player, (player) => player.team)
  players: Player[];

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({ type: "text" })
  name!: string;

  @Field()
  @Property({ type: "text" })
  conference!: string;

  @Field()
  @Property({ type: "text" })
  primaryColor!: string;

  @Field()
  @Property({ type: "text" })
  secondaryColor?: string;
}
