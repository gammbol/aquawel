import React from 'react';
import Image from "next/image";
import Link from "next/link";

const BottomHeader = () => {
  return (
    <div className="flex justify-center items-center gap-40">
      <div>
        <Image src="/logo.jpg" alt="Логотип компании Aquawel" width={100} height={100} />
      </div>
      <ul className="flex justify-center items-center gap-10">
        <li><Link href="/">Главная</Link></li>
        <li><Link href="/store">Магазин</Link></li>
        <li><Link href="/about">О нас</Link></li>
      </ul>
      <div className="flex justify-center items-center gap-5">
        <Link href="/account"><i className="fa-solid fa-user"></i></Link>
        <Link href="/cart"><i className="fa-solid fa-cart-shopping"></i></Link>
        <Link href="/shoppingbag"><i className="fa-solid fa-bag-shopping"></i></Link>
      </div>
    </div>
  );
};

export default BottomHeader;