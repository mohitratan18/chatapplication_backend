const Message = require('../Models/Message');
const saveMsg = async(data)=>{
    const savemsg = new Message(data);
    await savemsg.save();
}
module.exports = {
    saveMsg,
}