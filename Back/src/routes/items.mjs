import express from 'express'
import { createItems, deleteItemOnId, getItems } from '../controllers/items.mjs'

const itemsRouter = express.Router()

itemsRouter.get('/', getItems)
itemsRouter.post('/', createItems)
itemsRouter.delete('/:itemId', deleteItemOnId)

export default itemsRouter
