import logo from './logo.svg';
import './App.css';
import loginComponent from './components/loginComponent';
import { AuthProvider } from './context/authContext';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import signupComponent from './components/signupComponent';
import success from './components/success';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <ToastContainer />
          <Switch>
            <Route path="/login" exact component={loginComponent} />
            <Route path="/signup" exact component={signupComponent} />
            <Route path="/success" exact component={success} />

            {/* <Route path="/home" component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/test" component={StarRating} />

            <Route
              path="/detail-game/:gameId"
              component={DetailProductComponent}
            /> */}
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
