
    $(function(){
        socket.emit('send-name',random_name);
        var av = false
       

        socket.on("receive-user-list", (users_list)=>{
            
            $(".connected-list").empty();
            Array.prototype.forEach.call(users_list,el=>{
                
                if(el != random_name)
                {
                    $(".connected-list").append("<li class='connected'>"+el+"</li>");
                }
                    
            })
            if($(".connected-list").length !=0){
                $(".connected").click(function(){
                    let name = $(this).html()
                    sendInvite(name);
                });
            
            }

        
   
        });


        socket.on('receive-invite',(from)=>{
            yesOno = window.confirm("do you want to chat with "+from);
            socket.emit("yesOno",[from,yesOno]);
        });

        const from = random_name;
        var to;
        
        
        function sendInvite(name){
            socket.emit("send-invite",name);
        }
        $("#sendMSG").click(function(event){
            event.preventDefault();
            let msg = $('#messInput').val();
            addMSG(msg,left=false);
            let data = {'from':random_name,'to':to,'msg':msg}
            socket.emit("send-message",data);
            $('#messInput').val("");
        });

        socket.on("receive-message",(data)=>{

            addMSG(data[2],left=false);
            
        });

        socket.on("chat",(name)=>{
            alert("starting to chat with "+name);
            CHAT(name);
            to = name;
             
        })
        

        socket.on("aOd",(msg)=>{
            if(msg=='d'){
                alert("user declined");
            }
            if(msg=='a'){
                alert("user accepted");
            }
        });


    });
    function CHAT(name){
        $(".menu").css("display",'none');
        $(".chat").css("display",'initial');
        $(".chat .topBar .name span").html(name);
    }


    function addMSG(msg,left=true){
        let msgs = $("#msgs");
        if (left==true){
           let element = `
        
        <div class="row left">
                        <div class="col pic">
                            <img src="images/web-design/girl2.jpeg" >
                        </div>
                        <div class="col message">
                            <span>
                               ${msg}
                            </span>
                        </div>
        </div>
         `;
        }
        else{
            
           let element = `
           <div class="row right">
                       
                       <div class="col message">
                           <span>
                               ${msg}
                           </span>
                       </div>
                   </div>
           `;

           $(msgs).append(element);

        }
        


    }
    
