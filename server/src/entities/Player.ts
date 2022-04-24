import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field } from "type-graphql";
import { Team } from "./Team";

@ObjectType()
@Entity()
export class Player {
  @Field()
  @PrimaryKey()
  id: number;

  @Field(() => Team)
  @ManyToOne(() => Team)
  team: Team;

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
  jersey: string;

  @Field()
  @Property({ type: "text" })
  position: string;

  @Field()
  @Property({ type: "text" })
  height: string;

  @Field()
  @Property({ type: "text" })
  weight: string;

  @Field()
  @Property({ type: "text" })
  year: string;

  @Field()
  @Property({ type: "number", columnType: "double precision" })
  rating: number;
}
