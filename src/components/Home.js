import { Box, Container, Typography, Button } from '@mui/material'
import React from 'react'

const Home = () => {
  return (
    <Container maxWidth='lg'>
        <Box>
            <Typography variant='h1'>
                Please Login
            </Typography>
        </Box>
        <Button variant="contained" href="/login">Login</Button>
        <Button variant="contained" href="/register">Register</Button>

    </Container>
  )
}

export default Home
