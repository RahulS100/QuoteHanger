import React, {useState, useEffect} from 'react';
import { useHistory, Prompt } from 'react-router-dom';
import QuoteForm from '../components/quotes/QuoteForm';

//-----------------http works-----------------
import useHttp from '../hooks/use-http';
import {addQuote} from '../lib/api';
 
export default function NewQuote() {

    const {sendRequest, status} = useHttp(addQuote);
    let [isEntering, setEntering] = useState(false);
    const history = useHistory();

    //-----------------Effects--------------------------
    useEffect(() => {
        if(status === "completed") {
            history.push("/allquote");
        }
    }, [history, status]);

    //--------------------Handlers------------------------
    function inputHandle() {
        setEntering(true);
    }

    function toggleEntering() {
        setEntering(prev => !prev);
    }

    function submitHandler(quoteData) {
        sendRequest(quoteData);
        history.push("/allquote");
    }

    return (
        <div>
            <Prompt when={isEntering} message={(loc) => "Are you trying to leave your work?"} />
            <QuoteForm onAddQuote={submitHandler} onFocus={inputHandle} toggleEnter={toggleEntering} isLoading={status === "pending"} />
        </div>
    )
}