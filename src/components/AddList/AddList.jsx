import { useState } from "react";
import { createTodo } from "../../api/todos";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import TextField from "../TextFiled/TextField"
import "./addList.css"

export default function AddList({ handleCancel, getTodosApi }) {
    const [name, setName] = useState("");

    const handleClear = () => {
        setName("")
        handleCancel()
    }
    const saveTodos = async () => {
        try {
            const payload = { name: name }
            const res = await createTodo(payload)
            if (res.data.message === "success") {
                getTodosApi();
                handleClear();
            }
        } catch (error) {
            console.info(error);
        }
    }
    return (
        <div className="add-list-editor">
            <TextField
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter list title"
                className="list-title-textarea"
            />
            <ButtonGroup
                saveLabel="Add list"
                handleCancel={handleCancel}
                handleSave={() => saveTodos()}
            />
        </div>
    )
}
