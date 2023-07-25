// components/SearchBar.js

const SearchBar = () => {
    return (
      <div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-blue-200 text-black p-2 pr-10 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
      </div>
    );
  };
  
  export default SearchBar;