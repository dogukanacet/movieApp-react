import React, { Component } from "react";

import styles from "./Sidebar.module.css";

import { NavLink, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import Logo from "../../components/UI/Logo/Logo";
import Input from "../../components/UI/Input/Input";
import NavigationItem from "../../components/UI/NavigationItem/NavigationItem";

class Sidebar extends Component {
  state = {
    searchbarValue: "",
  };

  searchbarValueHandler = (event) => {
    this.state.searchbarValue = event.target.value;
  };

  searchClickedHandler = () => {
    this.props.history.push({
      pathname: "/search",
      search: "?" + this.state.searchbarValue,
    });
    this.props.onInputChange(this.state.searchbarValue);
  };

  render() {
    return (
      <div className={styles.Sidebar}>
        <nav>
          <NavLink style={{ textDecoration: "none" }} to="/" exact>
            <div style={{ display: "inline-flex" }}>
              <Logo height="35px" width="35px" />
              <p className={styles.Title}>&#160; MovieStore</p>
            </div>
          </NavLink>
          <div
            onKeyPress={(e) => e.key === "Enter" && this.searchClickedHandler()}
            className={styles.Search}
          >
            <Input
              withButton
              placeholder="Search"
              buttonText="&#9740;"
              buttonTextStyle="Rotate"
              changed={(event) => this.searchbarValueHandler(event)}
              clicked={this.searchClickedHandler}
            />
          </div>
          <ul>
            <NavigationItem path="/" name="Home" exact />
            <NavigationItem path="/genres" name="Genres" exact />
          </ul>
        </nav>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInputChange: (inputData) => dispatch(actions.searchMovies(inputData)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Sidebar));
