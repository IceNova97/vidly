import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import Pagination from "../component/common/pagination";
import GroupList from "../component/common/groupList";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import MovieTable from "../component/common/movieTable";
import { Link } from "react-router-dom";
import _ from "lodash";
class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    search: "",
    selectedGenre: {
      _id: "",
      name: "All Genres",
    },
    sortColumn: {
      path: "title",
      order: "asc",
    },
  };
  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [{ name: "All Genres", _id: "" }, ...getGenres()],
    });
  }
  getHeader = (length) => {
    const movies = this.state.movies;
    return movies.length > 0 ? (
      <h1>总共有{length}部好片</h1>
    ) : (
      <h1>不好意思 影库为空</h1>
    );
  };
  handleDelete = (id) => {
    const movies = [...this.state.movies];
    this.setState({
      movies: movies.filter((movie) => movie._id !== id),
    });
  };
  handleLike = (m) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(m);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({
      movies,
    });
  };
  handlePageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };
  handleSelect = (genre) => {
    this.setState({
      selectedGenre: genre,
      search: "",
      currentPage: 1,
    });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleChange = ({ currentTarget: input }) => {
    this.setState({
      search: input.value,
      currentPage: 1,
      selectedGenre: {
        _id: "",
        name: "All Genres",
      },
    });
  };
  render() {
    const {
      movies,
      currentPage,
      pageSize,
      selectedGenre,
      sortColumn,
      search,
    } = this.state;
    // 过滤分类
    const filtered =
      selectedGenre.name !== "All Genres"
        ? movies.filter((movie) => movie.genre.name === selectedGenre.name)
        : movies;
    // 进行查询
    const searched = search
      ? filtered.filter((movie) =>
          movie.title.toLowerCase().match(search.toLowerCase())
        )
      : filtered;
    // 进行排序
    const sorted = _.sortBy(searched, [sortColumn.path], [sortColumn.order]);
    // 进行分页
    const pages = paginate(sorted, currentPage, pageSize);
    const count = searched.length;
    return (
      <div className="row">
        <div className="col-2">
          <GroupList
            items={this.state.genres}
            onSelect={this.handleSelect}
            selectedItem={selectedGenre}
          />
          <Link
            style={{ marginTop: 10 }}
            className="btn btn-primary"
            to="/movies/new"
          >
            添加电影
          </Link>
        </div>
        <div className="col">
          {pages.length > 0 ? (
            <h1>总共有{count}部好片</h1>
          ) : (
            <h1>不好意思 影库为空</h1>
          )}
          <div className="form-group">
            <input
              onChange={this.handleChange}
              type="text"
              className="form-control"
              placeholder="请输入搜索内容..."
              aria-describedby="sizing-addon1"
              value={this.state.search}
            ></input>
          </div>
          <MovieTable
            movies={pages}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            pageCount={count}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
