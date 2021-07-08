export function up(knex) {
    return knex.schema.createTable('donates', (table) => {
        table.increments().primary()
        table.text('family').notNullable()
        table.text('address').notNullable()
        table.text('responsible').notNullable()
        table.integer('quantity').notNullable()
        table.text('date').notNullable()
    })
  };
  
export function down(knex) {
  return knex.schema.dropTableIfExists('donates')
};
  