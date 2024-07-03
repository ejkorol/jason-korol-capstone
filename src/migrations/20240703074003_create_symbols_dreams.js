/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) => {
  return knex.schema.createTable("symbols_dreams", (table) => {
    table.increments("id").primary();
    table.integer("symbol_id")
      .unsigned()
      .references("symbols.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.integer("dream_id")
      .unsigned()
      .references("dreams.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
  return knex.schema.dropTable("symbols_dreams");
};
