import React, { Component } from "react";

import Spinner from "../spinner/spinner";
import SwapiService from "../../services/swapi-service";

import "./random-planet.css";
import ErrorIndicator from "../error-indicator/error-indicator";
// import ErrorIndicator from "../errorIndicator";

export default class RandomPlanet extends Component {
  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
  };
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this.updatePlanet();
  }
  // componentDidMount() {
  //   // console.log("Did mount");
  //   // console.log("constructor");
  //   this.updatePlanet();
  //   this.interval = setInterval(this.updatePlanet, 5000);
  // }
  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false,
    });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 25) + 2;
    // const id = 156542;
    this.swapiService.getPlanet(id).then(this.onPlanetLoaded).catch(this.onError);
  };

  render() {
    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);

    const errMessage = error && <ErrorIndicator />;
    const spinner = loading && <Spinner />;
    const content = hasData && <PlanetView planet={planet} />;

    return (
      <div className="random-planet jumbotron rounded">
        {errMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;

  return (
    <React.Fragment>
      <img
        className="planet-image"
        // src="https://starwars-visualguide.com/assets/img/planets/1200.jpg"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        alt="random-planet"
      />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};