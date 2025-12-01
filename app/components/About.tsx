import React from 'react';
import Image from "next/image";

const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center p-8 bg-[#F6F4F2]">
      <div className="flex flex-col md:flex-row items-center max-w-6xl w-full">
        {/* Текстовая часть */}
        <div className="md:w-1/2 flex justify-end pr-0 md:pr-8 mb-8 md:mb-0">
          <div className="max-w-md text-center md:text-right">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-left">О нашей компании</h2>
            <p className="text-md md:text-lg text-gray-600">
              Элегантная мебель для ванной от Aquawel
              Aquawel в Москве предлагает изготовление стильной и функциональной мебели для ванной комнаты, создавая уют и комфорт в вашем доме. Закажите у нас авторскую мебель и наслаждайтесь качеством и красотой!
            </p>
            <h3 className="text-xl md:text-3xl font-bold mb-2 mt-4 text-left">Почему мы?</h3>
            <p className="text-md md:text-lg text-gray-600">
              Выбирайте Aquawel: качество, стиль и долговечность. Индивидуальный подход, уникальные решения и безупречный сервис. Ваша ванная комната станет уютной и функциональной с нашей мебелью.

              Aquawel предлагает эксклюзивный дизайн и надежность. Профессиональное изготовление мебели с учетом всех пожеланий клиента. Преобразите свою ванную комнату с нами!
            </p>
          </div>
        </div>

        {/* Фотография */}
        <div className="md:w-1/2 flex justify-start pl-0 md:pl-8">
          <div className="max-w-md w-full">
            <img
              src="/about.jpg" // Замените на ваш путь к изображению
              alt="О нашей компании"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;