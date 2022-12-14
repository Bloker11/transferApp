import mongoose from "mongoose";
const ObjectID = mongoose.Schema.Types.ObjectId


const TransactionSchema = new mongoose.Schema({
  sender: {
    type: ObjectID,
    required: [true, "The sender is required"],
    trim: true,
    ref: 'User1'
  },
  receiver: {
    type: ObjectID,
    required: false,
    minlength: 3,
    maxlength: 20,
    trim: true,
    ref: 'User1'
  },
  amount: {
    type: Number,
    required: [true, "Transaction amount needed"],
    validate: {
      validator: (num)=> num>0,
      message: "Please provide a valid amount. Amount cannot be negative.",
    },
    
  },
  trans:{
    type: String,
    enum: ['deposit', 'withdrawal', 'send', 'receive', "transfer"],
    required: [ true, 'is it deposit or withdrawal? | send or receive']
  }
  
}, { minimize: false, timestamps: true });

TransactionSchema.methods.toJSON = function(){
  const Transaction = this;
  const TransactionObject = Transaction.toObject();
  return TransactionObject;
}


export default mongoose.model("Transaction", TransactionSchema);
