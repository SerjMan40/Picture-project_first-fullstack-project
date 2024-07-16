import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BounceLoader } from 'react-spinners'
import { RootState } from '../../redux/store'
import ProtectedRoute from '../elements/ProtectedRoute'

import {
  countChangedItem,
  deleteIAlltem,
} from '../../redux/slices/itemsSlices'
import Footer from '../elements/Footer'
import Item from '../elements/Item'
import './Items.css'
import SearchByAuthor from '../elements/SearchByAuthor'
import { ArrOfObj } from '../../types/interfaces'
import { fetchData } from '../../redux/thunks/fetchData'

const Items = () => {
  const data = useSelector((state: RootState) => state.items.data)
  const [currentItems, setCurrentItems] = useState<ArrOfObj[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    setCurrentItems(data)
  }, [data])

  const dispatch = useDispatch()

  const quantity: number = currentItems.length

  const handleUpdateItemList = () => {
    if (quantity) {
      dispatch(deleteIAlltem())
    }
    dispatch(countChangedItem())
    setIsLoading(true)
    dispatch(fetchData() as any)
      .then(() => setIsLoading(false))
      .catch(() => setIsError(true))
  }

  const handleSearchAuthor = (value: string) => {
    setSearchValue(value)
  }

  useEffect(() => {
    if (searchValue.trim() === '') {
      setCurrentItems(data)
    } else {
      const regex: RegExp = new RegExp(searchValue.trim(), 'i')
      setCurrentItems(data.filter((item) => regex.test(item.author)))
    }
  }, [searchValue, data])

  const handleDeleteSearchAuthor = () => {
    setSearchValue('')
    setCurrentItems(data)
  }
  const noItemsMessage = searchValue ? 'Author not found' : 'Please download items...'

  return (
    <ProtectedRoute>
      <div className="img-background__blur">
        <div className="class-container">
          <main>
            <div className="items-container">
              <div className="items-controller">
                {quantity !== 1 ? (
                  <h2>Items: {quantity}</h2>
                ) : (
                  <h2>Item: {quantity}</h2>
                )}
                <button
                  className="btn btn-success"
                  onClick={handleUpdateItemList}
                >
                  Download items
                </button>
                <SearchByAuthor
                  searchAuthor={handleSearchAuthor}
                  deleteSearchAuthor={handleDeleteSearchAuthor}
                  value={searchValue}
                />
              </div>
              {!quantity && !isLoading && (
                <div className="items-box-message">
                  <p>{noItemsMessage}</p>
                </div>
              )}
              <div className={isLoading ? 'items-box-spinner' : 'items-box'}>
                {isLoading && (
                  <div className="loading-spinner">
                    <BounceLoader color={'#123abc'} loading={true} />
                  </div>
                )}
                {isError && <h1>Loading error</h1>}
                {currentItems.map(({ itemId, url, author, uuId, isChanged }) => (
                  <Item
                    key={uuId}
                    price={+itemId}
                    img={url}
                    author={author}
                    itemId={itemId}
                    isChanged={isChanged}
                  />
                ))}
              </div>
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

export default Items
