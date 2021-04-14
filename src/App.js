import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContactUs from "./client";
import AdminDashboard from "./admin/index";
import Login from "./admin/login";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={ContactUs} />
          <Route exact path="/admin/login" component={Login} />
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
