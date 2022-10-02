import { InputDueDate } from "../../component/input-date";
import { InputField } from "../../component/input-field";
import { SelectPriority } from "../../component/select-piority";
import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

const NewTaskContainer = styled.div`
    .content {
      padding: 0px 30px;
      display: grid;
      gap: 30px;
    }
    .rows {
      display: grid;
      grid-template-columns: 47% 47%;
      gap: 6%;
      margin-bottom: 25px;
    }
    .note {
      font-weight: 600;
    }
`
const initValue = {
  title: "",
  dueDate: new Date(),
  description: "",
  piority: "Normal",
  status: "Incomplete",
}

const addNewTask = (task) => {
  return new Promise((resolve, reject) => {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let id = Math.random().toString(36).substring(7)
    const newTask = {
      ...task,
      id: tasks ? tasks.length + id : 0 + id
    }
    tasks = tasks ? [...tasks, newTask] : [newTask];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    if (tasks) {
      resolve('success')
    } else {
      reject('error')
    }
  })
}

export const NewTask = (props) => {
  const { refresh, handleRefresh } = props;
  const [task, setTask] = useState(initValue);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleChange = (value, field) => {
    let newTask = task;
    newTask[field] = value;
    setTask(newTask)
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    addNewTask(task)
      .then(
        success => {
          toast.success("Add new task successfully");
          handleRefresh(refresh + 1);
        },
        error => {
          toast.error("Add new task failure");
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      })
  }

  return (
    <div className="rounded new-task">
      <NewTaskContainer>
        <div className="title">
          New Task
        </div>
        <form>
          <div className="content">
            <i>
              <span className="note">Note:</span> <span>Title is required. Due date has the default value which is today, do not accept days in the
                past as due date </span>
            </i>
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
              <InputDueDate defaultValue={task.dueDate} handleChange={handleChange} disabled={isSubmitting} />
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
              Add
            </button>
          </div>
        </form>
      </NewTaskContainer>
    </div>
  )
}