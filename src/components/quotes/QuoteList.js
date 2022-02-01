import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';


//--------------------Sorting the Quotes Data------------------------------
const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {

  //--------------------controlling the history----------------------------
  const history = useHistory();
  const location = useLocation();

  const query = new URLSearchParams(location.search);

  const isAscending = query.get('sort') === "asc";

  const sortedQuotes = sortQuotes(props.quotes, isAscending);

  function Sorting() {
      history.push(`allquote?sort=${isAscending ? 'desc' : 'asc'}`);
  }


  return (
    <Fragment>
    <div  className={classes.sorting}>
    <button onClick={Sorting}>Sort {!isAscending ? 'Ascending' : 'Descending'}</button>
    </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
            reload={props.reload}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
