import React, { useState } from 'react';

export const ChatInputArea = ({ onSendMessage }) => {

    const [inputText, setInputText] = useState('');

    const handleSubmit = (e) => {
    e.preventDefault(); 
    onSendMessage(inputText);
    setInputText(''); 
    };

    return (
    
    <form className="chat-input-area" onSubmit={handleSubmit}>
    <input
        type="text"
        placeholder="Escribe un mensaje aquí..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="input-field"
    />
    <button type="submit" className="send-button">
        Enviar
    </button>
    </form>
    );
};