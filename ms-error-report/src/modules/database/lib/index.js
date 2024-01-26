const { ConfigEnv } = require("../../../config");

const mongoose = require("mongoose");

class MongoDB {
  static #connection;

  static schemaOptions = {
    timestamps: true,
    toJSON: { virtuals: true },
    minimize: false,
  };

  static getConnection() {
    try {
      if (this.#connection) return this.#connection;
      this.#connection = mongoose.createConnection(ConfigEnv.db.uri, {
        dbName: ConfigEnv.db.name,
        user: ConfigEnv.db.user,
        pass: ConfigEnv.db.password,
      });
      return this.#connection;
    } catch (error) {
      console.error("MongoDB.getConnection", error);
      throw error;
    }
  }

  static onConnectionStatus(connection) {
    connection.on("connected", () => {
      console.log(`MongoDB connected to database: ${ConfigEnv.db.name}`);
    });

    connection.on("reconnected", () => {
      console.log("MongoDB reconnected");
    });

    connection.on("disconnected", () => {
      console.error("MongoDB disconnected");
    });

    connection.on("error", (error) => {
      console.error("MongoDB connection error", error);
    });
  }
}

module.exports = {
  MongoDB,
};
