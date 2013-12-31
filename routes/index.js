var clients = {}; //用于保存所有连接用户

exports.index = function(req, res){
	console.log("connected");
	res.sendfile('views/index.html');
};

exports.chat = function(req, res){
	// res.sendfile('views/index.html');
	// 构造客户端对象
    var client = {
    	connection : conn,
        nickname : ""
    };

    var res = "";

        if(client.nickname === ""){
        	if(!clients[message]){
        	  client.nickname = message;
              res = getTime() + "-" + client.nickname + "加入聊天室";
              console.log(client.nickname + ' login');
            }else{  //用户名重复
              res = EXIST_NICKNAME;
              conn.write(res);
              return;
            }
        }else{
        	res = getTime() + "-" + client.nickname + "说：" + message;
            console.log(client.nickname + ' say: ' + message);
        }

        clients[client.nickname] = client;

        writeMsg(clients,res);

};

// 大厅广播信息
function writeMsg(clients,res){
	if(!clients){
		return;
	}
	for(var c in clients){
		if(clients.hasOwnProperty(c) && clients[c].connection){
			clients[c].connection.write(res);
		}
	}
};

var getTime=function(){
  var date = new Date();
  return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}