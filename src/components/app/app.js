import React, { Component } from "react";

import Header from "../header/index";
import RandomPlanet from "../random-planet/index";
import ItemList from "../item-list/index";
import PersonDetails from "../person-details/index";

import "./app.css";
// import PeoplePage from "../peoplePage/PeoplePage";
import SwapiService from "../../services/swapi-service";
// import ErrorBoundary from "../errorBoundary/ErrorBoundary";
// import { Row } from "../row/Row";
// import ItemDetails from "../itemDetails/ItemDetails";

export default class App extends Component {
  swapiService = new SwapiService();
  state = {
    showRandomPlanet: true,
    selectedPerson: 5,
    hasError: false,
  };
  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !this.showRandomPlanet,
      };
    });
  };
  onItemSelected = (id) => {
    this.setState({
      selectedPerson: id,
    });
  };
  comonentDidCatch() {
    // console.log("comonentDidCatch");
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      // return <ErrorIndicator />;
    }
    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;
    // const personDetails = <ItemDetails itemId={11} />;
    // const starshipDetails = <ItemDetails itemId={5} />;
    return (
      <div className="stardb-app">
        <Header />
        {planet}

        {/* <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}
          >
            Toggle Random Planet
          </button>
          <PeoplePage />
          <div className="row mb2">
            <div className="col-md-6">
              <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.swapiService.getAllPlanets}
                renderItem={(item) => item.name}
              />
            </div>
            <div className="col-md-6">
              <PersonDetails personId={this.state.selectedPerson} />
            </div>
          </div> */}

        {/* <Row left={personDetails} right={starshipDetails} /> */}
        {/* <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onItemSelected}
              getData={this.swapiService.getAllStarships}
              renderItem={(item) => item.name}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div> */}
      </div>
    );
  }
}
