// components/ApplicationModal.tsx
'use client';

import { useModal } from '@/app/contexts/ModalContext';
import React, { useState, useEffect } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const ApplicationModal = () => {
  const { isModalOpen, closeModal, initialPhone } = useModal();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Сбрасываем форму при закрытии/открытии модального окна
  useEffect(() => {
    if (isModalOpen) {
      setPhone(initialPhone);
      setName('');
      setEmail('');
      setError('');
    }
  }, [isModalOpen, initialPhone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Валидация полей
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError('Все поля обязательны для заполнения');
      setLoading(false);
      return;
    }

    // Простая валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Введите корректный email адрес');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          telnum: phone,
          email: email.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      // Успешная отправка
      alert('Заявка успешно отправлена!');
      closeModal();

    } catch (err) {
      console.error('Ошибка при отправке формы:', err);
      setError('Произошла ошибка при отправке заявки. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Оставить заявку</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Имя *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#947458]"
              placeholder="Ваше имя"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Телефон *
            </label>
            <PhoneInput
              defaultCountry="ru"
              value={phone}
              onChange={(phone) => setPhone(phone)}
              className="ring-black"
              inputClassName="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#947458]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Почта *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#947458]"
              placeholder="example@domain.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#947458] text-white py-3 px-4 rounded-lg shadow-xl hover:shadow-sm transition-all font-medium"
          >
            Отправить заявку
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;