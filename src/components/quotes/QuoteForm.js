import { useRef,useState } from 'react';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();

  //Form Validation State
  let [isAuthorValid, setAuthorValid] = useState(false);
  let [isQuoteValid, setQuoteValid] = useState(false); 

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    //Add New Quote Form Validation
    let isContainDigit = new RegExp(/\d+/g).test(enteredAuthor);
    console.log(isContainDigit);
    if(enteredAuthor.length < 4 || isContainDigit) {
            setAuthorValid(true);
            return;
    }

    if(enteredText.length < 5) {
      setQuoteValid(true);
      return;
    }

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }


  //Input Change Handlers
  function authorHandler() {
    setAuthorValid(false);
  }

  function quoteHandler() {
      setQuoteValid(false);
  }

  let classListForAuthor = classes.control;
  let classListForQuote = classes.control;
  if(isAuthorValid) {
classListForAuthor = `${classes.control} ${classes.invalid}`;
  }

  if(isQuoteValid) {
    classListForQuote = `${classes.control} ${classes.invalid}`;
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitFormHandler}>
        {props.isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}
        <div className={classListForAuthor}>
          <label htmlFor='author'>{isAuthorValid ? "At Least 5 Digit and No Digit in Author Name" : "Author"}</label>
          <input type='text' id='author' ref={authorInputRef} onFocus={props.onFocus} required onChange={authorHandler} />
        </div>
        <div className={classListForQuote}>
          <label htmlFor='text'>{isQuoteValid ? "At least 6 character quote is accepted!" : "Quote"}</label>
          <textarea id='text' rows='5' ref={textInputRef} onFocus={props.onFocus} required onChange={quoteHandler} ></textarea>
        </div>
        <div className={classes.actions}>
          <button className='btn' onClick={props.toggleEnter}>Add Quote</button>
        </div>
      </form>
    </Card>
  );
};

export default QuoteForm;
