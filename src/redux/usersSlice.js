import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from '../lib/Axios'
import { RemoveShoppingCartRounded } from '@mui/icons-material'

//thunk middleware
//createAsyncThunk, first parameter is the action.type, then the function
// the function takes in the payload data from the dispatch
export const registerUser = createAsyncThunk('user/registerUser', async payloadData => {
    // call to the API/backend
    let response = await Axios.post('/users/register', payloadData)

    //return, sets action.payload
    // return {
    //     data: response.data //--> action.payload.user = response.data
    // }
    // breaks down to
    // dispatch {
    //     type: 'user/registerUser',
    //     payload: {user:response.data}
    // }

    return response.data

})

export const usersSlice = createSlice({
    name: 'user',
    initialState: {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        message: ''
    },
    //syncronous set state
    // reducers: {

    // },
    //asycronous set state
    extraReducers: builder => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log(action.payload)
                // state = {
                //     email: action.payload.data.userObj.email,
                //     firstname: action.payload.data.userObj.firstname,
                //     lastname: action.payload.data.userObj.lastname,
                //     password: '',
                //     message: action.payload.data.message
                // }
                state = action.payload
            })
            .addCase(registerUser.rejected, () => {
                console.log('!@-------registerUser Error!-------@!')
            })
    }
})

//  export const {} = usersSlice.actions

export default usersSlice.reducer