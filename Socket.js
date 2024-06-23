const socket = require('socket.io');
const { saveMsg } = require('./Controller/message');

const onlineusers = [];

const addusers = (user,socketID)=>{
    // console.log(user);
    const isExist = onlineusers.findIndex((item)=>item._id === user._id);
    if(isExist !==-1){
        onlineusers.splice(isExist,1)
    }

    user.socketId = socketID;
    onlineusers.push(user)
}

const removeuser =(socketID)=>{
    const isExist = onlineusers.findIndex((item)=>item.socketId === socketID);
    if(isExist!==-1){
        onlineusers.splice(isExist,1);
    }
    // return onlineusers;
    // console.log("done");
}
const socketInit = (server)=>{
    // console.log("TEST",server);
    const io = socket(server,{
        cors:{
            origin:"http://localhost:5173",
        }
    });
    
    io.on("connection",(socket)=>{
        socket.on("ADD_USER",(user)=>{
            addusers(user,socket.id);
            io.emit("USERS_ADDED",onlineusers);
        })
        socket.on("SEND_MESSAGE",(data)=>{
            saveMsg(data);
            io.to(data.receiver.socketId).to(data.sender.socketId).emit("RECEIVE_MSG",data);
        })
        socket.on("disconnect", () => {
            removeuser(socket.id);
            io.emit("USERS_ADDED", onlineusers);
          });

    })
}

module.exports = socketInit