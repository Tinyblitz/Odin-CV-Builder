import { useState } from 'react'
import '../styles/GenInfo.css'

export default function GenInfo( {isEdit} ) {

    const [name, setName] = useState({firstName: '', lastName: ''});
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const survey = (
        <>
            <legend>General Information</legend>
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name"
                value={name.firstName}
                onChange={(e) => setName({...name, firstName: e.target.value})}
                required
            />
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name"
                value={name.lastName}
                onChange={(e) => setName({...name, lastName: e.target.value})}
                required
            />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" 
                pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+[.][a-zA-Z]{2,}"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="phone-number">Phone Number</label>
            <input type="tel" id="phone-number" 
                pattern="[(]?[0-9]{3}[)]?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}"
                placeholder="(123) 456-7890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
        </>
    );

    const display = (
        <>
            <h2>{name.firstName + ' ' + name.lastName}</h2>
            <p>{email}</p>
            <p>{phoneNumber}</p>
        </>
    );
    return (
        <fieldset className="GenInfo">
            {isEdit ? survey : display}
        </fieldset>
    )
}