import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { selectBlogById, fetchSingleBlog, selectAllBlogs} from './blogSlice';
import TimeAgo from '../posts/TimeAgo';
import BlogReactionButtons from './BlogReactionButtons';


const SingleBlogPage = () => {
  const { blogId } = useParams();

  const blog = useSelector((state) => selectAllBlogs(state).find(blog => blog.id === Number(blogId)));
  // const blog = useSelector((state) => state.blogSlice.singleBlog);
  const dispatch = useDispatch();

  useEffect(() => {
  //   dispatch(fetchSingleBlog(id));
  // }, [dispatch, id]);
  if (!blog) {
    dispatch(fetchSingleBlog(blogId));
    }
  }, [dispatch,blog, blogId]);

  if (!blog) {
    return (
      <section>
        <h2>Post not found! Work on your code, Nancy!</h2>
      </section>
    );
  }


  return (
    <article>
      <h1>{blog.title}</h1>
      <p>{blog.text}</p>
      <p className="postCredit">
         <Link to={`/blog/edit/${blog.id}`}>Edit Post</Link>
         Author: {blog.author}
        <TimeAgo timestamp={blog.createAt}/>
      </p>
      <BlogReactionButtons blog={blog}/>
    </article>
  );
};

export default SingleBlogPage;