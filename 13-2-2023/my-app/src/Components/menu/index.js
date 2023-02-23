import React from 'react'
export default function NavMenu() {
    return (
        <div>
            <header aria-label="Site Header" className="bg-white">
                <div
                    className="mx-auto flex h-16 max-w-screen-xl items-center  gap-16 px-4 sm:px-6 lg:px-8"
                >
                    <h1>
                        <a className="block text-teal-600 text-lg" href="/">
                            Logo
                        </a>
                    </h1>

                    <div className="flex flex-1 items-center justify-end md:justify-between">
                        <nav aria-label="Site Nav" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
                                        Home
                                    </a>
                                </li>

                                <li>
                                    <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
                                        About
                                    </a>
                                </li>

                                <li>
                                    <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
                                        Pages
                                    </a>
                                </li>

                                <li>
                                    <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
                                        Shop
                                    </a>
                                </li>

                                <li>
                                    <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
                                        Projects
                                    </a>
                                </li>

                                <li>
                                    <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
                                        News
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <div className="flex items-center gap-4">
                            <form>
                                <label for="default-search" class="mb-1 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    </div>
                                    <input type="search" id="default-search" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300  rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search ..." required />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </header>
            <section
                className="overflow-hidden  bg-[url('https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] bg-i bg-cover bg-center bg-no-repeat"
            >
                <div className="bg-black/25 p-8 md:p-12 lg:px-16 lg:py-24">
                    <div className="max-w-lg text-center sm:text-left">
                        <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
                            Choose the best
                            healthier way
                            of life
                        </h2>
                        <p
                            className="hidden max-w-md text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed"
                        >
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
                            officia corporis quasi doloribus iure architecto quae voluptatum beatae
                            excepturi dolores.
                        </p>

                        <div className="mt-4 sm:mt-8 ">
                            <a
                                href="#"
                                className="inline-flex items-center rounded-full bg-[#EFD372] px-8 py-3 text-white shadow-lg transition focus:outline-none focus:ring"
                            >
                                <span className="text-sm font-medium"> Explore Now</span>

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
