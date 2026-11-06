import { useState } from 'react'
import AddOne from './AddOneBtn.jsx';
import RemoveThis from './RemThisBtn.jsx';

export default function Edu({ isEdit }) {

    // school name, title of study and date of study
    const createDataCont = () => {
        return {
            ID: crypto.randomUUID(),
            schoolName: '',
            degree: '',
            yearStart: '',
            yearEnd: ''
        }
    };
    const [schoolArray, setSchoolArray] = useState([createDataCont()]);

    const schoolContainer = (data) => {

        const schoolID = `school-name-${data.ID}`;
        const degreeID = `degree-${data.ID}`;
        const yearStartID = `year-start-${data.ID}`;
        const yearGradID = `year-graduated-${data.ID}`;

        const handleUpdate = (e) => {
            const val = e.target.value;
            const updateVal = key => {
                setSchoolArray(prev =>
                    prev.map(school => school.ID === data.ID
                        ? {...school, [key]: val}
                        : school
                    )
                )
            };
            switch(e.target.id) {
                case schoolID:
                    updateVal('schoolName');
                    break;
                case degreeID:
                    updateVal('degree');
                    break;
                case yearStartID:
                    updateVal('yearStart');
                    break;
                case yearGradID:
                    updateVal('yearEnd');
                    break;
                default:
                    console.error("error: IDs don't match");
            }
        };

        return (
            <div key={data.ID}>
                <label htmlFor={schoolID}>School</label>
                <input type="text" 
                    id={schoolID}
                    value={data.schoolName}
                    onChange={handleUpdate}
                    required
                />
                <label htmlFor={degreeID}>Degree</label>
                <input type="text" 
                    id={degreeID}
                    value={data.degree}
                    onChange={handleUpdate}
                    required
                />
                <label htmlFor={yearStartID}>Year Started</label>
                <input type="number" 
                    id={yearStartID} 
                    min="1900" 
                    max="2100" 
                    step="1"
                    value={data.yearStart}
                    onChange={handleUpdate}
                    required
                />
                <label htmlFor={yearGradID}>Year Graduated</label>
                <input type="number" 
                    id={yearGradID} 
                    min="1900" 
                    max="2100" 
                    step="1"
                    value={data.yearEnd}
                    onChange={handleUpdate}
                    required
                />
                <RemoveThis setArr={setSchoolArray} num={data.ID} />
            </div>
        );
    };

    const survey = (
        <>
            <legend>Education</legend>
            {schoolArray.map(data => schoolContainer(data))}
            <AddOne setArr={setSchoolArray} createCont={createDataCont}/>
        </>
    );

    const display = (
        <>
            {schoolArray.toSorted((a,b) => Number(b.yearEnd) - Number(a.yearEnd) ).map(data => {
                return (
                    <div key={data.ID}>
                        <h3>{data.degree}</h3>
                        <p>{data.schoolName}</p>
                        <p>{data.yearStart + ' - ' + data.yearEnd}</p>
                    </div>
                )
            })}
        </>
    );

    return (
        <fieldset className="Education">
            {isEdit ? survey : display}
        </fieldset>
    )
}