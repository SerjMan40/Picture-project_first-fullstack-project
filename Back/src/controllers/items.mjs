import {
  readItemsFromDB,
  addItemsToDB,
  deleteItemOnIdFromDB
} from '../services/itemService.mjs' 

export const getItems = async (req, res) => {
  try {
    const items = await readItemsFromDB()
    res.status(200).json(items)
  } catch (error) {
    res.status(500).json({ message: 'Error reading items', error })
  }
}

export const createItems = async (req, res) => {
  try {
    const newItems = await addItemsToDB(req.body)
    if (newItems.length === 0) {
      return res.status(400).json({ message: 'Error adding items' })
    }
    res.status(201).json(newItems)
  } catch (error) {
    res.status(500).json({ message: 'Error adding items', error })
  }
}

export const deleteItemOnId = async (req, res) => {
  try {
    const deleted = await deleteItemOnIdFromDB(req.params.itemId)
    if (!deleted) {
      return res.status(404).json({ message: 'Item not found or not deleted' })
    }
    res.status(200).json({ message: 'Item deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error })
  }
}
