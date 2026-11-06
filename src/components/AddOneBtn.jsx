export default function AddOne({ setArr, createCont }) {
    return (
        <button type="button" onClick={() =>
            setArr(prev => [...prev, createCont()])
        }>Add</button>
    )
}