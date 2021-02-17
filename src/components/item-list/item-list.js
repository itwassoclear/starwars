import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";
import "./item-list.css";
import { withData } from "../hoc-helper";

const ItemList = (props) => {
  const {
    data,
    onItemSelected,
    children: renderLabel,
  } = props;

  const items = data.map((item) => {
    const { id } = item;
    const label = renderLabel(item);
    return (
      <li
        key={id}
        className="list-group-item"
        onClick={() => onItemSelected(id)}
      >
        {label}
      </li>
    );
  });

  return (
    <ul className="item-list list-group">
      {items}
    </ul>
  );
};

const { getAllPeople } = new SwapiService();

export default withData(ItemList, getAllPeople);
