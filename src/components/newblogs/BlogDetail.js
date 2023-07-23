import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.blogs.find((blog) => blog.id === id)
  );

  if (!blog) {
    return <div>Not found! Fix your code, Nancy!...</div>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>Author: {blog.author}</p>
      <p>{blog.text}</p>
    </div>
  );
};

export default BlogDetail;