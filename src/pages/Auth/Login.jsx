import React, {useRef, useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../../components/UI/Card';
import classes from './Login.module.css';
import authRequest from '../../lib/auth-calls';


//Auth Context
import AuthContext from '../../context/auth-context';

export default function Login() {

    //Browser History Manipulation
    const history = useHistory();

    //Refs for Email and Password
    const emailInputRef = useRef();
    const passInputRef = useRef();
  
    //Auth Context
    const context = useContext(AuthContext);

    //Form Validation State
    let [isPasswordValid, setPasswordValid] = useState(false); 
    let [register, setRegister] = useState(false);
  
    function submitFormHandler(event) {
      event.preventDefault();
  
      const email = emailInputRef.current.value;
      const password = passInputRef.current.value;
  
      //Add New Quote Form Validation
      if(password.length < 8 ) {
        setPasswordValid(true);
        return;
      }

      //Authentication Request
      //New User Register Auth
      if(register) {
         authRequest({email, password}, true)
         .then((tokenData) => {
            context.login(tokenData.token);
            history.replace('/allquote');
         })
         .catch((error) => {
             alert(error.message);
         })
         return;
        }

        
        //Login Section
        authRequest({email, password})
         .then((tokenData) => {
             console.log(tokenData);
             if(tokenData.error) {
                 throw new Error(tokenData.error.message);
             }
            context.login(tokenData.token);
            history.replace('/allquote');
         })
         .catch((error) => {
             alert(error.message);
         });
    }
  
  
    //Input Change Handlers
    function emailHandler() {
        setPasswordValid(false);
    }

    function registerHandler(e) {
        e.preventDefault();
        setRegister(true);
        }
  
    
    //Set the Invalid Password classes
    let classListForQuote = classes.control;
    if(isPasswordValid) {
      classListForQuote = `${classes.control} ${classes.invalid}`;
    }

    return (
        <Card>
        <form className={classes.form} onSubmit={submitFormHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input id='email' ref={emailInputRef} required type="email" />
          </div>
          <div className={classListForQuote}>
            <label htmlFor='password'>{isPasswordValid ? "Password Must be 8 character long!" : "Password"}</label>
            <input id='password' type='password' ref={passInputRef} required onChange={emailHandler} />
          </div>
          <div className={classes.actions}>
            <button className='btn'>{!register ? "Login" : "SignUp"}</button>
          </div>
            {!register && <a className={classes['signup-link']} onClick={registerHandler} href="/">Create New Account</a>}
        </form>
      </Card>
    )
}
