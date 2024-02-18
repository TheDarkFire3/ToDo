import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, editTodo } from 'redux/operations';
import { toast } from 'react-toastify';

const TodoItem = ({ todo, provided, snapshot }) => {
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const deleteTask = _id => {
    dispatch(deleteTodo(_id));
    toast.info('Удалено.');
  };

  const toggleTaskStatus = _id => {
    const updatedTask = { _id, completed: !todo.completed };
    dispatch(editTodo(updatedTask));
    toast('Выполнено ✨');
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = () => {
    if (editedTitle.trim() === '') {
      return toast.error('Поле не может быть пустым.');
    }

    if (editedTitle.trim() === todo.title) {
      return toast.error('Не удалось сохранить.');
    }

    const updatedTask = { ...todo, title: editedTitle };
    dispatch(editTodo(updatedTask));
    setEditable(false);
    toast.info('Сохранено.');
  };

  const handleCancel = () => {
    setEditedTitle(todo.title);
    setEditable(false);
  };

  const handleInputChange = event => {
    setEditedTitle(event.target.value);
  };

  if (!todo) {
    return null;
  }

  return (
    <div
      ref={provided.innerRef}
      snapshot={snapshot}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <li className="task">
        {editable ? (
          <input
            className="input-edit"
            type="text"
            value={editedTitle}
            onChange={handleInputChange}
            autoFocus
          />
        ) : (
          <span className={todo.completed ? 'checked' : 'none'}>
            {todo.title}
          </span>
        )}
        <div className="btn-wrapper">
          {editable ? (
            <>
              <button className="btn-save" onClick={handleSave}>
                Сохранить
              </button>
              <button className="btn-cancel" onClick={handleCancel}>
                Закрыть
              </button>
            </>
          ) : (
            <>
              <button className="btn-edit" onClick={handleEdit}>
                Изменить
              </button>
              <button
                className="btn-done"
                onClick={() => toggleTaskStatus(todo._id)}
              >
                Выполнено
              </button>
              <button
                className="btn-delete"
                onClick={() => deleteTask(todo._id)}
              >
                удалить
              </button>
            </>
          )}
        </div>
      </li>
    </div>
  );
};

export default TodoItem;
