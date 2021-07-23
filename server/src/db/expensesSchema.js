import mongoose from "mongoose";

const expensesSchema = new mongoose.Schema({
  title: String,
  expType: String,
  paidByCash: Boolean,
  amount: Number,
  Note: String,
  badChoice: Boolean,
  dateOfPurchase: {
    type: String,
    default: Date.now(),
  },
  month: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "monthlyExpenses",
  },
});

export default mongoose.model("expenses", expensesSchema);
