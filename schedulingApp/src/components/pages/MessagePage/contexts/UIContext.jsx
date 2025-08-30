import React, { createContext, useContext, useState, useRef, useEffect } from "react";


const UIContext = createContext()
export function useUIContext() {
    return useContext(UIContext);
}


export function UIProvider({ children }) {
    const [activePopup, setActivePopup] = useState('');

    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [eventInfo, setEventInfo] = useState({});
    const menuRef = useRef(null);

    const openMenu = (e, eventInfo) => {
        if (e.target.closest('[data-menu-target]')) {
            e.preventDefault();
            setMenuPosition({ x: e.pageX, y: e.pageY });
            setEventInfo(eventInfo)
            setActivePopup('optionMenu')
        }
    };

    const closeMenu = () => {
        setActivePopup('');
    };

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            closeMenu();
        }
    };
    const handleScroll = () => {
        if (activePopup === 'optionMenu') {
            closeMenu();
        }
    };
    const handleKeyDown = (e) => { if (e.key === "Escape") closeMenu(); }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        document.addEventListener("scroll", handleScroll);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("scroll", handleScroll);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <UIContext.Provider value={{activePopup, setActivePopup, openMenu, closeMenu, menuPosition, eventInfo, menuRef}}>
            {children}
        </UIContext.Provider>
    );
}




