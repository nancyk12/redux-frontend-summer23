import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchSingleBlog, selectBlogById, getBlogsStatus, getBlogsError } from './blogSlice';
import TimeAgo from '../posts/TimeAgo';
import BlogReactionButtons from './BlogReactionButtons';

const SingleBlogPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleBlog(id));
  }, [dispatch, id]);

const singleBlog = useSelector((state) => selectBlogById(state, id));
const status = useSelector(getBlogsStatus);
const error = useSelector(getBlogsError);

  if (status === 'loading') {
  return <div className="section" >Loading...</div>;
  }

  if (error) {
  return <div className="section">Error: {error}</div>;
  }

  if (!singleBlog) {
  return  <div className="section">
            <h2>Post not found! Work on your code, Nancy!</h2>
          </div>
  }


  return (
    <div className="artlicle">
      <h1>{singleBlog.title}</h1>
      <p>{singleBlog.text}</p>
      <p className="postCredit">
         {/* <Link to={`/edit/${SingleBlog._id}`}>Edit Post</Link> */}
         Author: {singleBlog.author}
        <TimeAgo timestamp={singleBlog.createAt}/>
      </p>
      <Link to={`/edit/${singleBlog.id}`}>Edit Blog</Link> {/* Add link to Edit Blog page */}
      <BlogReactionButtons blog={singleBlog}/>
    </div>
  );
};

export default SingleBlogPage;