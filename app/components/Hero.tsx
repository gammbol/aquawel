import React from 'react';

const Hero = () => {
  return (
    <div className="bg-[url(/hero-bg.jpg)]">
      <div className="bg-black/30 backdrop-blur-2xl w-full h-full">
        <div className="max-w-5xl mx-auto py-72">
          <h1 className="text-7xl text-white mb-5">Компания Aquawel</h1>
          <p className="text-gray-100 mb-10">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <div className="flex gap-5">
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl bg-[#947458] text-white border-0">Магазин</button>
            <button
              className="btn btn-outline btn-xs sm:btn-sm md:btn-md lg:btn-lg
              xl:btn-xl text-white hover:bg-[#947458]">
              Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;