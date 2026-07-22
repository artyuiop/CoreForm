"use client";

import React from "react";
import Input from "./Input";
import { FormDisplayItem } from "@/types/form";
import Button from "./Button";

// Search icon path

interface SearchInputProps {  
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;

  forms: FormDisplayItem[];
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "SEARCH...",
  id = "search-input",
  forms
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
        { forms.map((form) => (
          <Button 
            key={form.id}
            variant="secondary"
            size="sm"
            onClick={() => onChange(form.title)}
          >
            {form.title}
          </Button>
        ))}
       
      </div>  
    </div>
  );
}
