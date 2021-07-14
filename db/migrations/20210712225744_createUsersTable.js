
export function up (knex) {
  return knex.schema.createTable('members', (table) => {
      table.increments().primary()
      table.string('name').unique()
      table.string('password')
      table.timestamps(true, true)
  })
};

export function down(knex) {
  return knex.schema.dropTableIfExists('members')
};
