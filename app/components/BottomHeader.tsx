'use client';
import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

const BottomHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="flex justify-between md:justify-center items-center gap-40 py-2 px-4">
        {/* Бургер меню для мобильных - абсолютное позиционирование слева */}
        <div className="md:hidden block left-4">
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Открыть меню"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Логотип - остается по центру как было */}
        <div>
          <Image
            src="/logo.svg"
            alt="Логотип компании Aquawel"
            width={110}
            height={110}
            className="w-20 h-20 md:w-28 md:h-28" // 80px на мобильных, 112px на десктопе
          />
        </div>

        {/* Навигация для десктопа - без изменений */}
        <ul className="md:flex justify-center items-center gap-10 hidden">
          <li className="text-lg"><Link href="/">Главная</Link></li>
          <li className="text-lg"><Link href="#about">О нас</Link></li>
          {/*<li><Link href="/store">Магазин</Link></li>*/}
        </ul>

        {/* Иконки пользователя - без изменений */}
        <div className="md:flex justify-center items-center gap-5 hidden">
          <Link href="/account"><i className="fa-solid fa-user"></i></Link>
          <Link href="/cart"><i className="fa-solid fa-cart-shopping"></i></Link>
          <Link href="/shoppingbag"><i className="fa-solid fa-bag-shopping"></i></Link>
        </div>
      </div>

      {/* Мобильное меню */}
      <div className={`
        fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:hidden
      `}>
        {/* Заголовок меню */}
        <div className="flex justify-between items-center p-4 border-b">
          <Image src="/logo.svg" alt="Логотип компании Aquawel" width={80} height={80} />
          <button
            onClick={closeMenu}
            className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Закрыть меню"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Навигация */}
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                onClick={closeMenu}
                className="block py-3 text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors border-b"
              >
                Главная
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                onClick={closeMenu}
                className="block py-3 text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors border-b"
              >
                О нас
              </Link>
            </li>
          </ul>
        </nav>

        {/* Дополнительные ссылки */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
          <div className="flex justify-center space-x-6 mb-4">
            <Link href="/account" onClick={closeMenu} className="p-2 text-gray-600 hover:text-blue-600">
              <i className="fa-solid fa-user text-xl"></i>
            </Link>
            <Link href="/cart" onClick={closeMenu} className="p-2 text-gray-600 hover:text-blue-600">
              <i className="fa-solid fa-cart-shopping text-xl"></i>
            </Link>
            <Link href="/shoppingbag" onClick={closeMenu} className="p-2 text-gray-600 hover:text-blue-600">
              <i className="fa-solid fa-bag-shopping text-xl"></i>
            </Link>
          </div>
          <p className="text-center text-sm text-gray-700">г.Домодедово, Станционная ул. 3</p>
          <p className="text-center text-sm text-gray-700 mb-1">
            <i className="fa-solid fa-phone mr-2"></i>
            <Link href="tel:+78005553535">+7 800 555 3535</Link>
          </p>
          <p className="text-center text-sm text-gray-500">
            Aquawel © 2024
          </p>
        </div>
      </div>

      {/* Оверлей */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}
    </>
  );
};

export default BottomHeader;