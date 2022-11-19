import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

const deposit = async (req, res) => {
  const { amount, senderId, trans } = req.body;
  console.log(req.body);
  if (!amount) res.status(403).json({ error: "Invalid amount" });
  if (!senderId) res.status(403).json({ error: "Who is making the deposit?" });
  if (!trans)
    res
      .status(403)
      .json({
        error: "Unknown transaction type (deposit, withdrawal, send, receive?)",
      });
  try {
    const daUser = await User.findOne({ _id: senderId });
    if (!daUser)
      res.status(404).json({ error: "the depositor is non-existent?" });
    console.log(daUser);
    daUser.wallet += +amount;
    await daUser.save();

    const newTrans = await Transaction.create({
      sender: daUser._id,
      amount,
      trans,
    });
    console.log(newTrans);
    res.status(201).send(newTrans);
  } catch (error) {
    console.log(error);
    res.status(501).json({ "server error": `${error.message}` });
  }
};

const withdraw = async (req, res) => {
  try {
    const { amount } = req.params;
    const userId = req.user;
    if (!amount) {
      return res
        .status(400)
        .json({ error: "withdrawal amount must be included" });
    }

    const withdrawal = await Transaction.create({
      sender: userId,
      amount,
      trans: "withdrawal",
    });
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { wallet: wallet - amount }
    );
    user.wallet -= amount;
    await user.save();

    updatedTrans = await Transaction.findOne({ _id: withdrawal._id }).populate(
      "sender",
      "name"
    );

    res.status(201).json(updatedTrans, user);
  } catch (e) {
    console.log(e);
  }
};

const fullSend = async (req, res) => {
  try {
    //getting receiver amount and userId from request
    //and ensuring they're there
    const { receiver, amount } = req.body;
    if (!amount) {
      return res.status(400).json({ error: "transaction amount needed" });
    }
    if (!receiver) {
      return res.status(400).json({ error: "receiver must be included" });
    }
    const user = req.userId;

    //getting the sender and receiver from db and updating their wallet
    //balances
    const receiverDeets = await User.findOne(
      { email: receiver },
      { wallet: wallet + amount },
      {
        new: true,
      }
    );
    if (!receiverDeets) {
      return res
        .status(404)
        .json({ error: `no such person ${receiver} found` });
    }
    const theSender = await User.findOneAndUpdate(
      { _id: user },
      { wallet: wallet - amount },
      {
        new: true,
      }
    );
    if (!theSender) {
      return res.status(404).json({ error: `sender not found in db` });
    }

    //creating entry to transaction db
    const theTransaction = Transaction.create({
      sender: user,
      amount,
      receiver: receiverDeets._id,
      trans: "send",
    });

    //get populated transaction for frontenf
    let returnTransaction = Transaction.findOne({ _id: theTransaction._id })
      .populate("sender", "email")
      .populate("receiver", "email");

    res.status(201).json(returnTransaction, theSender);
  } catch (e) {
    console.log(e);
  }
};

const getMyTransactions = async(req, res) => {
  try{  
    console.log("we've been hit")
    const { id } = req.params
    if(!id){
      return res.status(404).json({ error:"No such user found"})
    }
    console.log(id)
    const myTransactions = await Transaction.find({sender: id}).populate("sender", "name")
    for(let i=0; i<myTransactions.length; i++){
      if (Boolean(myTransactions[i].receiver)){
        trans.populate("receiver", "name")
      }
    }
    res.status(200).json(myTransactions)
  }catch(e){
    console.log(e)
    res.status(500).json({ error: `server error: ${e.code}`})
  }
}

export { deposit, withdraw, fullSend, getMyTransactions };
