import logo from './logo.svg';
import './App.css';
import loginComponent from './components/loginComponent';
import { AuthProvider } from './context/authContext';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import signupComponent from './components/signupComponent';
import Admin from './components/admin';
import Home from './components/home';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <ToastContainer />
          <Switch>
            <Route path="/login" exact component={loginComponent} />
            <Route path="/signup" exact component={signupComponent} />
            <Route path="/admin" exact component={Admin} />
            <Route path="/home" exact component={Home} />


          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
