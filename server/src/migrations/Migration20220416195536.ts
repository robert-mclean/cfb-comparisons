import { Migration } from '@mikro-orm/migrations';

export class Migration20220416195536 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "team" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" text not null, "conference" text not null, "primary_color" text not null, "secondary_color" text not null);');

    this.addSql('create table "player" ("id" serial primary key, "team_id" int4 not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" text not null, "jersey" text not null, "position" text not null, "height" text not null, "weight" text not null, "year" text not null, "rating" double precision not null);');

    this.addSql('alter table "player" add constraint "player_team_id_foreign" foreign key ("team_id") references "team" ("id") on update cascade;');
  }

}
