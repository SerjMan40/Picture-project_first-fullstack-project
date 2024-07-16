import {useSelector, useDispatch} from 'react-redux'
import {RootState} from '../../redux/store'
import {useEffect, useState} from 'react'

import './ShoppingCart.css'
import ChengItem from '../elements/ChengItem'
import Footer from '../elements/Footer'
import {
  cancelAllAdditionItem,
  cancelSelection,
  countChangedItem,
  isBuyItem,
} from '../../redux/slices/itemsSlices'
import {ArrOfObj} from '../../types/interfaces'
import {notifyAllDelete, notifyDelete} from '../../utils/notify'
import PaymentForm from '../elements/PaymentForm'
import costCalculator from '../../utils/costCalculator'
import ProtectedRoute from '../elements/ProtectedRoute'

const ShoppingCart = () => {
  const [items, setItems] = useState<ArrOfObj[]>([])

  const isBuy = useSelector((state: RootState) => state.items.isBuy)

  const data: ArrOfObj[] = useSelector((state: RootState) => state.items.data)
  const dispatch = useDispatch()
  useEffect(() => {
    setItems([...data.filter((item) => item.isChanged === true)])
  }, [data])

  const hendleDeleteItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(cancelSelection(e.currentTarget.id))
    dispatch(countChangedItem())
    setItems([...items.filter((item) => item.itemId !== e.currentTarget.id)])
    notifyDelete()
  }

  const quantity: number = items.length

  const hendleDeleteAllItem = () => {
    if (quantity) {
      dispatch(cancelAllAdditionItem())
      dispatch(isBuyItem(false))
      dispatch(countChangedItem())
      setItems([])
      notifyAllDelete()
    }
  }
  const hendleBuyItem = () => quantity && dispatch(isBuyItem(true))

  return (
    <ProtectedRoute>
      <div className="img-background__blur">
        <div className="class-container">
          <main>
            <div className="shoppingCart-container">
              <div className="items-controller">
                {quantity !== 1 ? (
                  <h2>Items: {quantity}</h2>
                ) : (
                  <h2>Item: {quantity} </h2>
                )}
                {quantity ? (
                  <h3>Total cost: {costCalculator(items)} $</h3>
                ) : (
                  <h3>Total cost: 0</h3>
                )}
                <div className="items-controller-btn">
                  <button
                    className="btn btn-danger"
                    onClick={hendleDeleteAllItem}
                  >
                    Delete all items
                  </button>
                  <button className="btn btn-success" onClick={hendleBuyItem}>
                    Buy
                  </button>
                </div>
              </div>
              {!quantity && (
                <div className="items-box-message">
                  <p>
                    You do not have any products selected, please make your
                    selection...
                  </p>
                </div>
              )}
              {isBuy ? (
                <div className="items-pay">
                  <h3>Thank you for your purchase!</h3>
                  <PaymentForm />
                </div>
              ) : (
                <div className="items-box">
                  {items.map(({itemId, url, author, uuId}) => (
                    <ChengItem
                      key={uuId}
                      price={+itemId}
                      img={url}
                      author={author}
                      itemId={itemId}
                      deleteItem={hendleDeleteItem}
                    ></ChengItem>
                  ))}
                </div>
              )}
            </div>
          </main>
          <footer className="class-footer">
            <Footer />
          </footer>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default ShoppingCart
