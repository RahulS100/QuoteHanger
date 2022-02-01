import React, {useEffect} from 'react';
import { Link, Route, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/UI/LoadingSpinner';

import Comments from '../components/comments/Comments';
import HighLightQuote from '../components/quotes/HighlightedQuote';

//---------------------http stuff for fething the single quote------------------
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';

export default function Quote() {

    const param = useParams();

   let {sendRequest, data: quote, status, error} = useHttp(getSingleQuote, true);

   //-------------------------http sideEffect----------------------------
   useEffect(() => {
       sendRequest(param.id);
   }, [sendRequest, param])

   if(status === "pending") {
       return (<div className='centered'>
                <LoadingSpinner />
       </div>);
   }

    if(!quote) {
        return <p>No Quote found</p>
    }

    if(error) {
        return <div className='centered'>
            <p>Something Wrong Happend!</p>
        </div>
    }

    return (
        <div>
        <HighLightQuote text={quote.text} author={quote.author} />
            <Route path={`/quote/${param.id}`} exact>
            <div className='centered'>
            <Link to={`/quote/${param.id}/comments`} className='btn--flat' >Show Comment</Link>
            </div>
            </Route>
           <Route path={`/quote/${param.id}/comments`}>
            <Comments id={param.id} />
           </Route>
        </div>
    )
}
