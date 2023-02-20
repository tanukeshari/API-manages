import { useRef, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import AuthContext from '../../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useNavigate();

  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;
    // here if u want to add validation.

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB7YQFYYb38RQ3WyQeXcvIF48ZpxoEJKK8',
    {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false, //always use true, but here fal work
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      //we assume this always true so, here i dont put any error handeling

      history('/');
    })

  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;