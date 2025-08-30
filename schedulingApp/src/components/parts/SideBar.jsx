import Availability from "../../assets/images/availability.svg";
import Conversations from "../../assets/images/conversations.svg";
import Messages from "../../assets/images/messages.svg";
import React from "react";


export default function SideBar({page}) {
    return (
        <div className="flex flex-col -mt-25 w-12 h-60 self-center justify-center items-center bg-green-100 rounded-r-2xl rounded-bl-none rounded-b-2xl border-r border-green-200 shadow-inner p-3 space-y-15">
            {page === 'availability' && (
                <div
                    className="flex justify-center items-center bg-green-200 rounded-md w-7 h-7 outline-6 outline-green-200"
                    title="Availability"
                >
                    <img src={Availability} className="h-6 w-6" alt="Text bubble" />
                </div>
            )}
            {page !== 'availability' && (
                <a
                    href="/availability"
                    title="Availability"
                    className="flex justify-center items-center bg-green-100 rounded-md w-7 h-7 outline-6
                outline-green-100 hover:bg-green-200 hover:outline-green-200 transition-colors"
                >
                    <img src={Availability} className="h-6 w-6" alt="Calendar" />
                </a>
            )}

            {page === 'conversations' && (
                <div
                    title="Conversations"
                    className="flex justify-center items-center bg-green-200 rounded-md w-7 h-7 outline-6 outline-green-200"
                >
                    <img src={Conversations} className="h-6 w-6" alt="Text bubble" />
                </div>
            )}

            {page !== 'conversations' && (
                <a
                    title="Conversations"
                    href="/conversations"
                    className="flex justify-center items-center bg-green-100 rounded-md w-7 h-7 outline-6
                outline-green-100 hover:bg-green-200 hover:outline-green-200 transition-colors"
                >
                    <img src={Conversations} className="h-6 w-6" alt="List" />
                </a>
            )}

            {page === 'messages' && (
                <div
                    title="Messages"
                    className="flex justify-center items-center bg-green-200 rounded-md w-7 h-7 outline-6 outline-green-200"
                >
                    <img src={Messages} className="h-6 w-6" alt="Text bubble" />
                </div>
            )}
            {page !== 'messages' && (
                <a
                    title="Messages"
                    href="/messages"
                    className="flex justify-center items-center bg-green-100 rounded-md w-7 h-7 outline-6
                outline-green-100 hover:bg-green-200 hover:outline-green-200 transition-colors"
                >
                    <img src={Messages} className="h-6 w-6" alt="List" />
                </a>
            )}


        </div>
    )
}