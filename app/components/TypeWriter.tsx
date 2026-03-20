"use client";

import { useState, useEffect } from "react";

interface TypeWriterProps {
  strings: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function TypeWriter({
  strings,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: TypeWriterProps) {
  const [text, setText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = strings[stringIndex];

    if (!isDeleting && text === current) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && text === "") {
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setStringIndex((prev) => (prev + 1) % strings.length);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(
      () => {
        setText(
          isDeleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1)
        );
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, stringIndex, strings, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="typing-cursor text-primary">{text}</span>
  );
}
