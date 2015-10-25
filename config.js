var config = {};

config.debug  = process.env.DEBUG || false;
config.mqtt   = {};

config.mqtt.namespace = process.env.MQTT_NAMESPACE || '';
config.mqtt.hostname  = process.env.MQTT_HOSTNAME  || '10.32.10.0';
config.mqtt.port      = process.env.MQTT_PORT      || 1883;

module.exports = config;
