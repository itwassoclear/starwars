import React, { Component } from "react";

import Header from "../header/index";
import RandomPlanet from "../random-planet/index";
import ErrorBoundry from "../error-boundry/error-boundry";
import ErrorIndicator from "../error-indicator/error-indicator";
import SwapiService from "../../services/swapi-service";

import { SwapiServiceProvider } from "../swapi-service-context/index.js";

import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList,
} from "../sw-components/";

import "./app.css";

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

    // const personDetails = (
    //   <ItemDetails
    //     itemId={11}
    //     getData={getPerson}
    //     getImageUrl={getPersonImage}
    //   >
    //     <Record field="gender" label="Gender" />
    //     <Record
    //       field="eyeColor"
    //       label="Eye color"
    //     />
    //   </ItemDetails>
    // );

    // const starshipDetails = (
    //   <ItemDetails
    //     itemId={5}
    //     getData={getStarship}
    //     getImageUrl={getStarshipImage}
    //   >
    //     <Record field="model" label="Model" />
    //     <Record field="length" label="Length" />
    //     <Record
    //       field="costInCredits"
    //       label="Cost"
    //     />
    //   </ItemDetails>
    // );

    return (
      <ErrorBoundry>
        <SwapiServiceProvider
          value={this.swapiService}
        >
          <div className="stardb-app">
            <Header />

            <PersonDetails itemId={11} />
            <PlanetDetails itemId={5} />
            <StarshipDetails itemId={9} />

            <PersonList />
            <StarshipList />
            <PlanetList />
          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
