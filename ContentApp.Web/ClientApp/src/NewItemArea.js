import React, { useState } from "react";
import { categories } from "./Content";

const emptyItem = { name: "", value: 0, category: 0 };
// Made this area as separate component so that form change won't rerender the whole Content component
export default function NewItemArea(props) {
  const [item, setItem] = useState({ ...emptyItem });

  function onChange(e) {
    let { name, value } = e.target;
    if (name === "value") {
      value = parseFloat(value);
    } else if (name === "category") {
      value = parseInt(value);
    }

    setItem((prevItem) => {
      return { ...prevItem, [name]: value };
    });
  }

  function onAdd() {
    props.onAdd(item);
    setItem({ ...emptyItem });  //reset values
  }

  function render() {
    return (
      <div className="d-flex">
        <input
          type="text"
          name="name"
          value={item.name}
          className="form-control mr-2"
          placeholder="Name"
          onChange={onChange}
        />
        <input
          type="number"
          name="value"
          value={item.value}
          className="form-control mr-2"
          placeholder="Value"
          onChange={onChange}
        />
        <select
          name="category"
          value={item.category}
          onChange={onChange}
          className="form-control mr-2"
        >
          {categories.map((categoryName, index) => (
            <option value={index} key={index}>
              {categoryName}
            </option>
          ))}
        </select>
        <button
          className="btn btn-primary"
          onClick={onAdd}
          disabled={props.saving}
        >
          {props.saving ? "Adding" : "Add"}
        </button>
      </div>
    );
  }
  return render();
}
