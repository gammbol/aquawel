import React from 'react';

const SearchBar = () => {
  return (
    <div className="w-md">
      <input className="bg-white border border-gray-300 w-full h-11 outline-0 py-0.5 px-2" type="text" placeholder="Поиск..."/>
    </div>
  );
};

export default SearchBar;