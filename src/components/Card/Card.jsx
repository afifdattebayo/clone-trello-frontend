import React, { useEffect, useState } from "react";
import { moveItem } from "../../api/items";
import { deleteTodo, getOneTodo, updateTodo } from "../../api/todos";
import AddCard from "../AddCard/AddCard";
import TextField from "../TextFiled/TextField";
import Title from "../Title/Title"
import "./card.css"

export default function Card({ todos, getTodosApi }) {
    const [editList, setEditList] = useState({
        status: false,
        id: '',
        name: '',
    });

    const [card, setCard] = useState([]);
    const [todoID, setTodoID] = useState(null);
    const [itemID, setItemID] = useState(null);
    const [hover, setHover] = useState(null);

    useEffect(() => {
        setCard(todos);
    }, [todos]);

    const toggleAddCard = (id) => {
        const _temp = [...card]
        _temp.forEach((card) => {
            if (card.id === id) {
                card.status = !card.status
            }
        })
        setCard(_temp)
        setTodoID(id)
    }
    const toggleEditList = async (id, status) => {
        try {
            const res = await getOneTodo(id)
            if (res.data.message === "success") {
                setEditList({
                    ...editList,
                    status: status,
                    id: res.data.data.id,
                    name: res.data.data.name
                })
            }
        } catch (error) {
            console.info(error);
        }
    }

    const deleteTodoApi = async (id) => {
        try {
            if (window.confirm("Yakin ingin hapus?")) {
                const res = await deleteTodo(id)
                if (res.data.message === "success deleted") {
                    getTodosApi()
                }
            }
        } catch (error) {
            console.info(error);
        }
    }
    const onEnter = async (e, id) => {

        try {
            if (e.keyCode === 13) {
                const payload = { name: editList.name }
                const res = await updateTodo(id, payload)
                if (res.data.message === "success") {
                    setEditList({
                        ...editList,
                        status: false,
                        id: "",
                        name: ""
                    })
                    getTodosApi()
                }
            }
        } catch (error) {
            console.info(error);
        }
    }
    const onChange = (e) => {
        setEditList({ ...editList, [e.target.name]: e.target.value })
    }

    const moveItemApi = async (todoID, itemID) => {
        try {
            const payload = {
                targetTodoId: todoID
            }
            const res = await moveItem(itemID, payload)
            if(res.data.message === "success"){
                getTodosApi()
            }
        } catch (error) {
            console.info(error);
        }
    }

    const toggleEditCard = (todoID, itemID) => {
        const _temp = [...card]
        _temp.forEach((card) => {
            if (card.id === todoID) {
                card.Items.forEach((item) => {
                    if (item.id === itemID) {
                        item.isEdit = !item.isEdit
                    }
                })
            }
        })
        setCard(_temp)
        setTodoID(todoID)
        setItemID(itemID)
    }

    return (
        <>
            {
                card.map((todo, i) => (

                    <div className="list" key={i}>
                        <div className="list-card">
                            {
                                editList.status && editList.id === todo.id
                                    ? <TextField
                                        name="name"
                                        value={editList.name}
                                        className="list-title-textarea"
                                        onChange={onChange}
                                        deleteList={() => deleteTodoApi(editList.id)}
                                        handleCancel={() =>
                                            setEditList({ ...editList, status: false, id: '', name: '' })
                                        }
                                        onEnter={(e) => onEnter(e, editList.id)}
                                    />
                                    : <Title
                                        onClick={() => toggleEditList(todo.id, true)}>{todo.name}</Title>

                            }
                            {
                                todo.Items.map((item, t) => (
                                    <React.Fragment key={t}>
                                        {!item.isEdit
                                            ? <div
                                                className="card"
                                                key={item.id}
                                                onMouseEnter={() => setHover(item.id)}
                                                onMouseLeave={() => setHover(null)}

                                            >
                                                {
                                                    hover === item.id &&
                                                    <div className="card-icons">
                                                        <div
                                                            className="card-icon"
                                                            onClick={() => toggleEditCard(todo.id, item.id)}
                                                        >
                                                            <ion-icon name='pencil-outline'></ion-icon>
                                                        </div>
                                                        {
                                                            i !== 0 &&
                                                            <div
                                                                className="card-icon"
                                                                onClick={() => moveItemApi(card[i - 1].id, item.id)}
                                                            >
                                                                <ion-icon name='arrow-back-outline'></ion-icon>
                                                            </div>

                                                        }
                                                        {
                                                            card.length - 1 !== i &&
                                                            <div
                                                                className="card-icon"
                                                                onClick={() => moveItemApi(card[i + 1].id, item.id)}
                                                            >
                                                                <ion-icon name='arrow-forward-outline'></ion-icon>
                                                            </div>
                                                        }
                                                    </div>
                                                }
                                                {item.name}
                                            </div>
                                            : <AddCard
                                                getTodosAPI={() => getTodosApi()}
                                                todoID={todoID}
                                                itemID={itemID}
                                                cancel={() => toggleEditCard(todo.id, item.id)}
                                            />

                                        }

                                    </React.Fragment>
                                ))
                            }
                            {
                                todo.status
                                    ? <AddCard
                                        getTodosAPI={() => getTodosApi()}
                                        todoID={todoID}
                                        adding
                                        cancel={() => toggleAddCard(todo.id)}
                                    />
                                    : <div
                                        className="toggle-add-card"
                                        onClick={() => toggleAddCard(todo.id)}
                                    >
                                        <ion-icon name="add-outline"></ion-icon>
                                    </div>
                            }
                        </div>
                    </div>
                ))
            }
        </>
    )
}
