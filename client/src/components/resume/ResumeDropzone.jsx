import { useRef, useState } from "react";
import toast from "react-hot-toast";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ResumeDropzone = ({ file, onFileSelect }) => {
    const inputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const validateFile = (selectedFile) => {
        if (!selectedFile) return;

        if (selectedFile.type !== "application/pdf") {
            toast.error("Please upload a PDF file.");
            return;
        }

        if (selectedFile.size > MAX_FILE_SIZE) {
            toast.error("File size must be less than 5 MB.");
            return;
        }

        onFileSelect(selectedFile);
    };

    const handleChange = (event) => {
        validateFile(event.target.files[0]);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);

        validateFile(event.dataTransfer.files[0]);
    };

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleChange}
            />

            <div
                onClick={() => inputRef.current.click()}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition
                    ${
                        isDragging
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                    }`}
            >
                {!file ? (
                    <>
                        <div className="text-5xl">📄</div>

                        <h3 className="mt-4 text-lg font-semibold">
                            Drop your resume here
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            or click to browse
                        </p>

                        <p className="mt-6 text-xs text-gray-400">
                            PDF only • Maximum 5 MB
                        </p>
                    </>
                ) : (
                    <>
                        <div className="text-5xl">✅</div>

                        <h3 className="mt-4 font-semibold">{file.name}</h3>

                        <p className="mt-2 text-sm text-gray-500">
                            {(file.size / 1024).toFixed(1)} KB
                        </p>

                        <p className="mt-6 text-blue-600 font-medium">
                            Click to change file
                        </p>
                    </>
                )}
            </div>
        </>
    );
};

export default ResumeDropzone;
