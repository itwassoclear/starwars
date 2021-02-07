import React, { Component } from "react";

import Header from "../header/index";
import RandomPlanet from "../random-planet/index";

import "./app.css";
// import PeoplePage from "../peoplePage/PeoplePage";
import SwapiService from "../../services/swapi-service";
import ErrorButton from "../error-button/error-button";
import ErrorIndicator from "../error-indicator/error-indicator";
import PeoplePage from "../people-page/people-page";
import ItemList from "../item-list/index";
import PersonDetails from "../person-details/index";
// import { Row } from "../row/Row";
// import ItemDetails from "../itemDetails/ItemDetails";

export default class App extends Component {
  swapiService = new SwapiService();

  constructor() {
    super();
    this.state = {
      showRandomPlanet: true,
      // selectedPerson: null,
      hasError: false,
    };
  }

  toggleRandomPlanet = () => {
    console.log("toggle");
    this.setState({ showRandomPlanet: !this.state.showRandomPlanet });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }
    const planet = this.state.showRandomPlanet && <RandomPlanet />;
    // const personDetails = <ItemDetails itemId={11} />;
    // const starshipDetails = <ItemDetails itemId={5} />;
    return (
      <div className="stardb-app">
        <Header />
        {planet}

        <div className="row mb2 button-row">
          <button className="toggle-planet btn btn-warning btn-lg" onClick={this.toggleRandomPlanet}>
            Toggle Random Planet
          </button>
          <ErrorButton />
        </div>

        <PeoplePage />

        <div className="row mb2 row-block">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllPlanets}
              // renderItem={(item) => item.name}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>

        <div className="row mb2 row-block">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllStarships}
              // renderItem={(item) => item.name}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>

        {/* <Row left={personDetails} right={starshipDetails} /> */}
      </div>
    );
  }
}
