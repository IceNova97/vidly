import React, { Component } from "react";
import Movie from "../component/movie";
class MovieList extends Component {
  state = {
    movies: [
      {
        id: 1,
        value: 0,
      },
      {
        id: 2,
        value: 0,
      },
      {
        id: 3,
        value: 0,
      },
      {
        id: 4,
        value: 0,
      },
    ],
  };
  handleDelete = (id) => {
    const movies = this.state.movies;
    this.setState({
      movies: movies.filter((m) => m.id !== id),
    });
  };
  render() {
    return (
      <div>
        {this.state.movies.map((m) => (
          <Movie
            id={m.id}
            value={m.value}
            key={m.id}
            onDelete={this.handleDelete}
          />
        ))}
      </div>
    );
  }
}

export default MovieList;
