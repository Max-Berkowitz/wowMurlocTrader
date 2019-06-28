import db from '../index';

db.knex.schema.hasTable('items').then(
  exists =>
    exists ||
    db.knex.schema
      .createTable('items', item => {
        item.increments('id').primary();
        item.string('name', 50);
        item.string('vendor', 10);
        item.integer('teir');
        item.specificType('costs', 'TEXT[]');
      })
      // eslint-disable-next-line
      .then(table => `Items Table Created: ${console.log(table)}`)
);

export default db.model('Item', db.Model.extend({ tableName: 'items' }));
