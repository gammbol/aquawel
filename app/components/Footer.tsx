'use client';
import {useModal} from "@/app/contexts/ModalContext";
import React, {useState} from 'react';
import {PhoneInput} from "react-international-phone";
import 'react-international-phone/style.css';

const Footer = () => {
  const [phone, setPhone] = useState('');
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal(phone); // Передаем текущий номер телефона
  };

  return (
    <footer className="bg-[#F6F4F2] p-5">
      <div className="flex items-center justify-center px-2 md:px-16 py-12 md:py-24 gap-5 pb-12 md:flex-row flex-col">
        <h2 className="text-md md:text-xl font-bold text-center self-center md:self-start">
          Оставьте заявку и мы подберем фурнитур именно для вас!
        </h2>
        <div>
          <PhoneInput
            defaultCountry="ru"
            value={phone}
            onChange={(phone) => setPhone(phone)}
          />
          <button onClick={handleOpenModal} className="btn btn-outline btn-xs sm:btn-sm md:btn-md
              w-full p-3 hover:border-white bg-[#947458] text-white border-transparent mt-2">
            Оставить заявку
          </button>
        </div>
      </div>
      <div>
        <p className="text-center text-xs md:text-sm text-gray-400">Aquawel © 2025</p>
      </div>
    </footer>
  );
};

export default Footer;