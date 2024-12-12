import React from 'react';
import { MessageSquare, Send, Paperclip } from 'lucide-react';

const conversations = [
  {
    id: 1,
    contact: 'John Smith',
    company: 'Tech Corp',
    lastMessage: "Thanks for the proposal. I'll review it with my team.",
    time: '10:30 AM',
    unread: true
  },
  {
    id: 2,
    contact: 'Sarah Johnson',
    company: 'Innovation Labs',
    lastMessage: 'When can we schedule the demo?',
    time: 'Yesterday',
    unread: false
  }
];

export default function Messages() {
  return (
    <div className="h-[calc(100vh-10rem)] flex bg-white rounded-lg shadow">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
                conversation.unread ? 'bg-indigo-50' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {conversation.contact}
                  </h3>
                  <p className="text-xs text-gray-500">{conversation.company}</p>
                </div>
                <span className="text-xs text-gray-500">{conversation.time}</span>
              </div>
              <p className="mt-1 text-sm text-gray-600 truncate">
                {conversation.lastMessage}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <MessageSquare className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <h2 className="text-sm font-medium text-gray-900">John Smith</h2>
              <p className="text-xs text-gray-500">Tech Corp</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Messages will be displayed here */}
          <div className="flex justify-center items-center h-full text-gray-500">
            <p>Select a conversation to start messaging</p>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button className="text-gray-400 hover:text-gray-500">
              <Paperclip className="h-5 w-5" />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button className="text-white bg-indigo-600 rounded-full p-2 hover:bg-indigo-700">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}