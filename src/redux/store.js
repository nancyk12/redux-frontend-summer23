import {configureStore} from '@reduxjs/toolkit'
//import reducers/slice here
import usersReducer from './usersSlice'

export default configureStore({
    reducer: {
        users: usersReducer
    }
})