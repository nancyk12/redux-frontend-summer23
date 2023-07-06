import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { registerUser, resetStatus } from '../redux/usersSlice'
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { registrationValidator } from '../lib/validator';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Login.css';

export default function Register() {

  const users = useSelector( state => state.users)
  const status = useSelector( state => state.users.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (status === 'fulfilled') {
      dispatch(resetStatus())
      navigate("/login", {replace: true})
    }
  })
  const [showPassword, setShowPassword] = useState(false);
  const [pwdMatch, setPwdMatch] = useState({
    error: false,
    message: ''
  })
  
  const [isValid, setIsValid] = useState({
    firstname: {error: false, message: ''},
    lastname: {error: false, message: ''},
    email: {error: false, message: ''},
    password: {error: false, message: ''},
  })



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    let userObj = {
      firstname: data.get('firstName'),
      lastname: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    };

    let isErrors = false;
    
    if (userObj.password !== data.get('password2')) {
      isErrors = true
      setPwdMatch({
        error: true,
        message: "Passwords do not Match"
      })
    } else {
      setPwdMatch({
          error: false,
          message: ''
        })
   
    }

    const validatorObj = registrationValidator(userObj)

  
    
    // iterates through the validatorObj and checks if there any errors are true
    for (const key in validatorObj) {
      if(validatorObj[key].error) {
        isErrors = true
      }
    }
    
    isErrors ? setIsValid(validatorObj)
    : 
    (userObj.password === data.get('password2')) && dispatch(registerUser(userObj))


  //  (userObj.password !== data.get('password2')) ?
  //     setPwdMatch({
  //       error: true,
  //       message: "Passwords do not Match"
  //     })
  //   :
  //     setPwdMatch({
  //         error: false,
  //         message: ''
  //       })
    

    
      
    // (userObj.password === data.get('password2')) && dispatch(registerUser(userObj))

  };


  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-form-heading">Register</h1>
        <form onSubmit={handleSubmit} noValidate>
          <input
            autoComplete="given-name"
            type="text"
            required
            id="firstName"
            label="First Name"
            name="firstName"
            placeholder="First Name"
            autoFocus
            error={isValid.firstname.error}
            helperText={isValid.firstname.message}
            className="login-input-field"
          />
          <input
            type="text"
            required
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            placeholder="Last Name"
            autoFocus
            error={isValid.lastname.error}
            helperText={isValid.lastname.message}
            className="login-input-field"
          />
          <input
            type="text"
            required
            id="email"
            label="Email Address"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
            error={isValid.email.error}
            helperText={isValid.email.message}
            className="login-input-field"
          />
          <div className="login-password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              id="password"
              name="password"
              label="Password"
              placeholder="Password"
              autoComplete="new-password"
              error={isValid.password.error}
              helperText={isValid.password.message}
              className="login-input-field"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="login-password-toggle-button"
            >
              {showPassword ? <VisibilityOff />  : <Visibility />}
            </button>
          </div>
          <input
              type='password'
              required
              id="password2"
              name="password2"
              label="Confirm Password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              error={pwdMatch.error}
              helperText={pwdMatch.message}
              className="login-input-field"
            />
          
        
          <button
            type="login-submit"
            className={`login-submit-button ${status === 'pending' ? 'loading' : ''}`}
          >
            {status === 'pending' ? (
              <CircularProgress size={24} className="login-loading-spinner" />
            ) : (
              'Register'
            )}
          </button>
        </form>
        <div className="login-links">
          <Link to="/login" className="login-link">
            Already have an account? Login Here!
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
// import { useSelector, useDispatch } from 'react-redux'
// import { registerUser, resetStatus } from '../redux/usersSlice'
// import { CircularProgress } from '@mui/material';
// import { useNavigate } from 'react-router-dom'
// import { registrationValidator } from '../lib/validator';

// export default function Register() {

//   const users = useSelector( state => state.users)
//   const status = useSelector( state => state.users.status)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   React.useEffect(() => {
//     if (status === 'fulfilled') {
//       dispatch(resetStatus())
//       navigate("/login", {replace: true})
//     }
//   })
//   const [showPassword, setShowPassword] = useState(false);
//   const [pwdMatch, setPwdMatch] = useState({
//     error: false,
//     message: ''
//   })
  
//   const [isValid, setIsValid] = useState({
//     firstname: {error: false, message: ''},
//     lastname: {error: false, message: ''},
//     email: {error: false, message: ''},
//     password: {error: false, message: ''},
//   })



//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
    
//     let userObj = {
//       firstname: data.get('firstName'),
//       lastname: data.get('lastName'),
//       email: data.get('email'),
//       password: data.get('password'),
//     };

//     let isErrors = false;
    
//     if (userObj.password !== data.get('password2')) {
//       isErrors = true
//       setPwdMatch({
//         error: true,
//         message: "Passwords do not Match"
//       })
//     } else {
//       setPwdMatch({
//           error: false,
//           message: ''
//         })
   
//     }

//     const validatorObj = registrationValidator(userObj)

  
    
//     // iterates through the validatorObj and checks if there any errors are true
//     for (const key in validatorObj) {
//       if(validatorObj[key].error) {
//         isErrors = true
//       }
//     }
    
//     isErrors ? setIsValid(validatorObj)
//     : 
//     (userObj.password === data.get('password2')) && dispatch(registerUser(userObj))


//   //  (userObj.password !== data.get('password2')) ?
//   //     setPwdMatch({
//   //       error: true,
//   //       message: "Passwords do not Match"
//   //     })
//   //   :
//   //     setPwdMatch({
//   //         error: false,
//   //         message: ''
//   //       })
    

    
      
//     // (userObj.password === data.get('password2')) && dispatch(registerUser(userObj))

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
//             Register
//           </Typography>
//           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   autoComplete="given-name"
//                   name="firstName"
//                   required
//                   fullWidth
//                   id="firstName"
//                   label="First Name"
//                   autoFocus
//                   // error={true}
//                   error={isValid.firstname.error}
//                   // helperText="Firstname is blank"
//                   helperText={isValid.firstname.message}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="lastName"
//                   label="Last Name"
//                   name="lastName"
//                   autoComplete="family-name"
//                   error={isValid.lastname.error}
//                   helperText={isValid.lastname.message}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="Email Address"
//                   name="email"
//                   autoComplete="email"
//                   error={isValid.email.error}
//                   helperText={isValid.email.message}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type={showPassword ? 'text' : 'password'}
//                   id="password"
//                   autoComplete="new-password"
//                   error={isValid.password.error}
//                   helperText={isValid.password.message}
//                   InputProps={{
//                     endAdornment: (
//                       <IconButton
//                         onClick={() => setShowPassword(!showPassword)}
//                         edge="end"
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     ),
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password2"
//                   label="Confirm Password"
//                   type="password"
//                   id="password2"
//                   autoComplete="new-password"
//                   error={pwdMatch.error}
//                   helperText={pwdMatch.message}
//                 />
//               </Grid>
//               {/* <Grid item xs={12}>
//                 <FormControlLabel
//                   control={<Checkbox value="allowExtraEmails" color="primary" />}
//                   label="I want to receive inspiration, marketing promotions and updates via email."
//                 />
//               </Grid> */}
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               {(status === 'pending') ? <CircularProgress /> : "Register" }
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Link href="/login" variant="body2">
//                   Already have an account? Login here!
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>

//       </Container>

//   );
// }