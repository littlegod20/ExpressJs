import mongoose from "mongoose";

export class Database {
  private readonly localhost = "127.0.0.1";
  private readonly server = `${this.localhost}:27017`;
  private readonly database = "MyDatabase";
  constructor() {
    this._connect();
  }
  _connect(): Promise<void> {
    return mongoose
      .connect(`mongodb://${this.server}/${this.database}`)
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error(`Database connection failed ${err}`);
        throw err;
      });
  }
}
