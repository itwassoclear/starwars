import React, { Component } from "react";

import Header from "../header/index";
import RandomPlanet from "../random-planet/index";

import "./app.css";
import SwapiService from "../../services/swapi-service";
import ErrorButton from "../error-button/error-button";
import ErrorIndicator from "../error-indicator/error-indicator";
import ItemDetails, {
  Record,
} from "../item-details/item-details";
import Row from "../row/row";

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
    this.setState({
      showRandomPlanet: !this.state
        .showRandomPlanet,
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }
    const planet = this.state
      .showRandomPlanet && <RandomPlanet />;

    const {
      getPerson,
      getStarship,
      getPersonImage,
      getStarshipImage,
    } = this.swapiService;

    const personDetails = (
      <ItemDetails
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage}
      >
        <Record field="gender" label="Gender" />
        <Record
          field="eyeColor"
          label="Eye color"
        />
      </ItemDetails>
    );

    const starshipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}
      >
        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record
          field="costInCredits"
          label="Cost"
        />
      </ItemDetails>
    );

    return (
      <div className="stardb-app">
        <Header />
        {planet}

        <div className="row mb2 button-row">
          <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}
          >
            Toggle Random Planet
          </button>
          <ErrorButton />
        </div>

        {/* <PeoplePage />

        <div className="row mb2 row-block">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected} getData={this.swapiService.getAllPlanets} renderItem={(item) => item.name} />
          </div>
          <div className="col-md-6">
            <ItemDetails personId={this.state.selectedPerson} />
          </div>
        </div>

        <div className="row mb2 row-block">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected} getData={this.swapiService.getAllStarships} renderItem={(item) => item.name} />
          </div>
          <div className="col-md-6">
            <ItemDetails personId={this.state.selectedPerson} />
          </div>
        </div> */}

        <Row
          left={personDetails}
          right={starshipDetails}
        />
      </div>
    );
  }
}
