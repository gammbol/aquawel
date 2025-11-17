import React from 'react';
import Image from "next/image";

const About = () => {
  return (
    <div className="mx-36 my-12 px-18 py-12 border border-[#947458] rounded-lg shadow-lg flex flex-col justify-center items-center">
      <h2 className="font-medium text-5xl mb-5">О нас</h2>
      <div className="flex items-center justify-center gap-5">
        <div>
          <Image src={"/logo.jpg"} alt={"placeholder"} width={256} height={512} />
        </div>
        <div>
          <h3>Auquawel</h3>
          мы такие то такие то
        </div>
      </div>

    </div>
  );
};

export default About;