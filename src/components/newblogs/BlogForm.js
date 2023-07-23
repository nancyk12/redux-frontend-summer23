import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewBlog } from './blogSlice';
import "../posts/Blogs.css";

const BlogForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewBlog({ title, text, author }));
    setTitle('');
    setText('');
    setAuthor('');
  };

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="text">Text</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BlogForm;

// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { createBlog } from './blogsSlice';

// const BlogForm = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     author: '',
//     text: '',
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createBlog(formData));
//     navigate('/');
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   return (
//     <div>
//       <h1>Create a New Blog</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="title">Title:</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="author">Author:</label>
//           <input
//             type="text"
//             id="author"
//             name="author"
//             value={formData.author}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="text">Text:</label>
//           <textarea
//             id="text"
//             name="text"
//             value={formData.text}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">Create Blog</button>
//       </form>
//     </div>
//   );
// };

// export default BlogForm;







