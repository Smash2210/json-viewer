import './App.css';
import { Switch, Route } from "react-router-dom";
import Header from "./components/common/Header";
import HomeComponent from "./components/home/HomeComponent";
import AboutComponent from "./components/about/AboutComponent";
import "bulma/css/bulma.min.css";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomeComponent} />
        <Route path="/about" component={AboutComponent} />
      </Switch>
    </div>
  )
}

export default App;
