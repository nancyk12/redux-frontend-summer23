// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateBlog } from './blogSlice';

// const EditBlog = ({ blogId }) => {
//   const blog = useSelector((state) => selectBlogById(state, blogId));
//   const dispatch = useDispatch();
//   const [title, setTitle] = useState(blog.title);
//   const [text, setText] = useState(blog.text);
//   const [author, setAuthor] = useState(blog.author);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateBlog({ id: blog.id, title, text, author }));
//   };

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
import { useParams, useNavigate } from 'react-router-dom'

//import { selectAllUsers } from "../users/usersSlice";

const EditBlogForm = () => {
    const { blogId } = useParams()
    const navigate = useNavigate()

    const post = useSelector((state) => selectBlogById(state, Number(blogId)))
    // const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(blog?.title)
    const [content, setContent] = useState(blog?.body)
    //const [userId, setUserId] = useState(post?.userId)
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
                //dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions })).unwrap()
                dispatch(updateBlog({ id: blog.id, title, body: text, author, reactions: blog.reactions })).unwrap()

                setTitle('')
                setText('')
                setAuthor('')
                navigate(`/blog/${blogId}`)
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
            dispatch(deleteBlog({ id: post.id })).unwrap()

            setTitle('')
            setText('')
            setAuthor('')
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the post', err)
        } finally {
            setRequestStatus('idle')
        }
    }

    return (
        <section>
            <h2>Edit Post</h2>
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
                    disabled={!canSave}
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
        </section>
    )
}

export default EditBlogForm