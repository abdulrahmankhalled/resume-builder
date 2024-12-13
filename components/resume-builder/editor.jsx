"use client";

import * as React from "react";

import { Bold, Italic, List, ListOrdered, Strikethrough } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

export function Editor({ value, onChange }) {
  const editorRef = React.useRef(null);

  React.useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML && value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    const content = editorRef.current.innerHTML;
    onChange(content);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      execCommand("insertHTML", "&nbsp;&nbsp;&nbsp;&nbsp;");
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="border rounded-md">
      <div className="flex items-center border-b p-2 gap-1">
        <Toggle
          size="sm"
          onClick={() => execCommand("bold")}
          aria-label="Toggle bold"
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          onClick={() => execCommand("italic")}
          aria-label="Toggle italic"
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          onClick={() => execCommand("strikethrough")}
          aria-label="Toggle strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>
        <div className="w-px h-4 bg-border mx-1" />
        <Toggle
          size="sm"
          onClick={() => execCommand("insertUnorderedList")}
          aria-label="Toggle bullet list"
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          onClick={() => execCommand("insertOrderedList")}
          aria-label="Toggle numbered list"
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className={cn(
          "min-h-[150px] p-3 focus:outline-none",
          "prose prose-sm max-w-none",
          "[&>ul]:list-disc [&>ul]:ml-4 [&>ul]:my-2",
          "[&>ol]:list-decimal [&>ol]:ml-4 [&>ol]:my-2",
          "[&>ul>li]:ml-2 [&>ol>li]:ml-2",
          "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
        )}
      />
    </div>
  );
}
