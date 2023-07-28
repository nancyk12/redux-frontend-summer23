// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateBlog, selectBlogById } from './blogSlice';
// import { useParams } from 'react-router-dom';

// const EditBlog = () => {
//   const { blogId } = useParams(); // Move this statement before the useSelector hook
//   const blog = useSelector((state) => selectBlogById(state, blogId));
//   const dispatch = useDispatch();
//   const [title, setTitle] = useState('');
//   const [text, setText] = useState('');
//   const [author, setAuthor] = useState('');

//   useEffect(() => {
//     if (blog) {
//       setTitle(blog.title || ''); // Handle cases where blog.title is undefined
//       setText(blog.text || ''); // Handle cases where blog.text is undefined
//       setAuthor(blog.author || ''); // Handle cases where blog.author is undefined
//     }
//   }, [blog]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Prepare the updated blog object
//     const updatedBlog = {
//       _id: blogId,
//       title,
//       text,
//       author,
//     };

//     // Dispatch the updateBlog action
//     dispatch(updateBlog(updatedBlog));
//   };

//   if (!blog) {
//     // Handle the case where blog is not available yet
//     return <div>Loading...</div>;
//   }

  

//   return (
//     <div>
//       <h2>Edit Blog</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="title">Title</label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="text">Text</label>
//           <textarea
//             id="text"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="author">Author</label>
//           <input
//             type="text"
//             id="author"
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// };

// export default EditBlog;


import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectBlogById, updateBlog, deleteBlog } from './blogSlice'
import { useParams, useNavigate, Link } from 'react-router-dom'

//import { selectAllUsers } from "../users/usersSlice";

const EditBlogForm = () => {
    const { blogId } = useParams(); // Move this statement before the useSelector hook

    const blog = useSelector((state) => selectBlogById(state, blogId));
    const navigate = useNavigate()

    // const post = useSelector((state) => selectBlogById(state, Number(blogId)))
    // const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(blog.title)
    const [text, setText] = useState(blog.text)
    //const [author, setAuthor] = useState(blog.userId)
    const [author, setAuthor] = useState(blog.author)
    const [requestStatus, setRequestStatus] = useState('idle')

    const dispatch = useDispatch()

    if (!blog) {
        return (
            <section>
                <h2>Blog not found!</h2>
            </section>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onAuthorChanged = e => setAuthor(e.target.value)

    //const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';
    const canSave = [title, text, author].every(Boolean) && requestStatus === 'idle';

    const onSaveBlogClicked = () => {
        if (canSave) {
            try {
                setRequestStatus('pending')
                //dispatch(updatePost({ id: post.id, title, text, userId, reactions: post.reactions })).unwrap()
                dispatch(updateBlog({ id: blog.id, title, text, author, reactions: blog.reactions })).unwrap()

                setTitle('')
                setText('')
                setAuthor('')
                //navigate(`/blogs/get-one-blog/${blogId}`)
                navigate(`/new-blogs`)
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    // const usersOptions = users.map(user => (
    //     <option
    //         key={user.id}
    //         value={user.id}
    //     >{user.name}</option>
    // ))

    const onDeleteBlogClicked = () => {
        try {
            setRequestStatus('pending')
            dispatch(deleteBlog({ id:blog.id })).unwrap()

            setTitle('')
            setText('')
            setAuthor('')
            navigate('/new-blogs')
        } catch (err) {
            console.error('Failed to delete the blog', err)
        } finally {
            setRequestStatus('idle')
        }
    }

    return (
        <div className="section">
            <h2>Edit Blog</h2>
            <form>
                <label htmlFor="blogTitle">Blog Title:</label>
                <input
                    type="text"
                    id="blogTitle"
                    name="blogTitle"
                    value={title}
                    onChange={onTitleChanged}
                />

                {/* <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select> */}

                <label htmlFor="blogText">Text:</label>
                <textarea
                    id="blogText"
                    name="blogText"
                    value={text}
                    onChange={onTextChanged}
                />
               <button
                    type="button"
                    onClick={onSaveBlogClicked}
                    // disabled={!canSave}
                >
                    Save Blog
                </button>

                <button className="deleteButton"
                    type="button"
                    onClick={onDeleteBlogClicked}
                >
                    Delete Blog
                </button>
            </form>
        </div>
    )
}

export default EditBlogForm