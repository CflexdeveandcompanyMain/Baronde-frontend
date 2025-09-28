import React, { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Upload,
  Edit2,
  Trash2,
  Plus,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import {
  createTestimony,
  deleteTestimony,
  getTestimony,
  updateTestimony,
} from "../utils/fetch";

const TestimonialAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [formData, setFormData] = useState<{ caption: string; image: any }>({
    caption: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const {
    data: testimonials = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => getTestimony(),
  });

  const createMutation = useMutation({
    mutationFn: (formDataToSend: FormData) => createTestimony(formDataToSend),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      showAlert("Testimonial created successfully", "success");
      closeModal();
    },
    onError: (error: any) => {
      showAlert(error.message || "Failed to create testimonial", "error");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      formDataToSend,
    }: {
      id: string;
      formDataToSend: FormData;
    }) => updateTestimony(id, formDataToSend),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      showAlert("Testimonial updated successfully", "success");
      closeModal();
    },
    onError: (error: any) => {
      showAlert(error.message || "Failed to update testimonial", "error");
    },
  });

  // Delete testimonial mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTestimony(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      showAlert("Testimonial deleted successfully", "success");
    },
    onError: (error: any) => {
      showAlert(error.message || "Failed to delete testimonial", "error");
    },
  });

  const showAlert = (message: string, type: string) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result?.toString() || "");
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const openModal = (testimonial: any = null) => {
    setEditingTestimonial(testimonial);
    if (testimonial) {
      setFormData({ caption: testimonial.caption, image: null });
      setPreviewImage(testimonial.image);
    } else {
      setFormData({ caption: "", image: null });
      setPreviewImage("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
    setFormData({ caption: "", image: null });
    setPreviewImage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.caption.trim()) {
      showAlert("Caption is required", "error");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("caption", formData.caption);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    if (editingTestimonial) {
      updateMutation.mutate({
        id: editingTestimonial._id,
        formDataToSend,
      });
    } else {
      createMutation.mutate(formDataToSend);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) {
      return;
    }
    deleteMutation.mutate(id);
  };

  const removePreviewImage = () => {
    setPreviewImage("");
    setFormData({ ...formData, image: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isLoading_mutation =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Testimonials
          </h2>
          <p className="text-gray-600 mb-4">
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
          <button
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ["testimonials"] })
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-1 w-full">
      <div className="w-full flex flex-col items-center">
        <div className="bg-white rounded border border-gray-200 p-2 mb-3 w-full">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-base sm:text-xl font-all font-bold text-gray-900">
              Testimonial Management
            </h1>
            <button
              onClick={() => openModal()}
              className="bg-green-600 hover:bg-emerald-700 text-white p-1.5 sm:px-2 sm:py-2 rounded flex items-center gap-1 sm:gap-2 transition-colors"
            >
              <Plus className="w-3 sm:w-4 h-3 sm:h-4" />
              <span className="sm:text-base text-xs font-all">
                Add Testimonial
              </span>
            </button>
          </div>
        </div>

        {alert.show && (
          <div
            className={`p-2 rounded text-xs sm:text-sm font-medium mb-2 font-all flex items-center gap-2 w-full ${
              alert.type === "success"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            <AlertCircle className="w-5 h-5" />
            {alert.message}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Testimonials Grid */}
        {!isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 sm:gap-3 gap-1">
            {testimonials.map((testimonial: any) => (
              <div
                key={testimonial._id}
                className="bg-white rounded border border-gray-200 overflow-hidden"
              >
                <div className="aspect-video bg-gray-100 w-full">
                  <img
                    src={testimonial.image}
                    alt="Testimonial"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-start w-full p-2 w-full">
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3 font-all font-medium">
                    {testimonial.caption}
                  </p>
                  <div className="flex gap-2 w-full">
                    <button
                      onClick={() => openModal(testimonial)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 font-all text-gray-700 p-1.5 rounded text-sm flex items-center font-medium justify-center gap-1 transition-colors"
                    >
                      <Edit2 className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial._id)}
                      className="flex-1 bg-red-50 hover:bg-red-100 font-all text-red-600 p-1.5 rounded text-sm flex items-center font-medium justify-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && testimonials.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Upload className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-500 mb-2">
              No testimonials yet
            </h3>
            <p className="text-gray-400 mb-4">
              Get started by adding your first testimonial
            </p>
            <button
              onClick={() => openModal()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Add First Testimonial
            </button>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 w-full h-screen bg-black/70 flex justify-center items-center">
            <div className="sm:w-1/2 max-h-[90vh] overflow-y-auto mt-4 mb-4 mx-auto w-[95%] bg-white rounded-lg shadow-xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-200 w-full">
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingTestimonial
                    ? "Edit Testimonial"
                    : "Add New Testimonial"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 w-full">
                {/* Image Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {previewImage ? (
                      <div className="relative">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={removePreviewImage}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={triggerFileInput}
                        className="cursor-pointer py-8"
                      >
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          Click to upload image
                        </p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Caption */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Caption
                  </label>
                  <textarea
                    value={formData.caption}
                    onChange={(e) =>
                      setFormData({ ...formData, caption: e.target.value })
                    }
                    placeholder="Enter testimonial caption..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading_mutation}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    {isLoading_mutation ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {editingTestimonial ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        {editingTestimonial ? "Update" : "Create"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialAdmin;
