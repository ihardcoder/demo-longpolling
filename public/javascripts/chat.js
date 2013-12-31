var content = $('#content');
var status_txt = $('#status');
var input_area = $('#input');
var send_bt = $('#send_bt');
var connect_bt = $('#connect_bt');

// var socket= new io.Socket('localhost',{ 
//   port: 3000 
// }); 
var socket;

var myName = "";

var firstconnect = true;

//输入框“回车”提交
input_area.keydown(function(e) {
    if (e.keyCode === 13) {
      sendMsg();
    }
});

//提交按钮
send_bt.click(sendMsg);

connect_bt.click(connect);

function connect(){
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:3000/chat',
      data: '',
      success: function(data) {
        console.log("data:"+ data);
        $('#results').append('<li>' + data + '</li>');
        connect(); //获取到数据后继续发起请求
      },
      error:function(){
        console.log("error");
        setTimeout(function(){ //如果网络或者服务器异常，则等待timmer再发起请求
          longPoll();
        }, timmer);
      }
    });
}

function sendMsg(){
    var msg = input_area.val();
    if (!msg){
        return
    };

    socket.send(msg);  //发送信息

    input_area.val('');   //清空输入框

    //如果是第一次连接，则设置昵称
    if (firstconnect) {
        myName = msg;
    }
}
