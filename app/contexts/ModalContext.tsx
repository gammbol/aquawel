// contexts/ModalContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  isModalOpen: boolean;
  openModal: (phone?: string) => void;
  closeModal: () => void;
  initialPhone: string;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialPhone, setInitialPhone] = useState('');

  const openModal = (phone?: string) => {
    if (phone) {
      setInitialPhone(phone); // Устанавливаем переданный номер
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setInitialPhone(''); // Очищаем при закрытии
  };
  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, initialPhone }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};