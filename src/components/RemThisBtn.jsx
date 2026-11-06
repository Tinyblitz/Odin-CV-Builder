export default function RemoveThis({ setArr, num }) {
    return (
        <button type="button" onClick={() => {
            setArr(prev => prev.filter(_d => _d.ID !== num));
        }}>X</button>
    )
}