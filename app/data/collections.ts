export type CollectionProduct = {
  id: string;
  title: string;
  category: string;
  price: number;
  images: string[];
  description: string;
  specs: string[];
};

export type FurnitureCollection = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  products: CollectionProduct[];
};

const images = {
  about: "/about.jpg",
  hero: "/hero-bg.jpg",
  rev1: "/rev1.webp",
  rev2: "/rev2.webp",
  rev3: "/rev3.webp",
  rev4: "/rev4.webp",
  rev5: "/rev5.webp",
};

export const furnitureCollections: FurnitureCollection[] = [
  {
    id: "aqua-classic",
    name: "Aqua Classic",
    subtitle: "Спокойная классика для светлых ванных комнат",
    description:
      "Коллекция для проектов, где важны мягкая геометрия, светлые фасады и универсальная компоновка под квартиры и апартаменты.",
    products: [
      {
        id: "aqua-classic-vanity-80",
        title: "Тумба Aqua Classic 80",
        category: "Тумбы",
        price: 42900,
        images: [images.about],
        description: "Подвесная тумба с двумя вместительными ящиками и влагостойким покрытием.",
        specs: ["Ширина 80 см", "МДФ с эмалью", "Направляющие с доводчиками"],
      },
      {
        id: "aqua-classic-mirror-80",
        title: "Зеркало Aqua Classic 80",
        category: "Зеркала",
        price: 24500,
        images: [images.rev1],
        description: "Лаконичное зеркало с мягкой подсветкой для ежедневного ухода.",
        specs: ["LED-подсветка", "Нейтральный свет", "Антивлаговое исполнение"],
      },
      {
        id: "aqua-classic-column-40",
        title: "Пенал Aqua Classic 40",
        category: "Пеналы",
        price: 33900,
        images: [images.rev2],
        description: "Узкий пенал для хранения полотенец, косметики и бытовых принадлежностей.",
        specs: ["Высота 160 см", "Переставные полки", "Петли с плавным закрыванием"],
      },
    ],
  },
  {
    id: "stone-line",
    name: "Stone Line",
    subtitle: "Фактура камня и строгая современная линия",
    description:
      "Серия для более премиальных интерьеров: выразительные столешницы, спокойные фасады и аккуратная архитектурная подача.",
    products: [
      {
        id: "stone-line-vanity-100",
        title: "Тумба Stone Line 100",
        category: "Тумбы",
        price: 56900,
        images: [images.hero],
        description: "Широкая тумба под накладную раковину с ровными фасадами без лишнего декора.",
        specs: ["Ширина 100 см", "Фасады МДФ", "Скрытая ручка-профиль"],
      },
      {
        id: "stone-line-top-120",
        title: "Столешница Stone Line 120",
        category: "Столешницы",
        price: 38900,
        images: [images.rev3],
        description: "Влагостойкая столешница с каменной фактурой для индивидуальных проектов.",
        specs: ["Длина 120 см", "Искусственный камень", "Под накладную раковину"],
      },
      {
        id: "stone-line-mirror-cabinet",
        title: "Зеркальный шкаф Stone Line",
        category: "Зеркальные шкафы",
        price: 35500,
        images: [images.rev4],
        description: "Шкаф с зеркальным фасадом и внутренними полками для компактного хранения.",
        specs: ["Ширина 90 см", "Внутренние полки", "Опциональная подсветка"],
      },
      {
        id: "stone-line-side",
        title: "Навесной шкаф Stone Line",
        category: "Шкафы",
        price: 28900,
        images: [images.rev5],
        description: "Дополнительный модуль хранения в той же стилистике, что и основная тумба.",
        specs: ["Подвесной монтаж", "Глубина 30 см", "Фасад в цвет коллекции"],
      },
    ],
  },
  {
    id: "warm-wood",
    name: "Warm Wood",
    subtitle: "Тёплая древесная фактура для спокойного интерьера",
    description:
      "Коллекция для санузлов, где хочется добавить натуральные оттенки, визуальное тепло и мягкий домашний характер.",
    products: [
      {
        id: "warm-wood-vanity-90",
        title: "Тумба Warm Wood 90",
        category: "Тумбы",
        price: 48900,
        images: [images.rev2],
        description: "Подвесная тумба с древесной фактурой и удобной организацией хранения.",
        specs: ["Ширина 90 см", "HPL-покрытие", "Два выдвижных ящика"],
      },
      {
        id: "warm-wood-top-100",
        title: "Столешница Warm Wood 100",
        category: "Столешницы",
        price: 32900,
        images: [images.about],
        description: "Столешница с натуральным визуальным рисунком под накладную чашу.",
        specs: ["Длина 100 см", "Влагостойкая основа", "Тёплая древесная текстура"],
      },
      {
        id: "warm-wood-column-35",
        title: "Пенал Warm Wood 35",
        category: "Пеналы",
        price: 29900,
        images: [images.rev5],
        description: "Компактный пенал для небольших помещений и проектов с ограниченной площадью.",
        specs: ["Ширина 35 см", "Закрытые секции", "Подвесной или напольный монтаж"],
      },
      {
        id: "warm-wood-shelf",
        title: "Полка Warm Wood",
        category: "Полки",
        price: 14900,
        images: [images.rev1],
        description: "Открытая полка для полотенец и декоративных аксессуаров в цвет коллекции.",
        specs: ["Длина 70 см", "Открытое хранение", "Защитное влагостойкое покрытие"],
      },
      {
        id: "warm-wood-mirror",
        title: "Зеркало Warm Wood 70",
        category: "Зеркала",
        price: 21900,
        images: [images.rev4],
        description: "Зеркало с тонкой декоративной рамой, повторяющей оттенок мебели.",
        specs: ["Ширина 70 см", "Декоративная рама", "Возможна LED-подсветка"],
      },
    ],
  },
  {
    id: "compact-city",
    name: "Compact City",
    subtitle: "Практичные решения для типовых квартир",
    description:
      "Линейка для небольших санузлов, апартаментов и проектов застройщиков, где нужно сохранить функциональность без перегруза.",
    products: [
      {
        id: "compact-city-vanity-60",
        title: "Тумба Compact City 60",
        category: "Тумбы",
        price: 34900,
        images: [images.rev3],
        description: "Компактная тумба для небольших ванных комнат и гостевых санузлов.",
        specs: ["Ширина 60 см", "Один глубокий ящик", "Подвесная установка"],
      },
      {
        id: "compact-city-mirror-60",
        title: "Зеркало Compact City 60",
        category: "Зеркала",
        price: 18900,
        images: [images.hero],
        description: "Минималистичное зеркало, которое легко вписывается в типовой интерьер.",
        specs: ["Ширина 60 см", "Тонкий профиль", "Быстрый монтаж"],
      },
      {
        id: "compact-city-cabinet",
        title: "Шкаф Compact City",
        category: "Шкафы",
        price: 21900,
        images: [images.rev2],
        description: "Навесной шкаф для дополнительного хранения без потери свободного пространства.",
        specs: ["Глубина 25 см", "Две внутренние полки", "Фасад в цвет тумбы"],
      },
    ],
  },
  {
    id: "developer-series",
    name: "Developer Series",
    subtitle: "Серия для комплексных поставок застройщикам",
    description:
      "Коллекция для оптовых задач: стабильная повторяемость, понятная комплектация и нейтральный дизайн под разные планировки.",
    products: [
      {
        id: "developer-series-set-70",
        title: "Комплект Developer 70",
        category: "Комплекты",
        price: 64900,
        images: [images.about],
        description: "Базовый комплект мебели для оснащения квартир и апартаментов.",
        specs: ["Тумба 70 см", "Раковина в комплекте", "Подходит для серийных поставок"],
      },
      {
        id: "developer-series-set-90",
        title: "Комплект Developer 90",
        category: "Комплекты",
        price: 76900,
        images: [images.rev4],
        description: "Расширенная комплектация для более просторных санузлов в жилых комплексах.",
        specs: ["Тумба 90 см", "Зеркало или шкаф на выбор", "Единая стилистика партии"],
      },
      {
        id: "developer-series-module",
        title: "Модуль хранения Developer",
        category: "Шкафы",
        price: 25900,
        images: [images.rev1],
        description: "Дополнительный модуль, который можно включать в комплекты под разные планировки.",
        specs: ["Навесной формат", "Универсальная глубина", "Возможна адаптация размеров"],
      },
      {
        id: "developer-series-mirror",
        title: "Зеркало Developer 70",
        category: "Зеркала",
        price: 17900,
        images: [images.rev5],
        description: "Простое зеркало для массового оснащения без лишнего усложнения проекта.",
        specs: ["Ширина 70 см", "Нейтральный дизайн", "Подходит для оптовых партий"],
      },
      {
        id: "developer-series-column",
        title: "Пенал Developer 40",
        category: "Пеналы",
        price: 31900,
        images: [images.rev3],
        description: "Вертикальный модуль хранения для квартир с увеличенной площадью санузла.",
        specs: ["Ширина 40 см", "Стабильная комплектация", "Петли с доводчиками"],
      },
      {
        id: "developer-series-top",
        title: "Столешница Developer 100",
        category: "Столешницы",
        price: 28900,
        images: [images.hero],
        description: "Практичная столешница для проектов, где требуется типовое решение под раковину.",
        specs: ["Длина 100 см", "Влагостойкое исполнение", "Подходит для серийного производства"],
      },
    ],
  },
];
