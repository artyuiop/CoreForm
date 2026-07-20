"use client";

import React from "react";
import Input from "./Input";

// Search icon path

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "SEARCH...",
  id = "search-input",
}: SearchInputProps) {
  return (
    <div className="">
      <Input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        size="md"
      />
      <div className="flex flex-wrap gap-2 mt-2 pl-1">
        <button className="flex items-center gap-1.5 border border-gray-400 text-gray-700 rounded-[4px] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer ">
          
        </button>
       
      </div>  
    </div>
  );
}
