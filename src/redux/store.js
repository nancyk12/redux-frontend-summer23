import {configureStore} from '@reduxjs/toolkit'
//import reducers/slice here
import usersReducer from './usersSlice'
import authReducer from './authSlice'
import counterReducer from './counterSlice'
// import postsReducer from '../components/posts/postsSlice'
import blogReducer from '../components/newblogs/blogSlice'

export default configureStore({
    reducer: {
        users: usersReducer,
        auth: authReducer,
        counter: counterReducer,
        // posts: postsReducer,
        blogs: blogReducer
    }
})