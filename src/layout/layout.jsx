import { NewTask } from "../page/new-task/new-task"
import { TodoList } from "../page/todo-list/todo-list"

export const Layout = () => {
  return (
    <div>
      <NewTask />
      <TodoList />
    </div>
  )
}