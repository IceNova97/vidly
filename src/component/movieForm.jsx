import Joi from "joi-browser";
import React from "react";
import { getMovie, saveMovie, getMovies } from "../services/fakeMovieService";
import { genres } from "../services/fakeGenreService";
import Form from "./common/form";
class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: "Action",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
  };
  schema = {
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  };

  doSubmit = () => {
    const { history, match } = this.props;
    const { data } = this.state;
    console.log(match.params.id);
    const movie = {
      _id: match.params.id ? match.params.id : null,
      title: data.title,
      genre: {
        _id: genres.filter((item) => item.name === data.genre)[0]._id,
        name: data.genre,
      },
      numberInStock: data.numberInStock,
      dailyRentalRate: data.dailyRentalRate,
    };
    saveMovie(movie);
    history.push("/movies");
  };
  constructor(props) {
    super(props);
    const { match, history } = props;
    const movieId = match.params.id;
    if (movieId === "new") return;
    const movie = getMovie(match.params.id);
    console.log(getMovies());
    if (!movie) {
      history.replace("/not-found");
      return;
    }

    this.state = {
      data: {
        title: movie.title,
        genre: movie.genre.name,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate,
      },
      errors: {},
    };
  }
  render() {
    const { match } = this.props;
    return (
      <div>
        <h1>Movie Form {match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genre", "Genre", genres)}
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("dailyRentalRate", "AilyRentalRate")}
          {this.renderButton("保存")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
