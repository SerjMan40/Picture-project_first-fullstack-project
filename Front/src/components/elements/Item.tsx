import {useDispatch} from 'react-redux'
import {IoMdHeartEmpty, IoMdHeart} from 'react-icons/io'
import {ImBin2} from 'react-icons/im'
import {useEffect} from 'react'
import 'react-toastify/dist/ReactToastify.css'

import {
  deleteItem,
  additionItem,
  countChangedItem,
} from '../../redux/slices/itemsSlices'
import './Item.css'
import {ItemProps} from '../../types/interfaces'
import {notifyDelete, notifySuccess} from '../../utils/notify'
import { deleteItemFromServer } from '../../redux/thunks/deleteItemFromDB'

const Item = ({isChanged, img, author, price, itemId}: ItemProps) => {

  const dispatch = useDispatch()

  const handleCheng = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(additionItem(e.currentTarget.id))
    dispatch(countChangedItem())
  }

  useEffect(() => {
    isChanged && notifySuccess()
  }, [isChanged])

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(deleteItemFromServer(e.currentTarget.id))
    dispatch(countChangedItem())
    notifyDelete()
  }
  
  return (
    <div
      className={
        isChanged ? 'item-container item-container-active' : 'item-container'
      }
    >
      <img src={img} alt="any foto" />
      <p className="item-container-price">Price: {price} $</p>
      <p className="item-container-author">{author}</p>
      <div className="item-container-button">
        <button className="btn btn-success" onClick={handleCheng} id={itemId}>
          {isChanged ? (
            <IoMdHeart className="heart-active" />
          ) : (
            <IoMdHeartEmpty className="heart" />
          )}
        </button>
        <button className="btn btn-danger" onClick={handleDelete} id={itemId}>
          <ImBin2 />
        </button>
      </div>
    </div>
  )
}

export default Item
