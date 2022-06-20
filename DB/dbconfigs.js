exports.mysqlConfig = {
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "ecommerce",
  },
};

exports.sqliteConfig = {
    client: "sqlite",
    connection: {
        filename: './DB/sqlite/ecommerce.sqlite'
    },
    useNullAsDefault: true,
};
