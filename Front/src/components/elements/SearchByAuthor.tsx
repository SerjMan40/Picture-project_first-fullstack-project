import { SearchByAuthorProps } from '../../types/interfaces'
import './SearchByAuthor.css'

const SearchByAuthor: React.FC<SearchByAuthorProps> = ({
  searchAuthor,
  deleteSearchAuthor,
  value
}) => {
  return (
    <div className="filter-container">
      <input
        value={value}
        type="text"
        placeholder="Search by author"
        onInput={(e) => searchAuthor(e.currentTarget.value)}
      />
      <button className="btn btn-danger" onClick={deleteSearchAuthor}>
        Reset
      </button>
    </div>
  )
}

export default SearchByAuthor
