"use client";

import * as React from "react";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  inputRef?: React.Ref<HTMLInputElement>;
}

export function SearchBar({
  placeholder = "Search...",
  className,
  inputClassName,
  value,
  onChange,
  onSubmit,
  inputRef,
  ...props
}: SearchBarProps) {
  const [internalValue, setInternalValue] = React.useState("");
  const localInputRef = React.useRef<HTMLInputElement | null>(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;
  const isControlled = value !== undefined;
  const resolvedValue = isControlled ? value : internalValue;

  const setInputRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      localInputRef.current = node;
      if (typeof inputRef === "function") {
        inputRef(node);
      } else if (inputRef) {
        (inputRef as React.MutableRefObject<HTMLInputElement | null>).current =
          node;
      }
    },
    [inputRef]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(resolvedValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue("");
    }
    onChange?.("");
    localInputRef.current?.focus();
  };

  return (
    <form
      className={cn(
        "relative flex w-full items-center space-x-2",
        className
      )}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="relative w-full">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
        <Input
          ref={setInputRef}
          type="search"
          placeholder={placeholder}
          className={cn(
            "w-full pl-9 pr-10",
            "bg-white/5 text-white placeholder:text-white/60",
            "border border-white/40 focus-visible:ring-white/40",
            inputClassName
          )}
          value={resolvedValue}
          onChange={handleChange}
        />
        {resolvedValue && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={handleClear}
          >
            <X className="h-4 w-4 text-white/70" />
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
