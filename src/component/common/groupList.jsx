import React from "react";

const GroupList = (props) => {
  const { items, selectedItem, textproperty, valueProperty } = props;
  return (
    <ul className="list-group" style={{ paddingTop: 20 }}>
      {items.map((item) => (
        <li
          className={
            item[textproperty] === selectedItem.name
              ? "list-group-item active"
              : "list-group-item"
          }
          key={item[valueProperty]}
          onClick={() => props.onSelect(item)}
        >
          {item[textproperty]}
        </li>
      ))}
    </ul>
  );
};
GroupList.defaultProps = {
  textproperty: "name",
  valueProperty: "_id",
};
export default GroupList;
