import React, { useEffect, useState, Fragment } from "react";
import "./Content.css";
import NewItemArea from "./NewItemArea";
import axios from "axios";

export const categories = ["Electronics", "Clothings", "Kitchen"];

export default function Content(props) {
  const [items, setItems] = useState([]);
  const [saving, setSaving] = useState(false);

  // fetch initial data from server on component mount
  useEffect(() => {
    (async () => {
      var response = await axios.get("/Api/Items");
      if (isOk(response)) {
        setItems(response.data);
      }
    })();
  }, []);

  function onAdd(item) {
    (async () => {
      setSaving(true);
      var response = await axios.post("/Api/Items", item);
      if (isOk(response)) {
        setItems([...items, response.data]);
      }
      setSaving(false);
    })();
  }

  function onDelete(id) {
    (async () => {
      var response = await axios.delete("/Api/Items/" + id);
      if (isOk(response)) {
        setItems(items.filter((it) => it.id !== id));
      }
    })();
  }

  // check if http request status
  function isOk(response) {
    if (response.status !== 200) {
      alert("Something went wrong");
      return false;
    }
    return true;
  }

  // group all items based on category and calculate every group's total value
  function groupItems() {
    const groupedItems = items.reduce(function (group, item) {
      const grouped = (group[item.category] = group[item.category] || {
        items: [],
        value: 0,
        categoryName: null,
      });
      grouped.categoryName = categories[item.category];
      grouped.items.push(item);
      grouped.value = grouped.value + (item.value || 0);
      return group;
    }, {});

    // order by category
    return Object.values(groupedItems).sort(
      (first, second) => first.categoryName > second.categoryName ? 0 : -1
    );
  }

  function render() {
    const groupedItems = groupItems();
    let total = 0;
    return (
      <div className="content">
        <ul>
          {groupedItems.map((group) => {
            total += group.value;
            return (
              <Fragment key={group.categoryName}>
                <li className="category">
                  <span>{group.categoryName}</span>
                  <span>${group.value}</span>
                  <span></span>
                </li>
                <li>
                  <ul>
                    {group.items.map((item) => {
                      return (
                        <li key={item.id}>
                          <span>{item.name}</span>
                          <span>${item.value}</span>
                          <span>
                            <button
                              onClick={() => onDelete(item.id)}
                              className="border-0 bg-transparent"
                            >
                              <svg viewBox="0 0 24 24">
                                <path
                                  fill="grey"
                                  d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                                />
                              </svg>
                            </button>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </Fragment>
            );
          })}
          <li className="category font-weight-bold">
            <span>TOTAL</span>
            <span>${total}</span>
            <span></span>
          </li>
        </ul>
        <NewItemArea onAdd={onAdd} saving={saving} />
      </div>
    );
  }
  return render();
}
