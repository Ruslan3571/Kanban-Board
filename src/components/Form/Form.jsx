import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import './Form.scss';

function Form(props) {
  const init = { taskTitle: '' };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'reset':
        return init;
      case 'change':
        const { name, value } = action.element;
        return { ...state, [name]: value };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, init);
  const { taskTitle } = state;

  const { getNewTask } = props;

  const formValidation = errors => {
    if (taskTitle.length < 2) errors.push('Task name is required');
  };

  const addTask = e => {
    e.preventDefault();

    const newTask = {
      id: uuid(),
      title: taskTitle,
    };
    const errors = [];
    formValidation(errors);

    if (errors.length === 0) {
      getNewTask(newTask);
      dispatch({ type: 'reset' });
    } else {
      alert(errors.join(',\n '));
    }
  };

  return (
    <form className="form" onSubmit={addTask}>
      <div className="form__container">
        <label>
          <input
            style={{ width: '500px' }}
            name="taskTitle"
            value={taskTitle}
            type="text"
            onChange={e => dispatch({ type: 'change', element: e.target })}
            placeholder="Enter repo URL"
            required
          />
        </label>
        <input type="submit" value="Load issues" className="form__submit" />
      </div>
    </form>
  );
}

export default Form;
