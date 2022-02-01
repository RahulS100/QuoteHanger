import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import { useContext } from 'react';
import AllQuote from './pages/AllQuote';
import NewQuote from './pages/NewQuote';
import Quote from './pages/Quote';
import Layout from './components/layout/Layout';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Auth/Login';

//Auth Context
import AuthContext from './context/auth-context';

function App() {

  const AuthCTX = useContext(AuthContext);

  return (
    <BrowserRouter>
    <Layout>
      
       {!AuthCTX.LoginState &&
        <Switch>
          <Route path='/' exact><HomePage /></Route>
        <Route path='/login'><Login /></Route>
        <Route path="*"><NotFound /></Route>
        </Switch>
        }

       { AuthCTX.LoginState && <Switch>
       <Route exact path='/'>
       <Redirect to='/allquote' />
       </Route>
       <Route path="/allquote"><AllQuote /></Route>
        <Route path="/newquote"><NewQuote /></Route>
        <Route path="/quote/:id"><Quote /></Route> 
        <Route path="*"><NotFound /></Route>
        </Switch>
        }
        
      </Layout>
    </BrowserRouter>
  );
}

export default App;
