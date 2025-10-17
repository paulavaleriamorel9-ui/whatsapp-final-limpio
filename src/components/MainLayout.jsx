// src/components/MainLayout.jsx
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';

function MainLayout() {
    return (
    <div className="whatsapp-main-screen">
    <Sidebar />
    <ChatWindow /> 
    </div>
    );
}
export default MainLayout;