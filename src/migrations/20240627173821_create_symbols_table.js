/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) => {
  return knex.schema.createTable("symbols", (table) => {
    table.increments("id").primary();
    table.integer("user_id")
      .unsigned()
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("symbol_name", 1000).notNullable();
    table.string("symbol_analysis", 1000).notNullable();
    table.string("symbol_image", 1000).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
  return knex.schema.dropTable("symbols");
};
