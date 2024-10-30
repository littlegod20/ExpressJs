import mongoose, { Schema, Document } from "mongoose";

export interface ITicket extends Document {
  passenger: string;
  flight: string;
}

// ticket Schema
const ticketSchema: Schema = new Schema({
  passenger: {
    type: String,
    required: true,
  },
  flight: {
    type: String,
    required: true,
  },
});

ticketSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const Ticket = mongoose.model<ITicket>("Ticket", ticketSchema);
