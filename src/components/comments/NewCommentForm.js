import { useRef, useEffect, useState } from 'react';

//-------------------------https stuff------------------
import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

//CSS
import classes from './NewCommentForm.module.css';

//Matrial UI
import AddCommentIcon from '@mui/icons-material/AddComment';

const NewCommentForm = (props) => {

  //Validation for Comment Box
  let [isEmpty, setEmpty] = useState(false);

  const {sendRequest, error, status} = useHttp(addComment);
  const commentTextRef = useRef();

  const {onAddComment} = props;



  //----------------check if the comment is writted complete---------------
  useEffect(() => {
    if(!error && status === "completed")
      onAddComment();
  }, [error, status, onAddComment])

  const submitFormHandler = (event) => {
    event.preventDefault();

    let value = commentTextRef.current.value;

    if(value === "") {
          setEmpty(true);
          return;
    }

    sendRequest({commentData: {text: value}, quoteId: props.id});
  };


  //Comment Box Handler
  function commentBox() {
        setEmpty(false);
  }

  
  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
    {status === "pending" && <LoadingSpinner />}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>{isEmpty ? "Comment Box is Empty" : "Your Comment"}</label>
        <textarea id='comment' rows='5' ref={commentTextRef} onChange={commentBox}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'><AddCommentIcon /></button>
      </div>
    </form>
  );
};

export default NewCommentForm;
