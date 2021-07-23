import mongoose from "mongoose";

const monthlyExpSchema = new mongoose.Schema({
  totalAmount: Number,
  amountSpent: {
    type: Number,
    default: 0,
  },
  amountSaved: {
    type: Number,
    default: 0,
  },
  currentAmount: Number,
  gotMoneyOn: {
    type: String,
  },
  currentMonth: {
    type: String,
    unique: true,
  },
  allExpenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "expenses",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

export default mongoose.model("monthlyExpenses", monthlyExpSchema);
