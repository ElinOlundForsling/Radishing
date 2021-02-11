import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ page, pages, isAdmin = false, keyword = '' }) => {
  return (
    <>
      {pages > 1 && (
        <div className='pagination'>
          {[...Array(pages).keys()].map(p => {
            return (
              <Link
                key={p}
                to={
                  !isAdmin
                    ? keyword
                      ? `/search/${keyword}/page/${p + 1}`
                      : `/page/${p + 1}`
                    : `/admin/productlist/${p + 1}`
                }>
                <button disabled={page === p + 1}>{p + 1}</button>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Pagination;
