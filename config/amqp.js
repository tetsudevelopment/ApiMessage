const amqp = require('amqplib')
const config = require('./config')

const connect = async () =>{
    const connection = await amqp.connect(config.rabbitMQ);
    const channel = await connection.createChannel();

    const { queue, exchange, routingKey} = config.rabbitMQ;

    await channel.assertQueue(queue);
    await channel.assertExchange(exchange,'direct')
    await channel.bind
    await channel.bindExchange(queue,exchange, routingKey);

    channel.consume(queue, message =>{
        console.log(`Received message: ${message.content.toString()}`);
    },{noAck:true});
    console.log(`Connected to RabbitMQ at ${config.rabbitMQ.url}`);
}

module.exports = { connect }