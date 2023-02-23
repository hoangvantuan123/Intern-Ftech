import React from 'react'
import image3 from '../file/img/Photo.png'
import icon1 from '../file/img/Icon.png'
import icon2 from '../file/img/Icon2.png'
export default function About() {
    return (
        <div>
            <section class="overflow-hidden  bg-[#F9F8F8] sm:grid sm:grid-cols-2">
                <img
                    alt="Student"
                    src={image3}
                    class="h-56 w-full object-cover sm:h-full"
                />
                <div class="p-8 md:p-12 lg:px-16 lg:py-24">
                    <div class="mx-auto max-w-xl text-center sm:text-left">
                        <h2 class="text-2xl font-bold text-gray-900 md:text-3xl">
                            We Believe in Working
                            Accredited Farmers
                        </h2>

                        <p class="hidden text-gray-500 md:mt-4 md:block">
                            Simply dummy text of the printing and typesetting industry. Lorem had ceased to
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
                        </p>

                        <div class="mt-4 md:mt-8">

                            <div className='flex gap-2'>
                                <img src={icon1} alt="" className='w-[70px] h-[70px]' />
                                <div>
                                    <h4 className=' font-bold text-[20px]'>Organic Foods Only</h4>
                                    <p className='max-w-[400px]'>Simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>

                                </div>
                            </div>
                            <div className='flex gap-2 mt-5'>
                                <img src={icon2} alt="" className='w-[70px] h-[70px]' />
                                <div>
                                    <h4 className='  font-bold text-[20px]'>Organic Foods Only</h4>
                                    <p className='max-w-[400px]'>Simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-8 ">
                            <a
                                href="#"
                                className="inline-flex items-center rounded-xl bg-[#274C5B] px-8 py-3 text-white shadow-lg transition focus:outline-none focus:ring"
                            >
                                <span className="text-sm font-medium"> Shop Now</span>

                                <svg
                                    className="ml-3 h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>


            </section>

        </div>
    )
}
