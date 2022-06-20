module.exports = class Contenedor {
  constructor(config, tableName) {
    this.knex = require("knex")(config);
    this.tableName = tableName;
  }

  async save(object) {
    try {
      await this.knex(`${this.tableName}`).insert(object);
    } catch (e) {
      console.error(e.message);
    }
  }

  async update(object, id) {
    try {
      await this.knex.update(object).from(`${this.tableName}`).where("id", id);
    } catch (e) {
      console.error(e.message);
    }
  }

  async getById(id) {
    try {
      return await this.knex
        .select("*")
        .from(`${this.tableName}`)
        .where("id", id);
    } catch (e) {
      console.error(e.message);
    }
  }

  async getAll() {
    try {
      const dataPackets = await this.knex.select("*").from(`${this.tableName}`);
      return dataPackets.map(dataPacket => ({...dataPacket}));
    } catch (e) {
      console.error(e.message);
      return [];
    }
  }

  async deleteById(id) {
    try {
      await this.knex.del().from(`${this.tableName}`).where("id", id);
    } catch (e) {
      console.error(e.message);
    }
  }

  async deleteAll() {
    try {
      await this.knex.del().from(`${this.tableName}`);
    } catch (e) {
      console.error(e.message);
    }
  }
};
