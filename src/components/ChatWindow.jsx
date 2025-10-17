import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'; 
import { GOT_MESSAGES } from '../data/gotMessages'; 
import { GOT_CHATS } from '../data/gotChats'; 
import { ChatInputArea } from './ChatInputArea'; 

const getMessagesFromStorage = (id) => {
    const storedMessages = localStorage.getItem(`chatMessages_${id}`);
    return storedMessages ? JSON.parse(storedMessages) : [];
};

const saveMessagesToStorage = (id, messages) => {
    localStorage.setItem(`chatMessages_${id}`, JSON.stringify(messages));
};

function ChatWindow() {
    const { characterId } = useParams();

    const [messages, setMessages] = useState(() => getMessagesFromStorage(characterId) || []);
    
    const messagesEndRef = useRef(null);
    const currentChat = GOT_CHATS.find(chat => chat.id === characterId);

    useEffect(() => {
    if (characterId) {
    const stored = getMessagesFromStorage(characterId);
    if (stored.length === 0 && GOT_MESSAGES[characterId]) {
        setMessages(GOT_MESSAGES[characterId]);
        saveMessagesToStorage(characterId, GOT_MESSAGES[characterId]);
    } else {
        setMessages(stored);
    }
    } else {
    setMessages([]);
    }
    }, [characterId]); 

    useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]); 

    const handleSendMessage = (text) => {
    if (text.trim() === '') return;

    const newMessage = {
    id: Date.now(), 
    text: text,
    isMe: true, 
    time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prevMessages => {
    const updatedMessages = [...prevMessages, newMessage];
    

    saveMessagesToStorage(characterId, updatedMessages); 
    
    return updatedMessages;
    });
    };

    if (!currentChat) {

    return (
    <div className="chat-window placeholder-view">
        Selecciona un chat de Game of Thrones para empezar a conversar.
    </div>
    );
    }

    return (
    <div className="chat-window">

    <div className="chat-header">
        <img src={currentChat.avatar} alt={currentChat.name} className="avatar small-avatar" />
        <div className="chat-header-info">
            <h3>{currentChat.name}</h3>
            <small>Últ. vez 12:59</small>
        </div>
    </div>


    <div className="chat-body">
        {messages.map(msg => (
        <div key={msg.id} className={`message-bubble ${msg.isMe ? 'message-out' : 'message-in'}`}>
            <p>{msg.text}</p>
            <span className="message-time">{msg.time}</span>
        </div>
        ))}
        <div ref={messagesEndRef} /> 
    </div>


    <ChatInputArea onSendMessage={handleSendMessage} />
    </div>
    );
}
export default ChatWindow;