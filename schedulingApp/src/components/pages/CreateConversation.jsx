import React, { useState } from 'react';


export default function CreateConversation() {
    const [membersValue, setMembersValue] = useState('');

    /*const handleSubmit = async () => {
        console.log([membersValue, user.email])
        let response = await axios.post('http://localhost:8000/messages/create-conversation', {
            emails: [membersValue, user.email]
        }, {
            withCredentials: true,
        })
        navigate(`/message?mem_hash=${response.data.mem_hash}`)
    }*/

    return (
        <>
            <input type='text' name='members' value={membersValue} placeholder='Add Members'
                   onChange={e => setMembersValue(e.target.value)}/>
            <button type='submit' name='submitButton'/>
        </>
    )
}