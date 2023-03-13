import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPostBySlug } from '../../slices/postSlices';

export default function ShowPost() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  console.log('slug', posts)

  useEffect(() => {
    dispatch(fetchPostBySlug(slug));
  }, [dispatch, slug]);


  return (
    <div>
      {posts.loading && <p>Loading post...</p>}
      {posts.error && <p>{posts.error}</p>}
      <>
        {posts.image_path && <img src={posts.image_path} alt="Post image" />}
        <h1>{posts.title}</h1>
        <p>{posts.content}</p>
      </>
    </div>
  )
}