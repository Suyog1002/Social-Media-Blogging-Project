class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    //to and fro interaction between server,observer and user(subscriber)
    connectionHandler(){
        this.socket.on('connect',function(){
            console.log('Connection established using sockets...!');
        });
    }
}