const Pagination = ({ pagination, onPageChange }) => {
    if (!pagination || pagination.totalPages <= 1) {
        return null;
    }

    return (
        <div className="mt-6 flex items-center justify-between">
            <button
                disabled={!pagination.hasPreviousPage}
                onClick={() => onPageChange(pagination.page - 1)}
                className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
            >
                Previous
            </button>

            <span>
                Page {pagination.page} of {pagination.totalPages}
            </span>

            <button
                disabled={!pagination.hasNextPage}
                onClick={() => onPageChange(pagination.page + 1)}
                className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
