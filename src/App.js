import "./App.css";
import Movies from "./component/movies";
import Customers from "./component/customers";
import Rentals from "./component/rentals";
import NotFound from "./component/notfound";
import NavBar from "./component/common/NavBar";
import MovieForm from "./component/movieForm";
import RegisterForm from "./component/registerForm";
import LoginForm from "./component/loginForm";
import { Route, Switch} from "react-router-dom";
import { Component } from "react";
class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <main className="container">
          <Switch>
            <Route path="/loginForm" component={LoginForm }/>
            <Route path="/registerForm" component={RegisterForm }/>
            <Route path="/movies/:id" component={MovieForm}/>
            <Route path="/movies" component={Movies}/>
            <Route path="/customers" component={Customers}/>
            <Route path="/rentals" component={Rentals}/>
            <Route path="/not-found" component={NotFound}/>
            <Route path="/" exact component={Movies}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
