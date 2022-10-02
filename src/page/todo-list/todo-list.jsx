import styled from "styled-components";

const TodoListContainer = styled.div`
    .content {
      padding: 30px;
      display: grid;
      gap: 30px;
    }
    .rows {
      display: grid;
      grid-template-columns: 47% 47%;
      gap: 6%;
      margin-bottom: 25px;
    }
`

export const TodoList = (props) => {
  return (
    <div className="rounded todo-list">
      <TodoListContainer>
        <div className="title">
          To do list
        </div>
      </TodoListContainer>
    </div>
  )
}