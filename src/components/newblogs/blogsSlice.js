// import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
// import { sub } from 'date-fns';
// import Axios from '../../lib/Axios';

// const initialState = {
//     posts: [],
//     status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
//     error: null
// }

// export const fetchBlogs = createAsyncThunk('/blogs/fetchBlogs', async () => {
//     const response = await Axios.get('/blogs/all-blogs');
//     return response.data
// })

// export const addNewBlog = createAsyncThunk('blogss/addNewBlog', async (initialPost) => {
//     const response = await Axios.post('/blogs/create-blog', initialPost)
//     return response.data
// })

// export const updateBlog = createAsyncThunk('blogs/updateBlog', async (initialPost) => {
//     const { id } = initialPost;
//     try {
//         const response = await Axios.put(`/blogs/update-by-id$/${id}`, initialPost)
//         return response.data
//     } catch (err) {
//         //return err.message;
//         return initialPost; // only for testing Redux!
//     }
// })

// export const deleteBlog = createAsyncThunk('/blogs/deleteBlog', async (initialPost) => {
//     const { id } = initialPost;
//     try {
//         const response = await Axios.delete(`/blogs/delete-by-id/${id}`)
//         if (response?.status === 200) return initialPost;
//         return `${response?.status}: ${response?.statusText}`;
//     } catch (err) {
//         return err.message;
//     }
// })

// const postsSlice = createSlice({
//     name: 'posts',
//     initialState,
//     reducers: {
//         postAdded: {
//             reducer(state, action) {
//                 state.posts.push(action.payload)
//             },
//             prepare(title, content, /*userId*/) {
//                 return {
//                     payload: {
//                         id: nanoid(),
//                         title,
//                         content,
//                         date: new Date().toISOString(),
//                         // userId,
//                         reactions: {
//                             thumbsUp: 0,
//                             wow: 0,
//                             heart: 0,
//                             rocket: 0,
//                             coffee: 0
//                         }
//                     }
//                 }
//             }
//         },
//         reactionAdded(state, action) {
//             const { blogId, reaction } = action.payload
//             const existingBlog = state.blogs.find(blog => blog.id === blogId)
//             if (existingBlog) {
//                 existingBlog.reactions[reaction]++
//             }
//         }
//     },
//     extraReducers(builder) {
//         builder
//             .addCase(fetchBlogs.pending, (state, action) => {
//                 state.status = 'loading'
//             })
//             .addCase(fetchBlogs.fulfilled, (state, action) => {
//                 state.status = 'succeeded'
//                 // Adding date and reactions
//                 let min = 1;
//                 const loadedBlogs = action.payload.map(blog => {
//                     blog.date = sub(new Date(), { minutes: min++ }).toISOString();
//                     blog.reactions = {
//                         thumbsUp: 0,
//                         wow: 0,
//                         heart: 0,
//                         rocket: 0,
//                         coffee: 0
//                     }
//                     return blog;
//                 });

//                 // Add any fetched posts to the array
//                 state.blogs = state.blogs.concat(loadedBlogs)
//             })
//             .addCase(fetchBlogs.rejected, (state, action) => {
//                 state.status = 'failed'
//                 state.error = action.error.message
//             })
//             .addCase(addNewBlog.fulfilled, (state, action) => {
//                 // Fix for API post IDs:
//                 // Creating sortedPosts & assigning the id 
//                 // would be not be needed if the fake API 
//                 // returned accurate new post IDs
//                 const sortedBlogs = state.blogs.sort((a, b) => {
//                     if (a.id > b.id) return 1
//                     if (a.id < b.id) return -1
//                     return 0
//                 })
//                 action.payload.id = sortedBlogs[sortedBlogs.length - 1].id + 1;
//                 // End fix for fake API post IDs 

//                 // action.payload.userId = Number(action.payload.userId)
//                 action.payload.date = new Date().toISOString();
//                 action.payload.reactions = {
//                     thumbsUp: 0,
//                     wow: 0,
//                     heart: 0,
//                     rocket: 0,
//                     coffee: 0
//                 }
//                 console.log(action.payload)
//                 state.blogs.push(action.payload)
//             })
//             .addCase(updateBlog.fulfilled, (state, action) => {
//                 if (!action.payload?.id) {
//                     console.log('Update could not complete')
//                     console.log(action.payload)
//                     return;
//                 }
//                 const { id } = action.payload;
//                 action.payload.date = new Date().toISOString();
//                 const blogs = state.blogs.filter(blog => blog.id !== id);
//                 state.blogs = [...blogs, action.payload];
//             })
//             .addCase(deleteBlog.fulfilled, (state, action) => {
//                 if (!action.payload?.id) {
//                     console.log('Delete could not complete')
//                     console.log(action.payload)
//                     return;
//                 }
//                 const { id } = action.payload;
//                 const blogs = state.blogs.filter(blog => blog.id !== id);
//                 state.blogs = blogs;
//             })
//     }
// })

// export const selectAllBlogs = (state) => state.blogs.posts;
// export const getBlogsStatus = (state) => state.blogs.status;
// export const getBlogsError = (state) => state.blogs.error;

// export const selectPostById = (state, blogId) =>
//     state.blogs.blogs.find(blog => blog.id === blogId);

// export const { blogAdded, reactionAdded } = blogsSlice.actions

// export default blogsSlice.reducer