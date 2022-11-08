import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

const deposit = async (req, res )=>{

    const { amount, senderId, trans } = req.body
    console.log(req.body)
    if (!amount) res.status(403).json({ error: 'Invalid amount' })
    if (!senderId) res.status(403).json({ error: 'Who is making the deposit?' })
    if (!trans) res.status(403).json({ error: 'Unknown transaction type (deposit, withdrawal, send, receive?)' })
    try{
        const daUser = await User.findOne({_id: senderId})
        if (!daUser) res.status(404).json({ error: 'the depositor is non-existent?'})
        console.log(daUser)
        daUser.wallet += +amount
        await daUser.save()

        const newTrans = await Transaction.create({ sender:daUser._id, amount, trans })
        console.log(newTrans)
        res.status(201).send(newTrans)

    }catch(error){
        console.log(error)
        res.status(501).json({ 'server error': `${error.message}`})
    }
    
}

const withdraw = (req, res )=>{

}

const fullSend = (req, res )=>{

}




export { deposit, withdraw, fullSend }