import React from "react";
import _ from "lodash";
const Pagination = (props) => {
  const { pageCount, pageSize, currentPage } = props;
  const pages = Math.ceil(pageCount / pageSize);
  if (pages === 1) return null;
  const pagesArr = _.range(1, pages + 1);
  return (
    <nav>
      <ul className="pagination">
        {pagesArr.map((page) => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            key={page}
          >
            <a className="page-link" onClick={() => props.onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
