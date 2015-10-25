mqtt-command-parser
===========

This node.js server listens every topic, if it matches something it knows, it will broadcast a new message.

Example
=======

Clone the repository
```bash
$ git clone https://github.com/dennisdegreef/mqtt-command-parser.git
$ cd mqtt-command-parser
$ npm install
```

Start up the server by editing the config.js first to suit your needs
```bash
$ $EDITOR config.js
$ node server.js
```

Or by using environment variables
```bash
$ MQTT_HOSTNAME="192.168.0.1" node server.js
```
