import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const ObjectID = mongoose.Schema.Types.ObjectId


const TransactionSchema = new mongoose.Schema({
  sender: {
    type: ObjectID,
    required: [true, "The sender is required"],
    minlength: 3,
    maxlength: 20,
    trim: true,
    ref: 'User'
  },
  receiver: {
    type: ObjectID,
    required: [true, "The receiver is required"],
    minlength: 3,
    maxlength: 20,
    trim: true,
    ref: 'User'
  },
  amount: {
    type: Number,
    required: [true, "Transaction amount needed"],
    validate: {
      validator: (num)=> num>=0,
      message: "Please provide a valid amount. Amount cannot be negative.",
    },
    
  },
  trans:{
    type: String,
    enum: ['deposit', 'withdrawal'],
    required: [ true, 'is it deposit or withdrawal? | send or receive']
  }
  
});


export default mongoose.model("Transaction", UserSchema);
