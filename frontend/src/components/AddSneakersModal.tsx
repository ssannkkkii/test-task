import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

const AddSneakerModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    price: '',
    brand_id: '',
    category_id: '',
    image: null as File | null,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, image: e.target.files?.[0] || null }));
    setError(null);
  };

  const handleSubmit = () => {
    const { name, description, price, brand_id, category_id, image } = formState;
    if (!name || !description || !price || !brand_id || !category_id || !image) {
      setError('Будь ласка, заповніть усі поля.');
      return;
    }

    const formData = new FormData();
    for (const key in formState) {
      if (formState[key as keyof typeof formState]) {
        formData.append(key, formState[key as keyof typeof formState] as string | Blob);
      }
    }
    onSubmit(formData);
    onClose();
    setFormState({
      name: '',
      description: '',
      price: '',
      brand_id: '',
      category_id: '',
      image: null,
    });
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Add New Sneaker</h3>

        {error && <p className="error-message">{error}</p>}

        <input name="name" placeholder="Name" value={formState.name} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={formState.description} onChange={handleChange} />
        <input name="price" type="number" placeholder="Price" value={formState.price} onChange={handleChange} />
        <input name="brand_id" type="number" placeholder="Brand ID" value={formState.brand_id} onChange={handleChange} />
        <input name="category_id" type="number" placeholder="Category ID" value={formState.category_id} onChange={handleChange} />
        <input type="file" name="image" onChange={handleFileChange} />

        <button onClick={handleSubmit}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddSneakerModal;
