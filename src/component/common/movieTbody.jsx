import React, { Component } from "react";
import _ from "lodash";
class MovieTbody extends Component {
  getKey = (id, column) => {
    return id + (column.path || column.key);
  };
  renderCell(item, column) {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  }
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.getKey(item._id, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default MovieTbody;
