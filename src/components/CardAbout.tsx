import React from 'react';

const CardAbout = (props :any) => {
  const { children } = props;
  return <div className="w-36 p-1 h-32 -mt-3 bg-white overflow-hidden text-black flex flex-col justify-center items-center text-center rounded-md hover:scale-110 transition hover:-translate-y-1 duration-300">{children}</div>;
};

export default CardAbout;
