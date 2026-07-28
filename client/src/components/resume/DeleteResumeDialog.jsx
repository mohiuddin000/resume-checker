import Card from "../common/Card";
import Button from "../common/Button";

const DeleteResumeDialog = ({ open, onClose, onConfirm, loading = false }) => {
    if (!open) return null;

    const handleOverlayClick = (e) => {
        if (loading) return;

        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={handleOverlayClick}
        >
            <Card className="w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="mb-3 text-4xl">🗑️</div>

                        <h2 className="text-2xl font-bold">Delete Resume</h2>

                        <p className="mt-2 text-gray-600">
                            Are you sure you want to delete this resume
                            analysis?
                        </p>

                        <p className="mt-2 text-sm text-red-600">
                            This action cannot be undone.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="rounded p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        ✕
                    </button>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={onConfirm}
                        loading={loading}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        Delete Resume
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default DeleteResumeDialog;
