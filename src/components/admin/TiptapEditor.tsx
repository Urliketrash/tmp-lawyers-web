"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";

/**
 * Props for the TiptapEditor component.
 */
interface TiptapEditorProps {
  /** The HTML content of the editor */
  value: string;
  /** Callback triggered when the content changes */
  onChange: (html: string) => void;
  /** Optional label displayed above the editor */
  label?: string;
  /** Optional placeholder text shown when empty */
  placeholder?: string;
}

/**
 * A modern, dark-themed Tiptap Rich Text Editor styled for the admin dashboard.
 * Replaces legacy document.execCommand with a secure and responsive framework-backed editor.
 *
 * @param props The component props
 * @returns React element representing the rich text editor
 */
export default function TiptapEditor({ value, onChange, label, placeholder }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: placeholder || "Write your article content here...",
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // Only call onChange if it has actually changed to prevent render loops
      onChange(html === "<p></p>" ? "" : html);
    },
    editorProps: {
      attributes: {
        class:
          "w-full p-4 min-h-[300px] text-white focus:outline-none prose prose-invert max-w-none font-sans [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_li]:mb-1 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:text-xl [&_h3]:font-bold [&_p]:mb-4",
      },
    },
  });

  // Sync external changes (e.g., loaded draft or database fetch)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      // Prevent cursor jump when typing by checking if editor is focused
      if (!editor.isFocused) {
        editor.commands.setContent(value || "<p></p>");
      }
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  const handleCommand = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    action();
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">
          {label}
        </label>
      )}

      <div className={`bg-tmp-black border transition-colors rounded-lg overflow-hidden ${editor.isFocused ? "border-tmp-gold" : "border-white/10"}`}>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-white/10 bg-white/5">
          {/* History */}
          <button
            type="button"
            onClick={(e) => handleCommand(e, () => editor.chain().focus().undo().run())}
            disabled={!editor.can().undo()}
            className="p-2 text-gray-400 hover:text-tmp-gold hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => handleCommand(e, () => editor.chain().focus().redo().run())}
            disabled={!editor.can().redo()}
            className="p-2 text-gray-400 hover:text-tmp-gold hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>
          
          <div className="w-px h-6 bg-white/10 mx-1"></div>

          {/* Formats */}
          <button
            type="button"
            onClick={(e) => handleCommand(e, () => editor.chain().focus().toggleBold().run())}
            className={`p-2 rounded transition-colors ${
              editor.isActive("bold") ? "text-tmp-gold bg-white/10" : "text-gray-400 hover:text-tmp-gold hover:bg-white/10"
            }`}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => handleCommand(e, () => editor.chain().focus().toggleItalic().run())}
            className={`p-2 rounded transition-colors ${
              editor.isActive("italic") ? "text-tmp-gold bg-white/10" : "text-gray-400 hover:text-tmp-gold hover:bg-white/10"
            }`}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => handleCommand(e, () => editor.chain().focus().toggleUnderline().run())}
            className={`p-2 rounded transition-colors ${
              editor.isActive("underline") ? "text-tmp-gold bg-white/10" : "text-gray-400 hover:text-tmp-gold hover:bg-white/10"
            }`}
            title="Underline"
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-white/10 mx-1"></div>

          {/* Headings */}
          <button
            type="button"
            onClick={(e) => handleCommand(e, () => editor.chain().focus().toggleHeading({ level: 1 }).run())}
            className={`p-2 rounded transition-colors ${
              editor.isActive("heading", { level: 1 }) ? "text-tmp-gold bg-white/10" : "text-gray-400 hover:text-tmp-gold hover:bg-white/10"
            }`}
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => handleCommand(e, () => editor.chain().focus().toggleHeading({ level: 2 }).run())}
            className={`p-2 rounded transition-colors ${
              editor.isActive("heading", { level: 2 }) ? "text-tmp-gold bg-white/10" : "text-gray-400 hover:text-tmp-gold hover:bg-white/10"
            }`}
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => handleCommand(e, () => editor.chain().focus().toggleHeading({ level: 3 }).run())}
            className={`p-2 rounded transition-colors ${
              editor.isActive("heading", { level: 3 }) ? "text-tmp-gold bg-white/10" : "text-gray-400 hover:text-tmp-gold hover:bg-white/10"
            }`}
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-white/10 mx-1"></div>

          {/* Alignment */}
          <button
            type="button"
            onClick={(e) => handleCommand(e, () => editor.chain().focus().setTextAlign("left").run())}
            className={`p-2 rounded transition-colors ${
              editor.isActive({ textAlign: "left" }) ? "text-tmp-gold bg-white/10" : "text-gray-400 hover:text-tmp-gold hover:bg-white/10"
            }`}
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => handleCommand(e, () => editor.chain().focus().setTextAlign("center").run())}
            className={`p-2 rounded transition-colors ${
              editor.isActive({ textAlign: "center" }) ? "text-tmp-gold bg-white/10" : "text-gray-400 hover:text-tmp-gold hover:bg-white/10"
            }`}
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => handleCommand(e, () => editor.chain().focus().setTextAlign("right").run())}
            className={`p-2 rounded transition-colors ${
              editor.isActive({ textAlign: "right" }) ? "text-tmp-gold bg-white/10" : "text-gray-400 hover:text-tmp-gold hover:bg-white/10"
            }`}
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => handleCommand(e, () => editor.chain().focus().setTextAlign("justify").run())}
            className={`p-2 rounded transition-colors ${
              editor.isActive({ textAlign: "justify" }) ? "text-tmp-gold bg-white/10" : "text-gray-400 hover:text-tmp-gold hover:bg-white/10"
            }`}
            title="Justify"
          >
            <AlignJustify className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-white/10 mx-1"></div>

          {/* Lists & Blocks */}
          <button
            type="button"
            onClick={(e) => handleCommand(e, () => editor.chain().focus().toggleBulletList().run())}
            className={`p-2 rounded transition-colors ${
              editor.isActive("bulletList") ? "text-tmp-gold bg-white/10" : "text-gray-400 hover:text-tmp-gold hover:bg-white/10"
            }`}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => handleCommand(e, () => editor.chain().focus().toggleOrderedList().run())}
            className={`p-2 rounded transition-colors ${
              editor.isActive("orderedList") ? "text-tmp-gold bg-white/10" : "text-gray-400 hover:text-tmp-gold hover:bg-white/10"
            }`}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => handleCommand(e, () => editor.chain().focus().toggleBlockquote().run())}
            className={`p-2 rounded transition-colors ${
              editor.isActive("blockquote") ? "text-tmp-gold bg-white/10" : "text-gray-400 hover:text-tmp-gold hover:bg-white/10"
            }`}
            title="Blockquote"
          >
            <Quote className="w-4 h-4" />
          </button>
        </div>

        {/* Editor Area */}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
