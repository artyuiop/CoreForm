import { FormField, FormValue } from "@/types/form";
import React from "react";

interface FieldResolverProps {
  field: FormField;
  value: FormValue;
  onChange: (val: unknown) => void;
}

const FieldResolver = ({ field, value, onChange }: FieldResolverProps) => {
  // Bolean
  switch (true) {
    case field.type === "boolean":
      return (
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
        />
      );

    //  String
    case field.type === "string" && !!field.enum:
      return (
        <select
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">เลือก...</option>

          {field.enum.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );

    //  Date
    case field.format === "date":
      return (
        <input
          type="date"
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    //  Tel
    case field.format === "tel":
      return (
        <input
          type="tel"
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    //  Muti-line Text
    case field["x-multiline"] === true:
      return (
        <textarea
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    //  Number
    case field.type === "number":
      return (
        <input
          type="number"
          value={Number(value)}
          onChange={(e) =>
            onChange(e.target.value === "" ? null : Number(e.target.value))
          }
        />
      );

    //  Default
    default:
      return (
        <input
          type="text"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
};

export default FieldResolver;
