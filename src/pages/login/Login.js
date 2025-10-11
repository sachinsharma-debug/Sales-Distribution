// import React, { useState } from 'react';
// import './Login.css';
// import background from '../../assets/backgound.mp4';
// import { BASE_URL, ENDPOINTS } from '../../api/common';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);


//   console.log(username,"hcasgvcgsdvc")

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle login logic here
//     // console.log({ username, password, rememberMe });
//     console.log(BASE_URL + ENDPOINTS.LOGIN , "cnjsdbchsdbhcb")
//   };

  

//   return (
//     <div className="login-container">
//       <video
//         className="login-bg-video"
//         src={background}
//         autoPlay
//         loop
//         muted
//         playsInline
//       />
//       <div className="login-overlay"></div>
//       <div className="login-content">
//         <div className="">
//           <div className="logo">
//             <h1>Prudent 360<sup>®</sup></h1>
//           </div>
//           <div className='login-box'>
//             <div className="welcome-text">
//                 <h2>Welcome Back!</h2>
//                 <p>Sign in to continue with Prudent 360</p>
//             </div>

//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                 <label htmlFor="enterprise">Enterprise</label>
//                 <input 
//                     type="text" 
//                     id="enterprise" 
//                     placeholder="Enter your enterprise" 
//                     className="form-input"
//                 />
//                 </div>

//                 <div className="form-group">
//                 <label htmlFor="username">Username</label>
//                 <input 
//                     type="text" 
//                     id="username" 
//                     placeholder="Enter your username" 
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     className="form-input"
//                 />
//                 </div>

//                 <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <input 
//                     type="password" 
//                     id="password" 
//                     placeholder="Enter your password" 
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="form-input"
//                 />
//                 </div>

//                 <div className="form-options">
//                 <div className="remember-me">
//                     <input 
//                     type="checkbox" 
//                     id="remember" 
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                     className="checkbox-input"
//                     />
//                     <label htmlFor="remember">Remember me</label>
//                 </div>
//                 </div>

//                 <button type="submit" className="signin-btn">
//                 Sign In
//                 </button>

//                 <div className="license-agreement">
//                 <p>By clicking Sign in, you agree to our <a href="#">License Agreement</a></p>
//                 </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;




// import React, { useState } from 'react';
// import './Login.css';
// import background from '../../assets/backgound.mp4';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { BASE_URL, ENDPOINTS } from '../../api/common';
// import TextInputCom from '../../component/TextInputCom';
// import ButtonComp from '../../component/ButtonComp';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [errors, setErrors] = useState({}); // 👈 Validation errors
// //   const navigate = useNavigate();

//   const validate = () => {
//     const newErrors = {};
//     if (!username.trim()) newErrors.username = 'Username is required';
//     if (!password.trim()) newErrors.password = 'Password is required';
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {

//     console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>',e)
//     // e.preventDefault();
//     // const validationErrors = validate();
//     // setErrors(validationErrors);

//     // if (Object.keys(validationErrors).length > 0) {
//     //   return; // ❌ Stop if errors exist
//     // }

//     // try {
//     //   const response = await axios.post(BASE_URL + ENDPOINTS.LOGIN, {
//     //     username,
//     //     password
//     //   });

//     //   if (response.status === 200) {
//     //     const token = response.data.token;

//     //     if (rememberMe) {
//     //       localStorage.setItem('token', token);
//     //     } else {
//     //       sessionStorage.setItem('token', token);
//     //     }

//     //     console.log("akash");
//     //     navigate('/dashboard');
//     //   }
//     // } catch (error) {
//     //   console.error("Login failed:", error.response?.data || error.message);
//     //   alert('Login failed. Please check your credentials.');
//     // }
//   };

//   const handleSubmitbutton = (e) => {
// console.log('>>>>>>>>>>>>>>>>')

// }

//   return (
//     <div className="login-container">
//       <video
//         className="login-bg-video"
//         src={background}
//         autoPlay
//         loop
//         muted
//         playsInline
//       />
//       <div className="login-overlay"></div>
//       <div className="login-content">
//         <div className="">
//           <div className="logo">
//             <h1>Prudent 360<sup>®</sup></h1>
//           </div>
//           <div className='login-box'>
//             <div className="welcome-text">
//               <h2>Welcome Back!</h2>
//               <p>Sign in to continue with Prudent 360</p>
//             </div>

//             <form onSubmit={handleSubmit} noValidate>
//               <div className="form-group">
//                 <label htmlFor="enterprise">Enterprise</label>
//                 <input
//                   type="text"
//                   id="enterprise"
//                   placeholder="Enter your enterprise"
//                   className="form-input"
//                 />
//               </div>

//               <div className="form-group">
//                <TextInputCom
//   label="sachin"
//   name="username"
//   value={username}
//   onChange={(e) => setUsername(e.target.value)}
//   placeholder="Enter your username"
//   error={errors.username}
  
// />

//               </div>

//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className={`form-input ${errors.password ? 'input-error' : ''}`}
//                 />
//                 {errors.password && <p className="error-text">{errors.password}</p>}
//               </div>

//               <div className="form-options">
//                 <div className="remember-me">
//                   <input
//                     type="checkbox"
//                     id="remember"
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                     className="checkbox-input"
//                   />
//                   <label htmlFor="remember">Remember me</label>
//                 </div>
//               </div>


//               <ButtonComp
//               button={"Sign In"}
//               onClick={handleSubmitbutton}
//               />

//               <div className="license-agreement">
//                 <p>
//                   By clicking Sign in, you agree to our{' '}
//                   <a href="#">License Agreement</a>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;




import React, { useState } from 'react';
import './Login.css';
import background from '../../assets/background.mp4';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, ENDPOINTS } from '../../api/common';
import TextInputCom from '../../component/TextInputCom';
import ButtonComp from '../../component/ButtonComp';
import { storeToken } from '../../api/auth';
import ModalComp from '../../component/ModalComp'; // ✅ import modal
import Logo from '../../assets/company logo.jpeg'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ modal state

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    return newErrors;
  };

  const openModal = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsModalOpen(true);
    }
  };

  const handleLoginConfirm = async () => {
    try {
      const response = await axios.post(BASE_URL + ENDPOINTS.LOGIN, {
        username,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        storeToken(token, rememberMe);
        setIsModalOpen(false); // ✅ close modal
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Login failed. Please check your credentials.');
      setIsModalOpen(false);
    }
  };

  return (
    <div className="login-container">
      <video className="login-bg-video" src={background} autoPlay loop muted playsInline />
      <div className="login-overlay"></div>
      <div className="login-content">
        <div>
          <div className="logo d-flex justify-content-center">
            <div><img src={Logo} width={100}/></div>
            <h1 className='mx-3'>
              
              Prudent 360<sup>®</sup>
            </h1>
          </div>
          <div className="login-box">
            <div className="welcome-text">
              <h2>Welcome Back!</h2>
              <p>Sign in to continue with Prudent 360</p>
            </div>

            <form onSubmit={openModal} noValidate>
              <div className="form-group">
                <label htmlFor="enterprise">Enterprise</label>
                <input
                  type="text"
                  id="enterprise"
                  placeholder="Enter your enterprise"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <TextInputCom
                  label="Username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  error={errors.username}
                />
              </div>

              <div className="form-group">
                <TextInputCom
                  label="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  error={errors.password}
                />
              </div>

              <div className="form-options">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="checkbox-input"
                  />
                  <label htmlFor="remember">Remember me</label>
                </div>
              </div>

              <ButtonComp button="Sign In" /> {/* Submits form, triggers modal */}

              <div className="license-agreement">
                <p>
                  By clicking Sign in, you agree to our{' '}
                  <a href="#">License Agreement</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ✅ Modal Component */}
      <ModalComp
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLoginConfirm}
      />
    </div>
  );
}

export default Login;

