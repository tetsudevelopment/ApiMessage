const express = require('express');
const app = express();
const messagesRouter = require('./routes/messages');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/messages', messagesRouter);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});