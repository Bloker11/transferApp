import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

const deposit = async (req, res) => {
  const { difference, senderId, trans } = req.body;
  console.log(req.body);
  if (!difference) res.status(403).json({ error: "Invalid Amount" });
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
    // console.log(daUser);
    daUser.wallet += +difference;
    await daUser.save();

    const newTrans = await Transaction.create({
      sender: daUser._id,
      amount: difference,
      trans,
    });
    const updatedUser = await User.findOne({_id: senderId})
    if(!updatedUser){
      throw new Error("Failed to fetch updated user from DB")
    }

    res.status(201).json({newTrans, updatedUser});
  } catch (error) {
    console.log(error);
    res.status(501).json({ "server error": `${error.message}` });
  }
};

const withdraw = async (req, res) => {
  try {
    const { difference } = req.params;
    const userId = req.user;
    if (!difference) {
      return res
        .status(400)
        .json({ error: "withdrawal difference must be included" });
    }

    const user = await User.findOne(
      {_id: userId}
      // {'$inc':{wallet: -difference}}, 
      // {new:true}
    );
    console.log(user.wallet, user._id)
    if(user.wallet <= 0 || user.wallet< difference){
      return res.status(400).json({ error:"user balance too low to make withdrawal"})
    }
    user.wallet -= +difference
    user.save()

    const withdrawal = await Transaction.create({
      sender: userId,
      amount: difference,
      trans: "withdrawal",
    })
;
    

    const updatedTrans = await withdrawal.populate(
      "sender",
      "name"
    );
    res.status(201).json({updatedTrans, user});
  } catch (e) {
    console.log(e);
  }
};

const fullSend = async (req, res) => {
  try {
    //getting receiver difference and userId from request
    //and ensuring they're there
    const { receiver, difference } = req.body;
    const userId = req.user;
    if (!difference) {
      return res.status(400).json({ error: "transaction difference needed" });
    }
    if (!receiver) {
      return res.status(400).json({ error: "receiver must be included" });
    }
    if (!userId) {
      return res.status(500).json({ error: "verification error" });
    }

    //getting the sender and receiver from db and updating their wallet
    //balances
    // const theSender = await User.findOneAndUpdate(
    //   {_id: userId},
    //   {'$inc':{wallet: -difference}}, 
    //   {new:true}
    // )

    const theSender = await User.findOne(
      { _id: userId }
    );
    if(theSender.wallet <= 0 || theSender.wallet< difference){
      return res.status(400).json({ error:"sender balance too low to send money"})
    }
    theSender.wallet -= +difference
    await theSender.save()


    const theReceiver = await User.findOne(
      { email: receiver }
    );
    theReceiver.wallet += +difference
    await theReceiver.save()
    // const theReceiver = await User.findOneAndUpdate({email: receiver},{'$inc':{wallet: difference}}, {new:true})
      
    if (!theReceiver) {
      return res
        .status(404)
        .json({ error: `check the receiver ${receiver} or the sender. We ran into a problem` });
    }
    if (!theSender) {
      return res.status(404).json({ error: `sender not found in db` });
    }

    //creating entry to transaction db
    const theTransaction = await Transaction.create({
      sender: userId,
      amount: difference,
      receiver: theReceiver._id,
      trans: "send",
    });

    //get populated transaction for frontenf
    let returnTransaction = await Transaction.findOne({ _id: theTransaction._id })
      .populate("sender", "email")
      .populate("receiver", "email");

    res.status(201).json({transaction: returnTransaction, initiator: theSender, receiver: theReceiver});
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
    const myTransactions = await Transaction.find({sender: id})
    .sort({ _id: -1 })
    .populate("sender", "name")
    for(let i=0; i<myTransactions.length; i++){
      if (Boolean(myTransactions[i].receiver)){
        myTransactions[i].populate("receiver", "name")
      }
    }
    res.status(200).json(myTransactions)
  }catch(e){
    console.log(e)
    res.status(500).json({ error: `server error: ${e.code}`})
  }
}

export { deposit, withdraw, fullSend, getMyTransactions };
