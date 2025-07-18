import { useState, useCallback } from "react";
import { Upload, X, Image } from "lucide-react";

interface ImageData {
  id: number;
  file: File;
  url: string;
  name: string;
}

export default function ImageUpload({ set }: { set: (files: File[]) => void }) {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useCallback(() => {
    const files = images.map((img) => img.file);
    set(files);
    console.log(files);
  }, [images]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files: File[] = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const remainingSlots = 4 - images.length;
    const filesToAdd = imageFiles.slice(0, remainingSlots);

    filesToAdd.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum size is 10MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const newImage: ImageData = {
          id: Date.now() + Math.random(),
          file: file,
          url: e.target?.result as string,
          name: file.name,
        };
        setImages((prev) => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const canUploadMore = images.length < 4;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Product Images
      </h2>

      {canUploadMore && (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">
            <span className="font-medium">Click to upload</span> or Drag and
            Drop
          </p>
          <p className="text-sm text-gray-500 mb-4">
            JPG, PNG, GIF. Max size: 10MB
          </p>
          <p className="text-sm text-gray-500 mb-4">
            {images.length}/4 images uploaded
          </p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          >
            Choose Files
          </label>
        </div>
      )}

      {images.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4 text-gray-800">
            Uploaded Images ({images.length}/4)
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => removeImage(image.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
                <p className="mt-2 text-sm text-gray-600 truncate">
                  {image.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {images.length >= 4 && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <Image className="h-5 w-5 text-blue-600 mr-2" />
            <p className="text-sm text-blue-800">
              Maximum of 4 images reached. Remove an image to upload more.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
