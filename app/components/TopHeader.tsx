import React from 'react';
import Link from "next/link";

const TopHeader = () => {
  return (
    <div className="hidden border-b border-[#eadfd4] bg-[#F6F4F2] px-4 py-3 text-sm text-[#5f5852] md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        <p className="uppercase tracking-[0.24em] text-[#947458]">Мебель для ванных комнат на заказ</p>
        <div className="flex items-center gap-8">
          <span>
            <i className="fa-solid fa-location-dot mr-2 text-[#947458]"></i>
            г. Домодедово, Станционная ул. 3
          </span>
          <Link href="tel:+78005553535" className="transition-colors hover:text-[#947458]">
            <i className="fa-solid fa-phone mr-2 text-[#947458]"></i>
            +7 800 555 3535
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
