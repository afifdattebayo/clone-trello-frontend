import "./title.css"

export default function Title({ onClick, children }) {
    return (
        <div className="list-title" onClick={onClick}>
            {children}
        </div>
    )
}
