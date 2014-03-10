function Mqtt( topic ) {
    this.client;
    this.message;
    
    this.topic = topic;
    
    this.clientName = "broker.mqttdashboard.com";
    this.clientPort = 8000;
    this.clientId = "eiti";
    
    this.setup = function( name, port, id ) {
        this.clientName = name;
        this.clientPort = port;
        this.clientId = id;
    }
    
    this.establishConnection = function () {
        console.log("establishing connection");
        client = new Messaging.Client( this.clientName, this.clientPort, this.clientId );
        client.onConnectionLost = this.onConnectionLost;
        client.onMessageArrived = this.onMessageArrived;
        client.connect( { onSuccess : this.subscribe } );
    }
    
    this.subscribe = function() {
        console.log("subscribing to topic: "+ topic);
        client.subscribe( topic );
    };
    
    this.send = function( dest, msg ) {
        message = new Messaging.Message(msg);
        message.destinationName = dest;
        client.send(message); 
    }
    
    this.onConnectionLost = function( responseObject ) {
        if( responseObject.errorCode !== 0 ) {
            console.warn("error code: "+ responseObject.errorCode);
            
            $('#message-negative').val( 'retry' );
            
            showMessageBox("connection lost", function() {
                console.log("trying to reconnection");
                //client = new Messaging.Client( this.clientName, this.clientPort, this.clientId );
                /* ???
                client.onConnectionLost = this.connectionFunc;
                client.onMessageArrived = this.receiverFunc;
                client.connect( { onSuccess : this.subscribeFunc } );*/
            });
        }
    };
    
    this.onMessageArrived = function( message ) {
        onReceive( message.payloadString );
    };
    
    this.disconnect = function() {
        client.disconnect();
    };
};