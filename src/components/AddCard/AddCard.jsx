import { useEffect } from "react";
import { useCallback, useState } from "react";
import { createItem, deleteItem, getOneItem, updateItem } from "../../api/items";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import TextField from "../TextFiled/TextField";

export default function AddCard({
    getTodosAPI,
    todoID,
    itemID,
    adding,
    cancel,
}) {

    const [name, setName] = useState('');
    const onChange = (e) => {
        setName(e.target.value)
    }

    const clear = () => {
        setName("")
        cancel();
    }

    const saveItemApi = async () => {
        try {
            const payload = {
                name: name,
                TodoId: todoID
            }
            const res = await createItem(payload)
            if (res.data.message === "success") {
                getTodosAPI()
                clear()
            }
        } catch (error) {
            console.info(error);
        }
    }

    const updateItemApi = async () => {
        try {
            const payload = {
                name: name
            }
            const res = await updateItem(itemID, payload)
            if (res.data.message === "success") {
               getTodosAPI()
               clear();
            }
        } catch (error) {
            console.info(error);
        }
    }
    const getOneItemApi = useCallback(async () => {
        try {
            if (itemID !== undefined) {
                const res = await getOneItem(itemID)
                if (res.data.message === "success") {
                    setName(res.data.data.name)
                }
            }
        } catch (error) {
            console.info(error);
        }
    }, [itemID])

    const deleteItemApi = async (id)=>{
        try {
            const res = await deleteItem(id)
            if(res.data.message === "success deleted"){
                getTodosAPI()
                clear();
            }
        } catch (error) {
            console.info(error);
        }
    }
    useEffect(() => {
        getOneItemApi()
    }, [getOneItemApi])
    return (
        <div className="edit-card">
            <div className="card">
                <TextField
                    className="edit-card-textarea"
                    name="name"
                    value={name}
                    placeholder='Enter a title for this card'
                    onChange={onChange}
                />
            </div>
            <ButtonGroup
                handleSave={() => adding
                    ? saveItemApi()
                    : updateItemApi()
                }
                saveLabel={adding ? 'Add card' : 'Edit card'}
                handleCancel={cancel}
                handleDelete={() => deleteItemApi(itemID)}
            />
        </div>
    )
}
