const normalizr = require("normalizr");

const authorSchema = new normalizr.schema.Entity('author');
const messagesSchema = new normalizr.schema.Entity('messages', { author: authorSchema });
const chatSchema = new normalizr.schema.Entity('chat', { 
  messages: [messagesSchema]
})

module.exports = {
    chatSchema
}