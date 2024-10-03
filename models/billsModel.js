import mongoose from "mongoose";

//for create table into database
const billsSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: Number,
      required: true,
    },
    customerAdress: {
      type: String,
      reguired: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    cartItems: {
      type: Array,
      required: true,
    },
  },
  {
    //for date
    timestaps: true,
  }
);

const Bills = mongoose.model("Bills", billsSchema);
export default Bills;
