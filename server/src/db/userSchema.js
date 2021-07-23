import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    savings: {
        type: Number,
        default: 0
    },
    expenses: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    cashPrice: {
        type: Number,
        default: 0
    },
    totalExpenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "monthlyExpenses"
    }]
});

export default mongoose.model("users", userSchema);