import { useState } from 'react'
import AddOne from './AddOneBtn.jsx';
import RemoveThis from './RemThisBtn.jsx';

export default function Work({ isEdit }) {

    // company name
    // position title
    // main responsibilities
    // date from and until when you worked for that company
    const createDataCont = () => {
        return {
            ID: crypto.randomUUID(),
            companyName: '',
            role: '',
            responsible: ['','','','',''],
            yearStart: '',
            yearEnd: ''
        }
    };
    const [ workArray, setWorkArray ] = useState([createDataCont()]);

    const workContainer = (data) => {

        const companyID = `company-${data.ID}`;
        const positionID = `position-${data.ID}`;
        const responID = `respon-${data.ID}`;
        const yearStartID = `year-start-${data.ID}`;
        const yearEndID = `year-end-${data.ID}`;

        const handleUpdate = (e) => {
            const val = e.target.value;

            if (e.target.id.at(-1) === '_') {
                const ind = Number(e.target.id.slice(0, -1));
                setWorkArray(prev => 
                    prev.map(company => company.ID === data.ID
                        ? {...company, responsible: [...company.responsible.slice(0,ind), val, ...company.responsible.slice(ind+1)]}
                        : company
                    )
                )
                return;
            }

            const updateVal = key => {
                setWorkArray(prev =>
                    prev.map(company => company.ID === data.ID
                        ? {...company, [key]: val}
                        : company
                    )
                )
            };
            switch(e.target.id) {
                case companyID:
                    updateVal('companyName');
                    break;
                case positionID:
                    updateVal('role');
                    break;
                case yearStartID:
                    updateVal('yearStart');
                    break;
                case yearEndID:
                    updateVal('yearEnd');
                    break;
                default:
                    console.error("error: IDs don't match");
            }
        };

        return (
            <div key={data.ID}>
                <label htmlFor={companyID}>Company Name</label>
                <input type="text" 
                    id={companyID}
                    value={data.companyName}
                    onChange={handleUpdate}
                    required
                />
                <label htmlFor={positionID}>Position Title</label>
                <input type="text" 
                    id={positionID}
                    value={data.role}
                    onChange={handleUpdate}
                    required
                />
                <label htmlFor={yearStartID}>Year Started</label>
                <input type="number" 
                    id={yearStartID}
                    value={data.yearStart}
                    onChange={handleUpdate}
                    required
                />
                <label htmlFor={yearEndID}>Year Left</label>
                <input type="number" 
                    id={yearEndID}
                    value={data.yearEnd}
                    onChange={handleUpdate}
                    required
                />
                <label htmlFor={responID}>Role Responsibilities</label>
                <ol id={responID}>
                    {data.responsible.map((res,ind) => 
                        <li key={ind}>
                            <input type="text"
                                id={String(ind) + '_'}
                                value={res}
                                onChange={handleUpdate}
                            />
                        </li>
                    )}
                </ol>
                <RemoveThis setArr={setWorkArray} num={data.ID} />
            </div>
        )
    };

    const survey = (
        <>
            <legend>Work Experience</legend>
            {workArray.map(data => workContainer(data))}
            <AddOne setArr={setWorkArray} createCont={createDataCont}/>
        </>
    );

    const display = (
        <>
            {workArray.toSorted((a,b) => Number(b.yearEnd) - Number(a.yearEnd) ).map(data => {
                return (
                    <div key={data.ID}>
                        <h3>{data.role}</h3>
                        <p>{data.companyName}</p>
                        <p>{data.yearStart + ' - ' + data.yearEnd}</p>
                        <ul>
                            {data.responsible.filter(res => res !== '').map((res,ind) => 
                                <li key={data.ID + ind}>{res}</li>
                            )}
                        </ul>
                    </div>
                )
            })}
        </>
    );

    return (
        <fieldset className="Work">
            {isEdit ? survey : display}
        </fieldset>
    )
}