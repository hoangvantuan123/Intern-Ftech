import React from 'react'
import image1 from '../file/img/1.png'
import image2 from '../file/img/2.png'
export default function OfferBanner() {
    return (
        <div className=' h-[400px] flex  mt-[100px]  gap-8  place-content-center'>
            <div>
                <img src={image1} alt="" className='w-[500px]' />
            </div>
            <div>
                <img src={image2} alt="" className=' w-[500px]' />
            </div>
        </div>
    )
}
