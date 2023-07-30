import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
const Searchbar = ({ value, setValue, onSearch, className}) => {
  const keyDownHandler = (e) => {
    if (e.code === "Enter") {
      onSearch();
    }
  }
    return (
      <div className={className}>
        <div className="relative h-full">
          <div
            className="flex bg-transparent border-black focus-within:border-b-2 focus-within:pb-1.5 p-2"
          >
            <FontAwesomeIcon icon={faSearch} className="pe-2 mt-1" />
            <input type="text" value={value} onChange={e => setValue(e.target.value)} onKeyDown={keyDownHandler} placeholder="Find recipe..." className="bg-transparent placeholder:text-black placeholder:italic focus:outline-none"></input>
          </div>  
        </div>
      </div>
    );
  };
  
  export default Searchbar;