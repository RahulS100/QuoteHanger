import React, {useEffect} from 'react';
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';
import QuoteList from '../components/quotes/QuoteList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NotQuoteFound from '../components/quotes/NoQuotesFound';

export default function AllQuote() {

    let {sendRequest, status, data: allQuotes, error} = useHttp(getAllQuotes, true);

    //--------------------------http Request side effect----------------------------
    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    if(status === "pending") {
        return (<div className='centered'>
            <LoadingSpinner />
        </div>)
    }

    if(error) {
        return (<div className='centered focus'>
        <p>Something Wrong happend!</p>
    </div>)
    }
    
    if(status === "completed" && (allQuotes.length === 0 || !allQuotes)) {
        
        return (<div className='centered'>
        <NotQuoteFound />
    </div>)
    }

    return (
        <div>
            <QuoteList quotes={allQuotes} reload={sendRequest} />
        </div>
    )
}
