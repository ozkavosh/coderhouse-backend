const { mysqlConfig, sqliteConfig } = require("./DB/dbconfigs.js");
const knexMysql = require("knex")(mysqlConfig);
const knexSqlite = require("knex")(sqliteConfig);

exports.createTables = async () => {
  let existe = await knexMysql.schema.hasTable("productos");

  existe ||
    (await knexMysql.schema.createTable("productos", (table) => {
      table.increments("id").primary();
      table.string("name", 35);
      table.string("thumbnail", 255);
      table.float("price");
    }));

  await knexMysql.destroy();

  existe = await knexSqlite.schema.hasTable("mensajes");

  existe ||
    (await knexSqlite.schema.createTable("mensajes", (table) => {
      table.increments("id").primary();
      table.string("message", 255);
      table.string("email", 60);
      table.string("userId", 60);
      table.date("date");
    }));

  await knexSqlite.destroy();
};
