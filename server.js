/**
 *
 * This application matches MQTT messages and publishes new ones if they are matched
 *
 * @author  Dennis de Greef <github@link0.net>
 * @license MIT
 *
 * TODO: Convert these rules to some kind of database
 */
var mqtt     = require('mqtt');
var config   = require('./config');

var mqttUri  = 'mqtt://' + config.mqtt.hostname + ':' + config.mqtt.port;
var client   = mqtt.connect(mqttUri);

client.on('message', function (topic, message) {
    switch(true) {
        case /user\/dennisdegreef\/voice/.test(topic):
            log("Topic matched");
            handleVoiceMessage(client, message);
            break;
        default: {
            if (config.debug) {
                log("Unhandled topic: " + topic);
            }
        }

    }
});

client.on('connect', function () {
    log("Connected to MQTT server " + mqttUri);
    // Subscribe on everything in the MQTT namespace
    client.subscribe(config.mqtt.namespace + '#');
});


function log(message) {
    console.log((new Date().toISOString()) + ": " + message);
}

function handleVoiceMessage(client, message) {
    message = message.toString().toLowerCase();
    log("Handling voice message: " + message);

    switch(true) {
        case /light(.*)on/.test(message):
            log("Turning lights on");
            client.publish('light/all/state', 'on');
            break;
        case /light(.*)off/.test(message):
            log("Turning lights off");
            client.publish('light/all/state', 'off');
            break;
        case /light(.*)red/.test(message):
            log("Turning lights red");
            client.publish('light/all/color', 'red');
            break;
        default:
            log("Unknown voice command");
            client.publish('commander/voice/unknown', message);
            break;
    }
}
