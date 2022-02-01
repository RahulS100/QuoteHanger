import { useState, useEffect, useCallback } from 'react';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import LoadingSpinner from '../UI/LoadingSpinner';

//----------------------------http stuff---------------
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import CommentsList from './CommentsList';

//Matrial UI
import CommentIcon from '@mui/icons-material/Comment';

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);

    let {status, data: allcomments, error, sendRequest} = useHttp(getAllComments, true);

    const {id} = props;


    //--------------------Side Effect-----------------
    useEffect(() => {
      sendRequest(id);
    }, [sendRequest, id]);

    
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  

  if(allcomments === null) {
    allcomments = [];
  }

  let comment;

  if(status === "pending") {
    comment = (<div className='centered'>
      <LoadingSpinner />
    </div>)
  }

  if(status === "completed" && allcomments) {
    comment = (<CommentsList comments={allcomments} />)
  }

  if(error) {
    comment = (<div className='centered'>
      <p>Something Went Wrong!</p>
    </div>)
  }

  if(allcomments.length === 0 || !allcomments) {
    comment = (<div className='centered'>
      <p>No Comment added yet!</p>
    </div>)
  }

  const onAddComment = useCallback(() => {
      sendRequest(id);
  }, [id, sendRequest]);

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          <CommentIcon />
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddComment={onAddComment} id={id} />}
     {comment}
    </section>
  );
};

export default Comments;
