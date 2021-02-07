import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";
import "./item-list.css";
import Spinner from "../spinner/spinner";

export default class ItemList extends Component {
  swapiService = new SwapiService();
  state = {
    peopleList: null,
    itemList: null,
  };

  componentDidMount() {
    //   const { getData } = this.props;

    //   getData().then((itemList) =>
    //     this.setState({
    //       itemList,
    //     })
    //   );
    this.swapiService.getAllPeople().then((peopleList) => {
      this.setState({ peopleList });
    });
  }

  onItemSelected() {}

  renderItems(arr) {
    return arr.map((person) => {
      const { id, name } = person;
      // const label = this.props.renderItem(person);
      // const label = this.props.children(item);
      return (
        <li key={id} className="list-group-item" onClick={() => this.props.onItemSelected(id)}>
          {name}
        </li>
      );
    });
  }

  // const items = itemList.map((people) => {
  //   return (
  //     <li key={people.id} className="list-group-item">
  //       {people.name}
  //     </li>
  //   );
  // });

  render() {
    const { peopleList } = this.state;

    if (!peopleList) {
      return <Spinner />;
    }
    const items = this.renderItems(peopleList);

    return <ul className="item-list list-group">{items}</ul>;
  }
}
