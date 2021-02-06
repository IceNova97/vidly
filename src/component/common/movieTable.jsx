import React, { Component } from "react";
import MovieThead from "./movieThead";
import MovieTbody from "./movieTbody";
import Like from "../common/like";
import { Link } from "react-router-dom";

class MovieTable extends Component {
  render() {
    const { movies, onLike, onDelete, onSort, sortColumn } = this.props;
    const columns = [
      {
        name: "电影名称",
        path: "title",
        content: (item) => <Link to={`/movies/${item._id}`}>{item.title}</Link>,
      },
      { name: "电影评分", path: "numberInStock" },
      { name: "观影价格", path: "dailyRentalRate" },
      { name: "电影分类", path: "genre.name" },
      {
        key: "like",
        content: (item) => {
          return (
            <Like
              liked={item.liked}
              onClick={() => {
                this.props.onLike(item);
              }}
            />
          );
        },
      },
      {
        key: "delete",
        content: (item) => {
          return (
            <button
              className="btn btn-primary"
              onClick={() => {
                this.props.onDelete(item._id);
              }}
            >
              删除
            </button>
          );
        },
      },
    ];
    return (
      <table className="table table-striped">
        <MovieThead columns={columns} onSort={onSort} sortColumn={sortColumn} />
        <MovieTbody
          data={movies}
          onLike={onLike}
          onDelete={onDelete}
          columns={columns}
        />
      </table>
    );
  }
}

export default MovieTable;
