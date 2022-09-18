import { useEffect } from "react";
import { useState } from "react";
import { getTodos } from "../../api/todos";
import AddList from "../../components/AddList/AddList";
import Board from "../../components/Board/Board"
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header"
import "./home.css"

export default function Home() {
  const [isToggleList, setIsToggleList] = useState(false);
  const [todos, setTodos] = useState([]);


  const getTodosApi = async () => {
    try {
      const res = await getTodos()
      
      res.data.data.forEach((res) => {
        res.status = false;
        res.Items.forEach((item)=>{
          item.isEdit = false
        })
      })

      setTodos(res.data.data)
    } catch (error) {
      console.info(error);
    }
  }

  useEffect(() => {
    getTodosApi()
  }, [])

  return (
    <>
      <Header>Mern Clone Trello</Header>
      <Board>
        <Card todos={todos} getTodosApi={() => getTodosApi()} />
        <div className="add-list">
          {
            isToggleList
              ? <AddList
                handleCancel={() => setIsToggleList(false)}
                getTodosApi={() => getTodosApi()}
              />
              : (

                <div className="add-list-button" onClick={() => setIsToggleList(true)}>
                  <ion-icon name='add-outline'></ion-icon>
                  Add  a list</div>
              )
          }
        </div>
      </Board>
    </>
  )
}
