import StarterKit from '@tiptap/starter-kit';
import React from 'react'

interface EditorProps {
    initialContent: string;
    onContentChange: (content: string) => void;
  }

const MenuBar: React.FC<{ editor: any }> = ({ editor }) => {
    return (
        <div className="flex justify-between items-center mb-4">
        <div>
            <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
            >
            Bold
            </button>
            <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
            >
            Italic
            </button>
            <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
            >
            Strike
            </button>
            <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
            >
            Code
            </button>
            <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
            >
            H1
            </button>
            <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
            >
            H2
            </button>
            <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
            >
            H3
            </button>
            <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
            >
            Bullet List
            </button>
            <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
            >
            Ordered List
            </button>
            <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
            >
            Horizontal Rule
            </button>
            <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
            >
            Blockquote
            </button>
            </div>
        </div>
    );
};
export default MenuBar;

const extensions = [
    StarterKit,
];

