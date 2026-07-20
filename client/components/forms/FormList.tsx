"use client";

import React, { useState, useMemo } from "react";
import type { FormDisplayItem } from "../../types/form";
import {
  SearchInput,
  ClearButton,
  ResultCount,
  EmptyState,
  FormCard,
} from "../../constants";

interface FormListProps {
  forms: FormDisplayItem[];
}

export default function FormList({ forms }: FormListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredForms = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return forms;
    return forms.filter(
      (form) =>
        form.title.toLowerCase().includes(query) ||
        form.description.toLowerCase().includes(query),
    );
  }, [forms, searchQuery]);

  const handleClear = () => setSearchQuery("");

  return (
    <>
      <div className="mb-8">
        <SearchInput
          id="form-search"
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="SEARCH FORMS..."
        />
      </div>

      <div className="mb-6 flex justify-between items-end border-b border-gray-200 pb-2">
        <ResultCount count={filteredForms.length} searchQuery={searchQuery} />
        {searchQuery && <ClearButton onClick={handleClear} />}
      </div>

      {filteredForms.length === 0 && searchQuery && (
        <EmptyState variant="no-results" onClear={handleClear} />
      )}
      {filteredForms.length === 0 && !searchQuery && (
        <EmptyState variant="empty" />
      )}

      {filteredForms.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredForms.map((form) => (
            <FormCard key={form.id} form={form} />
          ))}
        </div>
      )}
    </>
  );
}
