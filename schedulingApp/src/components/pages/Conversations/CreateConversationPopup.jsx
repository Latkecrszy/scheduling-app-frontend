import React, { useState } from "react";
import { useUIContext } from "../MessagePage/contexts/UIContext.jsx";
import { useUserContext} from "../MessagePage/contexts/UserContext.jsx";
import Blur from "../../parts/Blur.jsx"
import EmailInput from "./EmailInput.jsx";
import ActionButtons from "../../parts/ActionButtons.jsx";
import axios from "axios";
import NoActionPopup from "../../parts/NoActionPopup.jsx";


export default function CreateConversationPopup({setConversationCreated}) {
    const [emailValue, setEmailValue] = useState("");
    const [emails, setEmails] = useState([]);
    const { activePopup, setActivePopup } = useUIContext();
    const { user } = useUserContext();

    async function createConversation() {
        try {
            await axios.post('https://scheduling-app-backend-b4fcac504465.herokuapp.com/messages/create-conversation',
                {emails: [...emails, user.email]},
                {withCredentials: true})
            setConversationCreated(true)
            setActivePopup('')
        } catch (err) {
            const status = err.response?.status;
            if (status === 409) {
                setActivePopup('conversationExists');
            } else if (status === 404) {
                setActivePopup('userNotFound');
            } else {
                console.error('Unexpected error:', err);
            }
        }


    }

    return ((activePopup === 'createConversation' || activePopup === 'conversationExists' || activePopup === 'userNotFound') && (
        <Blur>
            {activePopup === 'createConversation' && (
                <div className="bg-green-50 rounded-2xl shadow-2xl p-6 w-96 space-y-4 z-50 transform transition-transform -mt-40
                duration-300 ease-out translate-y-4 opacity-0 animate-fade-in-up">
                    <h2 className="text-2xl font-semibold text-green-800">New Conversation</h2>
                    <p className="text-green-700 text-sm">
                        Enter the emails of people you want to add to this conversation.
                    </p>
                    <EmailInput emailValue={emailValue} setEmailValue={setEmailValue} emails={emails} setEmails={setEmails}/>
                    <ActionButtons submitFunction={createConversation} cancelFunction={() => {setActivePopup('')}}
                                   submitButtonText='Create' cancelButtonText='Cancel' completed={emails.length > 0}
                    />
                </div>
            )}
            <NoActionPopup name='conversationExists' headerText='Conversation Already Exists' buttonText='Return'
                           subText='You are already in a conversation with these people.' color='red'
                           closeFunction={() => {setActivePopup('createConversation')}}
            />
            <NoActionPopup name='userNotFound' headerText='User Not Found' color='red' buttonText='Return'
                           subText='There is no user with that email address.'
                           closeFunction={() => {setActivePopup('createConversation')}}
            />
        </Blur>
    ))
}
