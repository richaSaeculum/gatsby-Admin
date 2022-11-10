import React from 'react'
import ReactPaginate from 'react-paginate'

type Props = {
    currentPage: number
    totalPage: number
    handlePageClick: (a: any) => void
}

const Pagination = ({ currentPage, totalPage, handlePageClick }: Props) => {
    return (
        <div>
            <ReactPaginate
                pageCount={totalPage}
                // pageCount={12}
                forcePage={currentPage - 1}
                previousLabel="<"
                nextLabel=">"
                breakLabel="..."
                breakClassName="page-item paginate_button"
                breakLinkClassName="page-link"
                pageRangeDisplayed={4}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                pageClassName="paginate_button page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item paginate_button me-2"
                previousLinkClassName="page-link"
                nextClassName="page-item paginate_button"
                nextLinkClassName="page-link"
                activeClassName="active"
            />
        </div>
    )
}

export default Pagination
