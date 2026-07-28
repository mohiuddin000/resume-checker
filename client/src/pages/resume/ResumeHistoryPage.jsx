import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../../components/layout/Navbar";
import Spinner from "../../components/common/Spinner";
import Pagination from "../../components/common/Pagination";

import ResumeHistoryTable from "../../components/resume/ResumeHistoryTable";
import DeleteResumeDialog from "../../components/resume/DeleteResumeDialog";

import { getResumes, deleteResume } from "../../services/resume.service";

const ResumeHistoryPage = () => {
    const [resumes, setResumes] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(true);

    const [selectedResumeId, setSelectedResumeId] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchResumes = async (currentPage = 1) => {
        setLoading(true);

        try {
            const response = await getResumes(currentPage);

            setResumes(response.data);
            setPagination(response.pagination);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to load resumes.",
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResumes(page);
    }, [page]);

    const openDeleteDialog = (id) => {
        setSelectedResumeId(id);
        setIsDeleteOpen(true);
    };

    const closeDeleteDialog = () => {
        setIsDeleteOpen(false);
        setSelectedResumeId(null);
    };

    const handleDelete = async () => {
        if (!selectedResumeId) return;

        setIsDeleting(true);

        try {
            await deleteResume(selectedResumeId);

            toast.success("Resume deleted successfully.");

            closeDeleteDialog();

            await fetchResumes(page);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to delete resume.",
            );
        } finally {
            setIsDeleting(false);
        }
    };

    if (loading) {
        return <Spinner fullScreen />;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main className="mx-auto max-w-6xl p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Resume History</h1>

                    <p className="mt-2 text-gray-600">
                        View all of your previous resume analyses.
                    </p>
                </div>

                <ResumeHistoryTable
                    resumes={resumes}
                    onDelete={openDeleteDialog}
                />

                {pagination?.totalPages > 1 && (
                    <div className="mt-6">
                        <Pagination
                            pagination={pagination}
                            onPageChange={setPage}
                        />
                    </div>
                )}

                <DeleteResumeDialog
                    open={isDeleteOpen}
                    loading={isDeleting}
                    onClose={closeDeleteDialog}
                    onConfirm={handleDelete}
                />
            </main>
        </div>
    );
};

export default ResumeHistoryPage;
