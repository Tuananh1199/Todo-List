import { useState } from "react";
import { toast } from "react-toastify";
import { InputDueDate } from "../../component/input-date";
import { InputField } from "../../component/input-field";
import { SelectPriority } from "../../component/select-piority";
import "./task-detail.css"

const updateTask = (task) => {
  return new Promise((resolve, reject) => {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.map((item) => {
      if (task.id === item.id) {
        return task
      }
      return item;
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
    if (tasks) {
      resolve('success')
    } else {
      reject('error')
    }
  })
}

const removeTask = (task) => {
  return new Promise((resolve, reject) => {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter((item) => item.id !== task.id)
    localStorage.setItem('tasks', JSON.stringify(tasks));
    if (tasks) {
      resolve('success')
    } else {
      reject('error')
    }
  })
}

export const TaskDetail = (props) => {
  const { data, refresh, handleRefresh, handleBulkAction, bulkAction } = props;
  const [task, setTask] = useState(data);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDisplay, setIsDisplay] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [checked, setChecked] = useState(bulkAction.includes(task.id))
  const handleChange = (value, field) => {
    let newTask = task;
    newTask[field] = value;
    setTask(newTask)
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    updateTask(task)
      .then(
        (result) => {
          toast.success("Update task successfully");
          handleRefresh(refresh + 1)
        },
        (error) => {
          toast.error("Update task failure");
          setIsSubmitting(false);
        }
      )
      .finally(() => {
        setIsSubmitting(false)
      })
  }
  return (
    <div key={task.id} className="task-container">
      <div className="task-title">
        <div className="checkbox">
          <input
            type="checkbox"
            className="input-checkbox"
            checked={checked}
            onChange={() => {
              let newBulkAction = [...bulkAction];
              if (bulkAction.includes(task.id)) {
                newBulkAction = newBulkAction.filter(item => item !== task.id);
              } else {
                newBulkAction.push(task.id);
              }
              handleBulkAction(newBulkAction);
              setChecked(!checked)
            }} />
          <div className="title">{task.title}</div>
        </div>
        <div className="btn-container">
          <button className="btn-detail rounded" onClick={() => setIsDisplay(!isDisplay)}>Detail</button>
          <button className="btn-remove rounded" onClick={() => {
            removeTask(task)
              .then(
                (result) => {
                  toast.success("Remove task successfully");
                  handleRefresh(refresh + 1)
                },
                (error) => {
                  toast.error("Remove task failure");
                  setIsSubmitting(false);
                }
              )
          }}>Remove</button>
        </div>
      </div>
      <div style={{ display: !isDisplay ? "none" : "" }}>
        <hr />
        <div className="detail">
          <InputField
            title="Title"
            field="title"
            disabled={isSubmitting}
            defaultValue={task.title}
            handleDisable={setDisabled}
            handleChange={handleChange}
            placeHolder="Add new task ..."
            required
          />
          <InputField
            title="Description"
            field="description"
            defaultValue={task.description}
            disabled={isSubmitting}
            handleChange={handleChange}
            inputType="textarea"
          />
          <div className="rows">
            <InputDueDate defaultValue={new Date(task.dueDate)} handleChange={handleChange} disabled={isSubmitting} />
            <SelectPriority defaultValue={task.piority} handleChange={handleChange} disabled={isSubmitting} />
          </div>
          <button
            disabled={isSubmitting || disabled}
            className="btn-add rounded"
            style={{ backgroundColor: (isSubmitting || disabled) ? "#9ca3af" : "#04AA6D" }}
            variant="primary"
            type="submit"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleSubmit();
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  )
}