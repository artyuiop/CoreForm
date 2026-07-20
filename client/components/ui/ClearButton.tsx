'use client';

import React from 'react';
import Button from './Button';

interface ClearButtonProps {
  onClick: () => void;
  label?: string;
}

export default function ClearButton({ onClick, label = 'CLEAR ×' }: ClearButtonProps) {
  return (
    <Button variant="link" size="sm" onClick={onClick}>
      {label}
    </Button>
  );
}
