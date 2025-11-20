'use client';
import {useModal} from "@/app/contexts/ModalContext";
import React from 'react';

const Hero = () => {
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal(); // Передаем текущий номер телефона
  };

  return (
    <section className="bg-[url(/hero-bg.jpg)]">
      <div className="bg-black/65 backdrop-blur-2xl w-full h-full">
        <div className="max-w-7xl mx-auto py-48 md:py-64 px-5 flex flex-col items-center justify-center">
          <h1 className="font-medium text-4xl text-white mb-1 md:text-9xl">Aquawel</h1>
          <p className="text-gray-100 mb-10 max-w-3/4 text-center text-sm md:text-lg">
            Качествeнный выбop, кoтоpому можно доверять
          </p>
          <div className="flex gap-5 items-center justify-center max-w-lg w-full flex-col md:flex-row">
            <button className="btn btn-outline btn-md md:btn-md lg:btn-lg
              xl:btn-xl md:max-w-1/2 w-full p-3 hover:border-white bg-[#947458] text-white border-transparent">
              кнопикс в разработке :3
            </button>
            <button
              onClick={handleOpenModal}
              className="btn btn-outline btn-md md:btn-md lg:btn-lg
              xl:btn-xl md:max-w-1/2 w-full p-3 md:p-0 text-white hover:bg-[#947458]">
              Оставить заявку
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;