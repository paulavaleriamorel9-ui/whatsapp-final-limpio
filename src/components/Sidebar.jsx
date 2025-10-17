import { GOT_CHATS } from '../data/gotChats';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
    <div className="sidebar">
    <div className="sidebar-header">
        
        <span>WhatsApp</span> 
    </div>
    
    
    <div className="chat-list">
        {GOT_CHATS.map((chat) => (
        <Link to={`/chat/${chat.id}`} key={chat.id} className="chat-item">
            <img src={chat.avatar} alt={chat.name} className="avatar" />
            <div className="chat-info">
            <span className="chat-name">{chat.name}</span>
            <p className="last-message">{chat.lastMessage}</p>
            </div>
            <span className="chat-time">{chat.time}</span>
        </Link>
        ))}
    </div>
    </div>
    );
}
export default Sidebar;