import React, { Component } from "react";
import "./people-page.css";

import SwapiService from "../../services/swapi-service";
import ItemList from "../item-list/index";
import PersonDetails from "../person-details/index";
import ErrorIndicator from "../error-indicator/error-indicator";

export default class PeoplePage extends Component {
  swapiService = new SwapiService();
  state = {
    selectedPerson: 3,
  };

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id,
      hasError: false,
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    return (
      <div className="row mb2 row-block">
        <div className="col-md-6">
          <ItemList
            onItemSelected={this.onPersonSelected}
            getData={this.swapiService.getAllPeople}
            // renderItem={(item) => item.name}
          />
        </div>
        <div className="col-md-6">
          <PersonDetails personId={this.state.selectedPerson} />
        </div>
      </div>
    );
  }
}
