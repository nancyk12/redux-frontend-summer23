import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login, resetStatus } from '../redux/usersSlice';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Login.css';

export default function Login() {
  const users = useSelector((state) => state.users);
  const status = useSelector((state) => state.users.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (status === 'fulfilled') {
      dispatch(resetStatus());
      navigate('/', { replace: true });
    }
  }, [status]);

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = React.useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let userObj = {
      email: data.get('email'),
      password: data.get('password'),
      isRemember: isChecked,
    };

    dispatch(login(userObj));
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-form-heading">Login</h1>
        <form onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            required
            id="email"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
            autoFocus
            className="login-input-field"
          />

         <div className="login-password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              id="password"
              name="password"
              placeholder="Password"
              className="login-input-field"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="login-password-toggle-button"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>
          <label htmlFor="remember" className="login-checkbox-label">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              id="remember"
              name="remember"
              className="login-checkbox-input"
            />
            Remember me
          </label>
          <button
            type="submit"
            className={`login-submit-button ${status === 'pending' ? 'loading' : ''}`}
          >
            {status === 'pending' ? (
              <CircularProgress size={24} className="login-loading-spinner" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        <div className="login-links">
          <Link href="#" className="login-link">
            Forgot password?
          </Link>
          <Link to="/register" className="login-link">
            Don't have an account? Register Here!
          </Link>
        </div>
      </div>
    </div>
  );
}



// import React, { useState } from 'react';
// import IconButton from '@mui/material/IconButton';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import {useDispatch, useSelector} from 'react-redux'
// import { login, resetStatus } from '../redux/usersSlice'
// import { CircularProgress } from '@mui/material';
// import {redirect, useNavigate} from 'react-router-dom'


// export default function Login() {
//   const users = useSelector(state => state.users)
//   const status = useSelector(state => state.users.status)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   React.useEffect(() => {
//     if ( status === 'fulfilled' ) {
//       dispatch(resetStatus())
//       navigate('/', {replace: true})
//     }
//   }, [status])

//   const [showPassword, setShowPassword] = useState(false);
//   const [isChecked, setIsChecked] = React.useState(true)
  

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     // console.log({
//     //   email: data.get('email'),
//     //   password: data.get('password'),
//     // });

//     //frontend handling the remember me
//     // let userObj = {
//     //   email: data.get('email'),
//     //   password: data.get('password'),
//     // };

//     // dispatch(login({
//     //   userObj: userObj,
//     //   isRemember: isChecked
//     // }))

//     //handle remember me in the backend
//     let userObj = {
//       email: data.get('email'),
//       password: data.get('password'),
//       isRemember: isChecked
//     };

//     dispatch(login(userObj))

//   };

//   return (

//       <Container component="main" maxWidth="xs">

//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Login
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type={showPassword ? 'text' : 'password'}
//               id="password"
//               autoComplete="current-password"
//               InputProps={{
//                 endAdornment: (
//                   <IconButton
//                     onClick={() => setShowPassword(!showPassword)}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 ),
//               }}
//             />
//             <FormControlLabel
//               control={
//               <Checkbox 
//                 checked={isChecked} 
//                 onChange={() => setIsChecked(!isChecked)} 
//                 name="remember" 
//                 color="primary" />
//               }
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             > { (status === 'pending') ? <CircularProgress /> : 'Sign In' }
             
              
//             </Button>
//             <Grid container>
//               <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link href="/register" variant="body2">
//                  Don't have an account? Register Here!
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>

//       </Container>

//   );
// }