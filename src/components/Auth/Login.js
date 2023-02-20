import { useContext, useRef, useState } from 'react';
 import { useNavigate } from 'react-router-dom';

import classes from './login.module.css';
import AuthContext  from '../../store/auth-context';



const Login = () => {
  const history = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [loading , setLoading] = useState(false)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault()

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

 setLoading(true);
 let url;
if (isLogin) {
  url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB7YQFYYb38RQ3WyQeXcvIF48ZpxoEJKK8'
} else {
  url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7YQFYYb38RQ3WyQeXcvIF48ZpxoEJKK8'
}

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken : true
      }),
      headers: {
        'Content-Type' : 'application/json'
      }
    }).then(res => {
         setLoading(false);

      if (res.ok) {
        return res.json();
      } else {
        res.json().then(data => {   // Json also return promises milan
          let errorMessage = 'Authentication failed'
          if(data && data.error && data.error.message) {
          errorMessage = data.error.message
          }

        throw new Error(errorMessage);
        })
      }
    })
    .then((data) => {                             // here below data.expiresIn comming from firefox 1hrs its syntax of firefox fm,
      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000)
        ; // convert to ms because its in not ms
      authCtx.login(data.idToken, expirationTime.toISOString());     //to str i passed in authctx in date obj
      history('/');
      localStorage.setItem('idToken',data.idToken)
    })
    .catch((err) => {
      alert(err.message)
    })
  }
// console.log(loading)
  
return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            ref={emailInputRef}
            type="email"
            id="email"
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            ref={passwordInputRef}
            type="password"
            id="password"
            required
          />
        </div>
        <div className={classes.actions}>
          {loading && <p>Sending request...</p> }
          {!loading && <button>{isLogin ? "Login" : "Create Account"}</button>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;