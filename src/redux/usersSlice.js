import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import Axios from '../lib/Axios'

//thunk middleware
//createAsyncThunk, first parameter is the action.type, then the function
// the function takes in the payload data from the dispatch
export const registerUser = createAsyncThunk('user/registerUser', async payloadData => {
        // call to the API/backend
        let response = await Axios.post('/register', payloadData)

        //return, sets action.payload
        return {  
            user: response.data //--> action.payload.user = response.data
        }
        // breaks down to
        // dispatch {
        //     type: 'user/registerUser',
        //     payload: {user:response.data}
        // }
    
})

export const usersSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        password: ''
    },
    //syncronous set state
    reducers: {

    },
    //asycronous set state
    extraReducers: builder => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state = action.payload.user
            })
            .addCase(registerUser.rejected, () => {
                console.log('!@-------registerUser Error!-------@!')
            })
    }
 })

 export const {} = usersSlice.actions

 export default usersSlice.reducer