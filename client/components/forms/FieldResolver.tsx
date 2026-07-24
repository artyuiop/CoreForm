import { Input, Select, Textarea, Checkbox } from "@/constants";
import { FormField, FormValue } from "@/types/form";
import React from "react";

interface FieldResolverProps {
  field: FormField;
  value: FormValue;
  onChange: (val: FormValue) => void;
}

const FieldResolver = ({ field, value, onChange }: FieldResolverProps) => {
  switch (true) {
    // Boolean
    case field.type === "boolean":
      return (
        <Checkbox
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          label="เปิดใช้งาน / เลือกตัวเลือกนี้"
        />
      );

    // String + Enum
    case field.type === "string" && !!field.enum:
      return (
        <Select
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          options={field.enum}
          placeholder="-- กรุณาเลือก --"
        />
      );

    // Date
    case field.format === "date":
      return (
        <Input
          type="date"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    // Tel
    case field.format === "tel":
      return (
        <Input
          type="tel"
          placeholder="08X-XXX-XXXX"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    // Multi-line Text
    case field["x-multiline"] === true:
      return (
        <Textarea
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          placeholder="กรอกรายละเอียด..."
          rows={3}
        />
      );

    // Number
    case field.type === "number":
      return (
        <Input
          type="number"
          placeholder="0"
          value={typeof value === "number" ? value : ""}
          onChange={(e) => {
            const inputValue = e.target.value;
            onChange(inputValue === "" ? null : Number(inputValue));
          }}
        />
      );

    // Default String
    default:
      return (
        <Input
          type="text"
          placeholder="กรอกข้อมูล..."
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
};

export default FieldResolver;
