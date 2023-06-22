import { Box, Container, Typography, Button } from '@mui/material'
import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {authCheck, logout} from '../redux/authSlice'

const Home = () => {
  const dispatch = useDispatch()
  const auth = useSelector( state => state.auth.isAuth )
  const users = useSelector( state => state.users )

  useEffect( () => {
    dispatch(authCheck())
  }, [auth])
  return (
    <Container maxWidth='lg'>
        <Box>
          
            <Typography variant='h1'>
                {auth ? <>Welcome: {users.firstname}</> : <>Please Login</> }

            </Typography>
        </Box>
        {auth ? 
          <>
          <Button variant="contained" onClick={() => dispatch(logout())}>Logout</Button>
          </>
          : 
          <>
          <Button variant="contained" href="/login">Login</Button>
          <Button variant="contained" href="/register">Register</Button>
          </>
        }
        

    </Container>
  )
}

export default Home
