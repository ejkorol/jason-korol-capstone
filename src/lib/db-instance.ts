import knex from 'knex';
import config from "@/lib/db";

const db = knex(config);

export default db;
