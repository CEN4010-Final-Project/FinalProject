import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
const SearchBar = () => {
    return (
      <div>
        <div className="relative">
          <div
            className="bg-transparent border-black focus-within:border-b-2 p-1"
          >
            <FontAwesomeIcon icon={faSearch} className="pe-2" />
            <input type="text" placeholder="Find recipe..." className="bg-transparent placeholder:text-black placeholder:italic focus:outline-none"></input>
          </div>
          
        </div>
      </div>
    );
  };
  
  export default SearchBar;