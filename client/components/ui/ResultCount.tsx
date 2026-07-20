import React from "react";

interface ResultCountProps {
  count: number;
  searchQuery?: string;
}

export default function ResultCount({ count, searchQuery }: ResultCountProps) {
  return (
    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
      {count} FORMS
      {searchQuery && ` (ค้นหา: "${searchQuery}")`}
    </span>
  );
}
