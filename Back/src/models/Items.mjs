import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  uuId: {
    type: String,
    required: true
  },
  isChanged: {
    type: Boolean,
    required: true
  }
})
const Item = mongoose.model('Item', itemSchema)

export default Item
