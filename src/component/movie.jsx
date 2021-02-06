import React, { Component } from "react";
class Movie extends Component {
  state = {
    id: this.props.id,
    value: this.props.value,
  };
  render() {
    return (
      <div>
        <span>{this.state.value}</span>
        <button
          className="btn btn-primary m-2"
          onClick={() =>
            this.setState({
              value: this.state.value + 1,
            })
          }
        >
          Add
        </button>
        z
        <button
          className="btn-denger m-2"
          onClick={() => this.props.onDelete(this.props.id)}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default Movie;
