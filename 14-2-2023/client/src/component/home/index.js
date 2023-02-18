import * as  React from 'react'
import NavBar from '../navbar'
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { Button } from '@mui/material';

export default function Home() {

  return (
    <div>
      <NavBar />
      <section >
        <div
          className="mx-auto max-w-screen-xl px-4 py-32 lg:flex  lg:items-center"
        >
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
