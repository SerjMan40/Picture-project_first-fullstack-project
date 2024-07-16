import Item from "../models/Items.mjs"

export const readItemsFromDB = async () => {
  try {
    const items = await Item.find()
    return items
  } catch (error) {
    console.error('Error reading items:', error)
    return []
  }
}

export const addItemsToDB = async (items) => {
  try {
    const results = await Item.insertMany(items)
    return results.map(result => result.toObject())
  } catch (error) {
    console.error('Error adding items:', error)
    return []
  }
}

export const deleteItemOnIdFromDB = async (itemId) => {
  try {
    const result = await Item.findOneAndDelete({ itemId })
    return result !== null
  } catch (error) {
    console.error('Error deleting item:', error)
    return false
  }
}
