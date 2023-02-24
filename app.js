const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const amqp = require('amqplib/callback_api');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// Import routes
const messageRoutes = require('./routes/messages');

// Use routes
app.use('/api/messages', messageRoutes);

// RabbitMQ configuration
amqp.connect(process.env.RABBITMQ_URL, (err, conn) => {
  if (err) {
    console.error('[ERROR] Failed to connect to RabbitMQ:', err);
    return;
  }
  console.log('[INFO] Connected to RabbitMQ');
  
  conn.createChannel((err, ch) => {
    if (err) {
      console.error('[ERROR] Failed to create RabbitMQ channel:', err);
      return;
    }
    
    const queue = 'messages';

    ch.assertQueue(queue, { durable: true });
    ch.prefetch(1);
    
    console.log('[INFO] Waiting for messages in queue:', queue);
    ch.consume(queue, async (msg) => {
      const content = JSON.parse(msg.content.toString());
      console.log(`[INFO] Received message with content: ${content.content}`);

      // Do something with the message content, such as storing it in the database
      
      ch.ack(msg);
    });
  });
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`[INFO] Server is running on port ${process.env.PORT}`);
});