import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../slices/postSlices';
import { useNavigate } from 'react-router-dom';
import io from "socket.io-client";

import './app.css'

function PostListPage() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    console.log('slug', posts)
    console.log('post', posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if (posts.status === 'loading') {
        return <div>Loading posts...</div>;
    } else if (posts.status === 'failed') {
        return <div>{posts.error}</div>;
    } else {
        return (
            <div>
                <div className='max-w-screen-xl px-4 sm:px-6 lg:px-8 m-auto mt-5'>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {posts.map((post) => (
                            <article
                                key={post._id}
                                className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                            >
                                <a href={`/posts/${post.slug}`}>
                                    <img
                                        alt="Office"
                                        src={post.image_url}
                                        className="h-56 w-full object-cover rounded-xl"
                                    />

                                    <div className=" text-left p-4 sm:p-6">
                                        <a href="#">
                                            <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                                        </a>

                                        <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3">{post.description}</p>
                                        <span>{'# ' + post.category}</span>
                                        <br />
                                        <a
                                            href="#"
                                            className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
                                        >
                                            Find out more

                                            <span
                                                aria-hidden="true"
                                                className="block transition group-hover:translate-x-0.5"
                                            >
                                                &rarr;
                                            </span>
                                        </a>
                                    </div>
                                </a>
                            </article>
                        ))}
                    </div>
                </div>
                <div className='p-5'></div>

                <div className="max-w-md w-full mx-auto">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md">
                        <div className="p-4 flex  items-center">
                            <img className="h-full w-10 rounded-full object-cover mr-2" src="https://picsum.photos/50" alt="" />
                            <div className="px-2 overflow-hidden text-left">
                                <div>
                                    <h2 className="text-base font-medium text-gray-800">John Doe</h2>
                                </div>
                                <div className="text-sm text-gray-600 an">
                                    <p classsName="an ">Hello! How can I help you today? This is a sample chat message that has been truncated to show only 2 lines. a sample chat message that has been truncated to show only 2 lines.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='p-5'></div>

            </div >
        );
    }
}

export default PostListPage;