        const authRequest = async (authData, Register = false) => {
    
       let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + process.env.AUTH_KEY;
        if(Register) url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + process.env.AUTH_KEY;

       const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({...authData, returnSecureToken: true}),
            headers: {
                "Content-Type": "application/json"
            }
        })

        //Checking if Response Ok or Not
        try {
        const tokenData = await response.json();

        if(tokenData.error) {
            throw new Error(tokenData.error.message);
        }
        
        return {error: null, token: tokenData.idToken}    
    } catch(e) {
        return {error: e, token: null};
    }
    }


export async function deleteQuote(quoteId) {

    const commentsDeletePath = "https://react-http-b6515-default-rtdb.firebaseio.com/comments/" + quoteId + ".json";
    const quoteDeletePath = "https://react-http-b6515-default-rtdb.firebaseio.com/quotes/" + quoteId + ".json";

         const quoteDel =  fetch(quoteDeletePath , {
                method: "DELETE"
            });        
         const commentsDel =  fetch(commentsDeletePath, {
                method: "DELETE"
            });      
            
           const resArray = await Promise.all([quoteDel, commentsDel]);
        
           if(resArray) {
               return {status: "ok"}
           }
           return null;
    }


    export default authRequest;