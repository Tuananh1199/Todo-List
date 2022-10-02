import { useState } from "react";
import { NewTask } from "../page/new-task/new-task"
import { TodoList } from "../page/todo-list/todo-list"
import "./layout.css"

export const Layout = () => {
  const [refresh, setRefresh] = useState(0);
  return (
    <div className="container">
      <NewTask refresh={refresh} handleRefresh={setRefresh} />
      <TodoList refreshData={refresh} />
    </div>
  )
}