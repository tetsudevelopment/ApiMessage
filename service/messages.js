const config = require('../config/config.js')
const {connect} = require('../config/amqp.js')

const send = async ( message)=>{

    const connection = await connect();
    const channel = await connection.createChannel()

    const {exchange, routingKey} = config.rabbitMQ;

    await channel.assertExchange(exchange, 'direct');
    await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));


    console.log(`Sent message: ${JSON.stringify(message)}`);

    await channel.close();
    await connection.close;

}

module.exports = { send }