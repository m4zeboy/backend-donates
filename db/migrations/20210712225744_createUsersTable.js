
export function up (knex) {
  return knex.schema.createTable('members', (table) => {
      table.increments().primary()
      table.string('name')
      table.string('password')
      table.timestamps(true, true)
  })
};

export function down(knex) {
  return knex.dropTable('members')
};
