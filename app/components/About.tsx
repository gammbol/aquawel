import React from 'react';
import Image from "next/image";

const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center p-8 bg-[#F6F4F2]">
      <div className="flex flex-col md:flex-row items-center max-w-6xl w-full">
        {/* Текстовая часть */}
        <div className="md:w-1/2 flex justify-end pr-0 md:pr-8 mb-8 md:mb-0">
          <div className="max-w-md text-center md:text-right">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">О нашей компании</h2>
            <p className="text-md md:text-lg text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
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