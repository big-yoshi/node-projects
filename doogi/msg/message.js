var express = require("express");
var router = express.Router();
var app = express();
const session = require("express-session");
const mongoClient = require("mongodb").MongoClient;
var io = require("socket.io")(100);





const client_list = {}
io.on('connection', function(socket){
    

    
    socket.on('send-name', name=>{
        client_list[socket.id] = name;
        console.log(client_list);
        io.emit("receive-user-list",Object.values(client_list));
        
    })

    socket.on("send-invite", name=>{
      let toName = name;
      let nameIndex = Object.values(client_list).indexOf(name);
      let nameSock = Object.keys(client_list)[nameIndex];
      let fromName = client_list[socket.id];
      let fromId = socket.id;

      io.to(`${nameSock}`).emit('receive-invite',fromName);
      
      console.log(fromName+" wants to chat with "+toName+": "+nameSock);

    });

    socket.on("yesOno",yesOno=>{
      let nameIndex = Object.values(client_list).indexOf(yesOno[0]);
      let nameSock = Object.keys(client_list)[nameIndex];
      if(yesOno[1]){
        io.to(`${nameSock}`).emit('aOd','a');
        io.to(`${nameSock}`).emit('chat',client_list[socket.id]);
        socket.emit('chat',client_list[nameSock]);
        console.log(client_list[nameSock]+" is now chatting with "+client_list[socket.id]);

      }
      else{
        io.to(`${nameSock}`).emit('aOd','d');
      }
    })

    

    socket.on('disconnect', function(){
      console.log("Dis sock:"+socket.id);
      delete client_list[socket.id];
      io.emit("receive-user-list",Object.values(client_list));
      
    });



    socket.on("send-message", msg => {
      console.log(msg);
      let from = msg["from"];
      let fromSock = socket.id;

      let to = msg["to"];
      let nameIndex = Object.values(client_list).indexOf(to);
      let toSock = Object.keys(client_list)[nameIndex];
      
      msg = msg['msg'];

      io.to(`${toSock}`).emit("receive-message",[from,to,msg]);
    });


  });


router.get("/",(req,res,next)=>{
    res.render("message")
});

router.post("/",(req,res,next)=>{

});


module.exports = router;