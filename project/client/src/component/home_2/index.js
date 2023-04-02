import React, { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState([]);

 
  console.log('data', data)
  return (
    <div>
    
      <section >
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex  lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Hey, hello !
            </h1>
            <div className="mt-4 text-[140px] sm:leading-relaxed">
              🤔
            </div>
          </div>
        </div>
      </section>

    </div >
  )
}
