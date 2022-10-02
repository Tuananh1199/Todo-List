import { NewTask } from "../page/new-task/new-task"
import { TodoList } from "../page/todo-list/todo-list"
import "./layout.css"

export const Layout = () => {
  return (
    <div className="container">
      <NewTask />
      <TodoList />
    </div>
  )
}