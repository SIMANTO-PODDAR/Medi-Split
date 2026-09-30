"use client";

import { useEffect, useState } from "react";
import { getSavedProducts, updateProduct, deleteProduct, clearAllProducts } from "@/lib/storage";
import type { SavedProduct } from "@/lib/types";
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";

export default function AllMedicinesPage() {
  const [medicines, setMedicines] = useState<SavedProduct[]>([]);
  const [editingName, setEditingName] = useState<string | null>(null);
  const [editFormName, setEditFormName] = useState("");
  const [editFormPrice, setEditFormPrice] = useState<number | "">("");
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setMedicines(getSavedProducts());
    setIsMounted(true);
  }, []);

  const handleEditClick = (med: SavedProduct) => {
    setEditingName(med.name);
    setEditFormName(med.name);
    setEditFormPrice(med.price);
  };

  const handleCancelEdit = () => {
    setEditingName(null);
  };

  const handleSaveEdit = (oldName: string) => {
    if (!editFormName.trim() || editFormPrice === "" || editFormPrice < 0) return;
    updateProduct(oldName, editFormName, editFormPrice as number);
    setMedicines(getSavedProducts());
    setEditingName(null);
  };

  const handleDelete = (name: string) => {
    deleteProduct(name);
    setMedicines(getSavedProducts());
  };

  const handleClearAll = () => {
    clearAllProducts();
    setMedicines([]);
    setIsClearModalOpen(false);
  };

  if (!isMounted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
        <div className="h-32 bg-gray-100 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Medicines</h1>
        {medicines.length > 0 && (
          <button 
            onClick={() => setIsClearModalOpen(true)}
            className="text-sm bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors font-medium flex items-center gap-2"
          >
            <FiTrash2 />
            <span className="hidden sm:inline">Clear All Medicines</span>
            <span className="sm:hidden">Clear All</span>
          </button>
        )}
      </div>
      
      {medicines.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No medicines saved yet.</h3>
          <p className="text-gray-500">Medicines added from the calculator will appear here.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {medicines.map((med) => (
            <div 
              key={med.name} 
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow gap-4"
            >
              {editingName === med.name ? (
                <div className="flex-1 flex flex-col sm:flex-row gap-3">
                  <input 
                    type="text" 
                    value={editFormName}
                    onChange={(e) => setEditFormName(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto flex-1 max-w-sm"
                    placeholder="Medicine Name"
                    autoFocus
                  />
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">৳</span>
                    <input 
                      type="number" 
                      value={editFormPrice}
                      onChange={(e) => setEditFormPrice(e.target.value ? Number(e.target.value) : "")}
                      className="border border-gray-300 rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-32"
                      placeholder="Price"
                      min="0"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                  <span className="font-semibold text-gray-800 text-lg sm:text-base">{med.name}</span>
                  <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm inline-flex w-fit">
                    ৳{med.price}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 justify-end">
                {editingName === med.name ? (
                  <>
                    <button 
                      onClick={() => handleSaveEdit(med.name)} 
                      className="p-2 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors" 
                      title="Save"
                    >
                      <FiCheck size={18} />
                    </button>
                    <button 
                      onClick={handleCancelEdit} 
                      className="p-2 text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" 
                      title="Cancel"
                    >
                      <FiX size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => handleEditClick(med)} 
                      className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" 
                      title="Edit"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(med.name)} 
                      className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors" 
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      {isClearModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Clear all medicines?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove all saved medicines? This action cannot be undone.
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button 
                onClick={() => setIsClearModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}