// components/ui/TipTap.tsx

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import ListItem from '@tiptap/extension-list-item';
import Image from '@tiptap/extension-image';

interface EditorProps {
  initialContent: string;
  onContentChange: (content: string) => void;
}

const MenuBar: React.FC<{ editor: any }> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const isActive = (type: string, options?: any) => editor.isActive(type, options);
  const addImage = () => {
    const url = window.prompt('Enter the image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2">
        {/* Bold Button */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded ${
            isActive('bold') ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Bold
        </button>

        {/* Italic Button */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded ${
            isActive('italic') ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Italic
        </button>

        {/* Strike Button */}
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`px-3 py-1 rounded ${
            isActive('strike') ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Strike
        </button>

        {/* Code Button */}
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={`px-3 py-1 rounded ${
            isActive('code') ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Code
        </button>

        {/* Clear Marks */}
        <button
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
        >
          Clear Marks
        </button>

        {/* Clear Nodes */}
        <button
          onClick={() => editor.chain().focus().clearNodes().run()}
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
        >
          Clear Nodes
        </button>

        {/* Paragraph */}
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`px-3 py-1 rounded ${
            isActive('paragraph') ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Paragraph
        </button>

        {/* Headings */}
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <button
            key={level}
            onClick={() => editor.chain().focus().toggleHeading({ level: level as any }).run()}
            className={`px-3 py-1 rounded ${
              isActive('heading', { level }) ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            H{level}
          </button>
        ))}

        {/* Bullet List */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded ${
            isActive('bulletList') ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Bullet List
        </button>

        {/* Ordered List */}
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded ${
            isActive('orderedList') ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Ordered List
        </button>

        {/* Code Block */}
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-1 rounded ${
            isActive('codeBlock') ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Code Block
        </button>

        {/* Blockquote */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 rounded ${
            isActive('blockquote') ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Blockquote
        </button>

        {/* Horizontal Rule */}
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
        >
          HR
        </button>

        {/* Hard Break */}
        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
        >
          Hard Break
        </button>

        {/* Undo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className={`px-3 py-1 rounded ${
            editor.can().chain().focus().undo().run()
              ? 'bg-gray-100 hover:bg-gray-200'
              : 'bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          Undo
        </button>

        {/* Redo */}
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className={`px-3 py-1 rounded ${
            editor.can().chain().focus().redo().run()
              ? 'bg-gray-100 hover:bg-gray-200'
              : 'bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          Redo
        </button>

        {/* Color - Purple */}
        <button
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          className={`px-3 py-1 rounded ${
            isActive('textStyle', { color: '#958DF1' }) ? 'bg-purple-300' : 'bg-purple-100 hover:bg-purple-200'
          }`}
        >
          Purple
        </button>
        {/* Image Button */}
        <button
          onClick={addImage}
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
        >
          Add Image
        </button>
      </div>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Image,
];

const TipTapEditor: React.FC<EditorProps> = ({ initialContent, onContentChange }) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    content: initialContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onContentChange(html);
    },
    editorProps: {
      attributes: {
        class: 'prose',
      },
    },
  });

  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapEditor;
