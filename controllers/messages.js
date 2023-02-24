const {send} = require('../service/messages.js')
const {schema} = require('../models/messages.js')
const { successResponse, errorResponse } = require('../utils/response.js')
const message = require('../models/message');
const { getAll } = require('../models/message');


const getAllMessages = async (req, res) => {
    try {
      const messages = await getAll();
      res.status(200).json(successResponse(messages));
    } catch (err) {
      console.error(err);
      res.status(500).json(errorResponse('An error occurred while getting the messages'));
    }
  };


const createMessage = async ( req, res)=>{
    try {
        const {error}  = schema.validate(req.body);
        if(error) throw new Error(error.details[0].message)


        const messageId = await message.create(req.body);
        await send (req.body);

        res.status(201).json(successResponse('Message sent succesfully'))

    } catch (err) {
        console.error(err);
        res.status(500).json(errorResponse('An error ocurred while sending the message'))
        
    }
}

module.exports = { createMessage, getAllMessages}
