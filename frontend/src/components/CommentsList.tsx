import React from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { deleteComment } from '../slices/commentSlice';
import { useSelector } from 'react-redux';
import { selectCommentsByProductId } from '../slices/commentSlice';
import { RootState } from '../store';

interface Comment {
  id: number;
  description: string;
  product: number; 
}

const CommentsList = ({ productId }: { productId: number }) => {
  const comments = useSelector((state: RootState) => selectCommentsByProductId(state, productId));
  const dispatch = useAppDispatch();

  const handleDelete = (id: number) => {
    dispatch(deleteComment(id));
  };

  return (
    <div>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.description}</p>
              <button onClick={() => handleDelete(comment.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default CommentsList;
