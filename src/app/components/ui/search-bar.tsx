"use client";

import * as React from "react";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
}

export function SearchBar({
  placeholder = "Search...",
  className,
  onChange,
  onSubmit,
  ...props
}: SearchBarProps) {
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleClear = () => {
    setValue("");
    onChange?.("");
    inputRef.current?.focus();
  };

  return (
    <form
      className={cn(
        "relative flex w-full max-w-xs items-center space-x-2",
        className
      )}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="relative w-full">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          className="w-full pl-9 pr-10 bg-white text-black"
          value={value}
          onChange={handleChange}
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={handleClear}
          >
            <X className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
      {/* <Button type="submit" className=" text-white">
        Search
      </Button> */}
    </form>
  );
}
