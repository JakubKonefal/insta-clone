import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteOutline } from '@material-ui/icons';
import classes from './SingleComment.module.css';
import { deleteComment } from '../actions/postActions';

const SingleComment = ({ author, id, postId, content }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('auth-token');
  const clientId = useSelector(state => state.auth.user);

  return (
    <div className={classes.Comment}>
      <Link
        to={`/profile/${author.id}`}
        className={classes.Comment__AuthorName}
      >
        {`${author.firstName} ${author.lastName}`}
      </Link>
      <p className={classes.Comment__Content}>{content}</p>
      {clientId === author.id ? (
        <DeleteOutline
          className={classes.Comment__DeleteBtn}
          onClick={() => dispatch(deleteComment(token, id, postId))}
        />
      ) : null}
    </div>
  );
};

export default SingleComment;
