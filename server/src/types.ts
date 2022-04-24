import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";

export type Context = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
};
