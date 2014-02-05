function Mqtt( topic ) {
    this.client;
    this.message;
    
    this.topic = topic;
    
    this.clientName = "test.mosquitto.org";
    this.clientPort = 80;
    this.clientId = "eiti";
    
    this.setup = function( name, port, id ) {
        this.clientName = name;
        this.clientPort = port;
        this.clientId = id;
    }
    
    this.establishConnection = function () {
        client = new Messaging.Client( this.clientName, this.clientPort, this.clientId );
        client.onConnectionLost = this.onConnectionLost;
        client.onMessageArrived = this.onMessageArrived;
        client.connect( { onSuccess : this.subscribe } );
    }
    
    this.subscribe = function() {
        client.subscribe( topic );
    };
    
    this.send = function( dest, msg ) {
        message = new Messaging.Message(msg);
        message.destinationName = dest;
        client.send(message); 
    }
    
    this.onConnectionLost = function( responseObject ) {
        if( responseObject.errorCode !== 0 )
            return responseObject.errorCode;
    };
    
    this.onMessageArrived = function( message ) {
        return message.payloadString;
    };
    
    this.disconnect = function() {
        client.disconnect();
    };
};