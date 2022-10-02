import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { LoadingPage } from "../../layout/loading-page";
import { InputFilter } from "./filter";
import { TaskDetail } from "./task-detail";
import get from "lodash/get";
import queryString from 'query-string';
import { useLocation } from "react-router-dom";

const TodoListContainer = styled.div`
    .content {
      padding: 30px;
      display: grid;
      gap: 20px;
    }
    .rows{
      display: grid;
      gap: 30px;
    }
    .loading-page {
      display: flex;
      justify-content: center;
    }
    .img-no-data {
      width: 400px;
    }
    .list-task {
      display: grid;
      gap: 30px;
      overflow: auto;
    }
    @media (min-width: 768px) {
      .content {
        gap: 30px;
      }
      .rows {
        display: grid;
        grid-template-columns: 47% 47%;
        gap: 6%;
        margin-bottom: 25px;
      }
    }
`
const removeTasks = (bulkAction) => {
  return new Promise((resolve, reject) => {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter((item) => !bulkAction.includes(item.id))
    localStorage.setItem('tasks', JSON.stringify(tasks));
    if (tasks) {
      resolve('success')
    } else {
      reject('error')
    }
  })
}

const convertString = (s) => {
  let str = s.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
}

export const TodoList = (props) => {
  const { refreshData } = props;
  const location = useLocation();
  const params = queryString.parse(location.search);
  const paramsSearch = get(params, 'title');
  const [keySearch, setKeySearch] = useState(paramsSearch)
  const [tasks, setTasks] = useState();
  const [refresh, setRefresh] = useState(0);
  const [bulkAction, setBulkAction] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await JSON.parse(localStorage.getItem('tasks'));
      let dataFilter = data
      if (keySearch && keySearch !== "") {
        dataFilter = dataFilter.filter((item) => {
          let convertData = convertString(item.title);
          let convertKeySearch = convertString(keySearch)
          return convertData.includes(convertKeySearch)
        })
      }
      let dataSortDate = dataFilter ? dataFilter.sort(function (a, b) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }) : null;
      setTasks(dataSortDate)
    }
    fetchData();
  }, [refresh, refreshData, keySearch]);

  if (tasks === undefined) {
    return (
      <div className="rounded todo-list">
        <TodoListContainer>
          <div className="title">
            To Do List
          </div>
          <div className="loading-page">
            <LoadingPage />
          </div>
        </TodoListContainer>
      </div>
    )
  }

  return (
    <div className="rounded todo-list">
      <TodoListContainer>
        <div className="title">
          To Do List
        </div>
        <div className="content">
          <InputFilter defaultValue={keySearch} handleChange={setKeySearch} />
          <div className="list-task">
            {tasks && tasks.length ? tasks?.map((item) => {
              return (
                <TaskDetail
                  data={item}
                  key={item.id}
                  refresh={refresh}
                  handleRefresh={setRefresh}
                  bulkAction={bulkAction}
                  handleBulkAction={setBulkAction}
                />
              )
            }) :
              (
                <div className="loading-page">
                  <img src="/assets/img-no-data.png" className="img-no-data" alt="no data" />
                </div>
              )
            }
          </div>
        </div>
      </TodoListContainer>
      {bulkAction?.length !== 0 && <div className="bulk-action">
        Bulk Action:
        <div>
          <button className="btn-detail rounded" onClick={() => { }}>Done</button>
          <button className="btn-remove rounded" onClick={() => {
            removeTasks(bulkAction)
              .then(
                (result) => {
                  toast.success("Remove task successfully");
                  setRefresh(refresh + 1);
                  setBulkAction([]);
                },
                (error) => {
                  toast.error("Remove task failure");
                }
              )
          }}>Remove</button>
        </div>
      </div>
      }
    </div>
  )
}