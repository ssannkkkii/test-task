import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchSneakers } from '../slices/sneakersSlice';
import CommentsList from './CommentsList';
import { createComment } from '../slices/commentSlice';
import { fetchComments } from '../slices/commentSlice';

const SneakerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const sneakers = useAppSelector((state) => state.sneakers.sneakers);
  const sneaker = sneakers.find((s) => s.id === parseInt(id || ''));

  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    if (!sneaker) {
      dispatch(fetchSneakers());
      dispatch(fetchComments());
    }
  }, [dispatch]);

  const handleAddComment = () => {
    if (sneaker && newComment.trim()) {
      dispatch(createComment({ sneakerId: sneaker.id, description: newComment }));
      setNewComment('');
    }
  };

  if (!sneaker) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sneaker-details">
  <div className="sneaker-block">
    <div className="sneaker-image">
      <img src={sneaker.image} alt={sneaker.name} />
    </div>
    <div className="sneaker-info">
      <h2>{sneaker.name}</h2>
      <p>{sneaker.description}</p>
      <p><strong>Price:</strong> ${sneaker.price}</p>
      {sneaker?.brand?.name && <p><strong>Brand:</strong> {sneaker.brand.name}</p>}
      {sneaker?.category?.name && <p><strong>Category:</strong> {sneaker.category.name}</p>}
    </div>
  </div>

  <div className="comment-section">
    <h3>Add a Comment</h3>
    <textarea
      className="comment-textarea"
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      placeholder="Write your comment"
    />
    <button className="btn add-comment-btn" onClick={handleAddComment}>Add Comment</button>
  </div>

  <CommentsList productId={sneaker.id} />
</div>

  );
};

export default SneakerDetail;
