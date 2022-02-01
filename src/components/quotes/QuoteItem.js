import { Link } from 'react-router-dom';
import classes from './QuoteItem.module.css';
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteQuote } from '../../lib/auth-calls';

const QuoteItem = (props) => {

  //Delete Quote
  function delQuote() {
      deleteQuote(props.id).then((status) => {
        if(status.status === 'ok') {
          props.reload();
          return;
        }
        alert("Some Problem While Deleting the Quote");
      })
      
  }

  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <button className={classes.delbtn} onClick={delQuote}><DeleteIcon /></button>
      <Link className='btn' to={`quote/${props.id}`}>
        <LaunchIcon />
      </Link>
    </li>
  );
};

export default QuoteItem;
