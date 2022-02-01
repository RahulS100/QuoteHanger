import { createContext, useState } from "react";

//Auth Context
const context = createContext();

//Getting Auth Token from the LocalStorage
function getAuthToken() {
    const authToken = localStorage.getItem("auth-token");
    return authToken;
}

//Auth Context Wraper
export function AuthProvider(props) {

    const authToken = getAuthToken();
    
    //Helper States for Auth
    let [token, setToken] = useState(authToken);
    let LoginState = !!token;
    

    //Login and Logout Handlers
    function login(token) {
            setToken(token);
            localStorage.setItem("auth-token", token);
    }

    function logout() {
            setToken(null);
            localStorage.removeItem("auth-token");
    }

    //Context Data Object
    const authContextData = {
        LoginState,
        login,
        logout
    }

    //Auth Provider Wrapper HOC
    return (
        <context.Provider value={authContextData}>
            {props.children}
        </context.Provider>
    )
}

export default context;