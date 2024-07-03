/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) => {
  return knex.schema.createTable("tags_dreams", (table) => {
    table.increments("id").primary();
    table.integer("tag_id")
      .unsigned()
      .references("tags.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.integer("dream_id")
      .unsigned()
      .references("dreams.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
  return knex.schema.dropTable("tags_dreams");
};
