import "./textField.css"
import TextareaAutosize from "react-textarea-autosize";

export default function TextField({
    name,
    value,
    onChange,
    placeholder,
    className,
    deleteList,
    handleCancel,
    onEnter,
}) {
    return (
        <div className="list-title-edit">
            <TextareaAutosize
                autoFocus
                className={className}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{ width: deleteList ? 200 : 1000 }}
                onKeyDown={onEnter}
            />
            {
                deleteList && (
                    <>
                        <ion-icon name='trash-outline' onClick={deleteList}></ion-icon>
                        <ion-icon name='close' onClick={handleCancel}></ion-icon>
                    </>
                )
            }
        </div>
    )
}
