import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

const deposit = async (req, res )=>{

    const { amount, senderId, trans } = req.body
    if (!amount) res.status(403).json({ error: 'Invalid amount' })
    if (!senderId) res.status(403).json({ error: 'Who is making the deposit?' })
    if (!trans) res.status(403).json({ error: 'Unknown transaction type (deposit, withdrawal, send, receive?)' })
    try{
        const user = await User.findOne({_id: senderId})
        if (!user) res.status(404).json({ error: 'the depositor is non-existent?'})
        user.wallet += Number(amount)
        await user.save()

        const newTrans = await Transaction.create({ sender:senderId, amount, trans })
        res.status(201).send(newTrans)



    }catch(error){
        res.status(error.code).json({ 'server error': `${error.message}`})
    }
    
}
const withdraw = (req, res )=>{

}

const fullSend = (req, res )=>{

}




export { deposit, withdraw, fullSend }