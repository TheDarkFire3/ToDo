import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { addTodo } from 'redux/operations';

const InputForm = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = e => {
    setInputValue(e.target.value || '');
  };

  const addTask = () => {
    if (inputValue.trim() === '') {
      return toast.error('Поле не может быть пустым.');
    }

    const newTask = {
      title: inputValue.trim(),
      completed: false,
    };

    dispatch(addTodo(newTask));
    toast.success('Добавлено');
    setInputValue('');
  };

  return (
    <div className="add-task">
      <input
        className="input-task"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Ввод"
      />
      <button className="btn-task" onClick={addTask}>
        Добавить
      </button>
    </div>
  );
};

export default InputForm;
