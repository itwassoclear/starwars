import React, { Component } from "react";
import "./people-page.css";

import SwapiService from "../../services/swapi-service";
import ItemList from "../item-list/index";
import PersonDetails from "../item-details/index";
import ErrorBoundry from "../error-boundry/error-boundry";
import Row from "../row/row";

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

  render() {
    const itemList = <ItemList onItemSelected={this.onPersonSelected} getData={this.swapiService.getAllPeople} renderItem={({ name, gender, birthYear }) => `${name} (${gender}, ${birthYear})`} />;
    const personDetails = <PersonDetails personId={this.state.selectedPerson} />;

    return (
      <ErrorBoundry>
        <Row left={itemList} right={personDetails} />
      </ErrorBoundry>
    );
  }
}
