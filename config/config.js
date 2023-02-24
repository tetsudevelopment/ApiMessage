module.exports = {

    rabbitMQ: {
        url: "amqp://localhost",
        queue:"my-queue",
        exchange: "my-exchange",
        routingKey:"my-key"
    },
    mysql:{
        host:'localhost',
        user:'root',
        password: '',
        database:'api_message'
    }

}