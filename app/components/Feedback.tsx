import React from 'react';
import FeedbackCard from "@/app/components/FeedbackCard";

const Feedback = () => {
  return (
    <div className="py-16 bg-[#F6F4F2]">
      <h2 className="text-5xl text-center mb-15">Отзывы покупателей</h2>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <FeedbackCard name="Пидор Паркер" stars={5} message="теперь могу срать с кайфом" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <FeedbackCard name="Мамут Рахал" stars={1} message="хуйня"/>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <FeedbackCard name="Схуяли Ято" stars={4} message="раньше мыл жопу в раковине Икеи  теперь могу дома :)" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide4" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <FeedbackCard name="Мама Твоя" stars={1} message="меня там ебали..." />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">❮</a>
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;