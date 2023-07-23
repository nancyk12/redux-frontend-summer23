import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs, selectAllBlogs } from './blogSlice';
// import { selectAllBlogs } from './blogSlice';
import TimeAgo from '../posts/TimeAgo';
import BlogReactionButtons from "./BlogReactionButtons";
import BlogForm from "./BlogForm";
import "../posts/Blogs.css";

const BlogList = () => {
// const blogs = useSelector((state) => state.blogs.blogs);
const blogs = useSelector(selectAllBlogs);
const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
    // dispatch(selectAllBlogs());
  }, [dispatch]);

  return (
    <div >
      <h1>Blog Form</h1>
      <div className="section">
        <BlogForm/>
      </div>
      <h1>Blog List</h1>
      {/* <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
        <Link to={`/blogs/get-one-blog/${blog.id}`}>{blog.title}</Link>*/}
            {/* <Link to={`/blogs/blog-detail/${blog.id}`}></Link> */}
            {/*<h2>{blog.title}</h2>
            <p>{blog.author}</p>
            <p><em>{blog.text}</em></p>
           <TimeAgo timestamp={blog.createAt} /> 
           <BlogReactionButtons blog={blog} />
          </li>
        ))}
      </ul> */}
      
      <div className="section">
      {blogs.map((blog) => (
          <div className="article" key={blog.id}>
            <h2>{blog.title}</h2>
            <p className="excerpt">{blog.text.substring(0, 75)}...</p>
            <div className="postCredit">
                <Link to={`/blogs/get-one-blog/${blog.id}`}>View Post</Link>
                <Link to={`/edit/${blog.id}`}>Edit Blog</Link>
                {/* <PostAuthor userId={post.userId} /> */}
                <span>{blog.author}</span>
                <TimeAgo timestamp={blog.createAt} />
            </div>
            <BlogReactionButtons blog={blog} />
           
        </div>
        ))}
    </div>
  </div>
  );
};

export default BlogList;
