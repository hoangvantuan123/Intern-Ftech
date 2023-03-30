import React, { useState, useEffect } from 'react';
import NavBar from '../navbar';
export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://freeapi.code4func.com/api/v1')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);
  console.log('data', data)
  return (
    <div>
      <NavBar />
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
