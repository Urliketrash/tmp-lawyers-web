"use client";

import { useState, useRef, useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  label?: string;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, label, placeholder }: RichTextEditorProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Sync initial value - only if empty to avoid cursor jumping
  // Logic: if external value changes (e.g. initial load), set internal text
  // BUT be careful not to overwrite user typing.
  // Best approach for controlled contentEditable is tricky.
  // Simplified: Update contentRef only if completely different or on mount.
  useEffect(() => {
    if (contentRef.current && contentRef.current.innerHTML !== value) {
        // Only update if the difference is meaningful to prevent cursor reset loop
        // Or if the editor is NOT focused
        if (!isFocused || value === "") {
             contentRef.current.innerHTML = value;
        }
    }
  }, [value, isFocused]);

  const handleInput = () => {
    if (contentRef.current) {
      const html = contentRef.current.innerHTML;
      onChange(html);
    }
  };

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    // Force focus back to editor to keep selection
    if (contentRef.current) {
        // contentRef.current.focus(); 
        // Focus management can be tricky with buttons, usually execCommand handles it on selection
    }
    handleInput(); // Sync changes
  };

  const Button = ({ cmd, arg, icon, title }: { cmd: string, arg?: string, icon: string, title: string }) => (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault(); // Prevent losing focus from editor
        execCommand(cmd, arg);
      }}
      className="p-2 text-gray-400 hover:text-tmp-gold hover:bg-white/10 rounded transition-colors"
      title={title}
      suppressHydrationWarning
    >
      <i className={`fas ${icon}`}></i>
    </button>
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-tmp-gold text-xs font-bold uppercase tracking-widest mb-2">
          {label}
        </label>
      )}
      
      <div className={`bg-tmp-black border transition-colors rounded-lg overflow-hidden ${isFocused ? 'border-tmp-gold' : 'border-white/10'}`}>
        
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-white/10 bg-white/5">
            <Button cmd="bold" icon="fa-bold" title="Bold" />
            <Button cmd="italic" icon="fa-italic" title="Italic" />
            <Button cmd="underline" icon="fa-underline" title="Underline" />
            <div className="w-px h-6 bg-white/10 mx-2"></div>
            <Button cmd="justifyLeft" icon="fa-align-left" title="Align Left" />
            <Button cmd="justifyCenter" icon="fa-align-center" title="Align Center" />
            <Button cmd="justifyRight" icon="fa-align-right" title="Align Right" />
            <Button cmd="justifyFull" icon="fa-align-justify" title="Justify" />
            <div className="w-px h-6 bg-white/10 mx-2"></div>
            <Button cmd="insertUnorderedList" icon="fa-list-ul" title="Bullet List" />
            <Button cmd="insertOrderedList" icon="fa-list-ol" title="Numbered List" />
        </div>

        {/* Editor Area */}
        <div
            ref={contentRef}
            contentEditable
            onInput={handleInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full p-4 min-h-[300px] text-white focus:outline-none prose prose-invert max-w-none font-sans [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_li]:mb-1 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:text-xl [&_h3]:font-bold [&_p]:mb-4"
            style={{ 
                // Ensuring basic styling matches
            }}
            data-placeholder={placeholder}
        ></div>
      </div>
      <p className="text-gray-600 text-[10px] mt-1">* Select text to apply formatting</p>
    </div>
  );
}
