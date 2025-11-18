import React from 'react';
import FeedbackCard from "@/app/components/FeedbackCard";

const Feedback = () => {
  const revTexts : string[] = [
    "Обычно я не пишу такие развернутые отзывы. " +
    "Но тут прям не могу не поделиться. Мне просто взяли и сделали ровно то что я хотел. " +
    "Вот прям именно на все 100%, учтены ВСЕ МЕЛОЧИ. Сделали РОВНО ТО ЧТО Я ХОТЕЛ. " +
    "Я просто в восторге. Качество очень хорошее. По срокам все отлично. Сделали/доставили, установили. " +
    "Все четко. Обязательно буду заказывать еще мебель в ванну к этой компании. Обращайтесь, не пожалеете.",

    "Заказывали комплект в ванную (шкаф пенал, тумба с раковиной+пенал стекло) остались всем довольны, " +
    "качество отличное, исполнение порадовало!",

    "Что сказать, выполнено все идеально. Точно так, как было задумано. Качество великолепное. " +
    "Просто воплощенные в реальность рисунки.  Установщики ребята отличные, знают свое дело, все установили без проблем.",

    "Прошло уже более двух месяцев как мы пользуемся тумбой с раковиной. " +
    "Решила написать отзыв . Мы в восторге . Она идеальна.  " +
    "Такая как я себе её представляла. " +
    "Получилась точно как по моим требованиям. " +
    "Все детали обсуждались. " +
    "Вплоть до выбора формы и дизайна ручек. " +
    "Качественная. Дизайн единственный - больше такой нет ни у кого. Мастер приехал - установил. " +
    "Мы довольны . Фабрику мебели для ванной рекомендую.",

    "Долго выбирали. К сожалению из готовых вариантов не смогли подобрать. " +
    "Обратились сюда. Здесь устроила стоимость и срок поставки. И по дизайну сделали очень интересный вариант.  " +
    "К качеству вообще вопросов нет.  Рекомендую компанию."
  ];

  return (
    <div className="py-16">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-15">Отзывы покупателей</h2>

      {/* Desktop: 3 карточки в ряд с ограниченной шириной */}
      <div className="hidden lg:block">
        <div className="carousel w-full p-2">
          <div id="slide1" className="carousel-item relative w-full">
            <div className="flex gap-6 w-full justify-center px-16 max-w-7xl mx-auto items-stretch">
              <div className="w-80"> {/* Фиксированная ширина 320px */}
                <FeedbackCard name="Алексей" stars={5} message={revTexts[0]} photoPath={"/rev1.webp"} />
              </div>
              <div className="w-80">
                <FeedbackCard name="Дарья" stars={5} message={revTexts[1]} photoPath={"/rev2.webp"} />
              </div>
              <div className="w-80">
                <FeedbackCard name="Олег" stars={5} message={revTexts[2]} photoPath={"/rev3.webp"} />
              </div>
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide2" className="btn btn-circle">❮</a>
              <a href="#slide2" className="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <div className="flex gap-6 w-full justify-center px-16 max-w-7xl mx-auto items-stretch">
              <div className="w-80">
                <FeedbackCard name="Юля" stars={5} message={revTexts[3]} photoPath={"/rev4.webp"} />
              </div>
              {/* Можно добавить больше карточек для следующих слайдов */}
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide1" className="btn btn-circle">❮</a>
              <a href="#slide1" className="btn btn-circle">❯</a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: 1 карточка с ограниченной шириной */}
      <div className="lg:hidden">
        <div className="carousel w-full">
          <div id="mob-slide1" className="carousel-item relative w-full">
            <div className="w-full flex justify-center px-8">
              <div className="w-full max-w-md"> {/* Ограничиваем максимальную ширину */}
                <FeedbackCard name="Алексей" stars={5} message={revTexts[0]} photoPath={"/rev1.webp"} />
              </div>
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#mob-slide4" className="btn btn-circle">❮</a>
              <a href="#mob-slide2" className="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="mob-slide2" className="carousel-item relative w-full">
            <div className="w-full flex justify-center px-8">
              <div className="w-full max-w-md">
                <FeedbackCard name="Дарья" stars={5} message={revTexts[1]} photoPath={"/rev2.webp"} />
              </div>
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#mob-slide1" className="btn btn-circle">❮</a>
              <a href="#mob-slide3" className="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="mob-slide3" className="carousel-item relative w-full">
            <div className="w-full flex justify-center px-8">
              <div className="w-full max-w-md">
                <FeedbackCard name="Олег" stars={5} message={revTexts[2]} photoPath={"/rev3.webp"} />
              </div>
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#mob-slide2" className="btn btn-circle">❮</a>
              <a href="#mob-slide4" className="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="mob-slide4" className="carousel-item relative w-full">
            <div className="w-full flex justify-center px-8">
              <div className="w-full max-w-md">
                <FeedbackCard name="Юля" stars={5} message={revTexts[3]} photoPath={"/rev4.webp"} />
              </div>
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#mob-slide3" className="btn btn-circle">❮</a>
              <a href="#mob-slide1" className="btn btn-circle">❯</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;