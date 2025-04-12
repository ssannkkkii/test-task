import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchSneakers, deleteSneaker } from '../slices/sneakersSlice';
import Modal from './DeleteModal';
import AddSneakerModal from './AddSneakersModal';
import { createSneaker } from '../slices/sneakersSlice';
import { Link } from 'react-router-dom'; 

const SneakerList: React.FC = () => {
  const dispatch = useAppDispatch();
  const sneakers = useAppSelector((state) => state.sneakers.sneakers);
  const status = useAppSelector((state) => state.sneakers.status);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSneakerId, setSelectedSneakerId] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState<'name' | 'price' | 'availability' | 'priceHighToLow' | 'priceLowToHigh'>('name');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSneakers());
    }
  }, [dispatch, status]);

  // Додано логування для перевірки отриманих продуктів
  useEffect(() => {
    console.log('Sneakers:', sneakers); // Перевірка кількості продуктів
  }, [sneakers]);

  const handleDeleteClick = (id: number) => {
    setSelectedSneakerId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedSneakerId !== null) {
      dispatch(deleteSneaker(selectedSneakerId));
      setIsModalOpen(false); 
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSneakerId(null);
  };

  const handleAddSneaker = (formData: FormData) => {
    dispatch(createSneaker(formData));
  };

  const sortedSneakers = [...sneakers]
    .filter((sneaker) => {
      if (sortOption === 'availability') {
        // Перевірка наявності розмірів зі складом
        return sneaker.sizes?.length && sneaker.sizes.some((size) => size.stock > 0);
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOption === 'priceLowToHigh') {
        return a.price - b.price;
      }

      if (sortOption === 'priceHighToLow') {
        return b.price - a.price;
      }

      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      }

      return 0;
    });

  return (
    <div className="sneaker-list-container">
      <div className="sorting-section">
        <label>Сортувати за: </label>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value as any)}>
          <option value="name">Назва (від А до Я)</option>
          <option value="priceLowToHigh">Ціна (від низької до високої)</option>
          <option value="priceHighToLow">Ціна (від високої до низької)</option>
          <option value="availability">Наявність розмірів</option>
        </select>
        <button className="add-button-header" onClick={() => setIsAddModalOpen(true)}>Додати</button>
      </div>
  
      {status === 'loading' ? (
        <div>Loading...</div>
      ) : status === 'failed' ? (
        <div>Error loading sneakers.</div>
      ) : (
        <div className="sneakers-grid">
          {sortedSneakers.length === 0 ? (
            <div>No sneakers available.</div>
          ) : (
            sortedSneakers.map((sneaker) => (
              <div key={sneaker.id} className="sneaker-card">
                <h3>
                  <Link to={`/sneaker/${sneaker.id}`}>{sneaker.name}</Link>
                </h3>
                <p>{sneaker.description}</p>
                <p>Price: ${sneaker.price}</p>
                <Link to={`/sneaker/${sneaker.id}`}>
                  <img className="sneaker-image" src={sneaker.image} alt={sneaker.name} />
                </Link>
                <button className="delete-button" onClick={() => handleDeleteClick(sneaker.id)}>Delete</button>
              </div>
            ))
          )}
        </div>
      )}

      <AddSneakerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSneaker}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this sneaker?"
      />
    </div>
  );
};

export default SneakerList;
