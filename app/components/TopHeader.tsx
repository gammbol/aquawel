import React from 'react';
import SearchBar from "@/app/components/searchbar";

const TopHeader = () => {
  return (
    <div className="bg-[#F6F4F2] py-5 hidden items-center justify-start pl-20 gap-20 md:flex">
      <span>г.Домодедово, Станционная ул. 3</span>
      {/*<SearchBar />*/}
      <span><i className="fa-solid fa-phone mr-2"></i>+7 800 555 3535</span>
    </div>
  );
};

export default TopHeader;