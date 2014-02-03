var client;
var message;

function establishConnection() {
    client = new Messaging.Client("test.mosquitto.org", 80, "eiti");
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.connect({onSuccess:onConnect});
}

function onConnect() {
    client.subscribe("/World");
    
    message = new Messaging.Message("Hello");
    message.destinationName = "/World";
    client.send(message); 
};

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0)
        alert("onConnectionLost:"+responseObject.errorMessage);
};

function onMessageArrived(message) {
    alert("onMessageArrived:"+message.payloadString);
    client.disconnect(); 
};