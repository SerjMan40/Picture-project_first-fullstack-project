import {ImBin2} from 'react-icons/im'

import {ItemProps} from '../../types/interfaces'

const ChengItem = ({img, price, author, deleteItem, itemId}: ItemProps) => {
  
  return (
    <div className="item-container item-container-active">
      <img src={img} alt="any foto" />
      <p className="item-container-price">Price: {price} $</p>
      <p className="item-container-author">{author}</p>
      <div className="item-container-button">
        <button className="btn btn-danger" onClick={deleteItem} id={itemId}>
          <ImBin2 />
        </button>
      </div>
    </div>
  )
}

export default ChengItem
