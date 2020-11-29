import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

//components
import Landing from "./Landing";
import Nav from "./menu/Nav"
import Gallery from "./menu/Gallery";
import Favorites from "./menu/Favorites";
import Mypage from "./menu/Mypage";
import SignOut from "./menu/SignOut";
import SignIn from "./menu/SignIn";
import SignUp from "./menu/SignUp";


class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: true
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Nav isLogin={this.state.isLogin} />
        {/* <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/mypage" component={Mypage} />
          <Route path="/signout" component={SignOut} />
        </Switch> */}

      </BrowserRouter>
    )
  }
}

export default Main;