"use client";

import { Highlighter } from "@/components/ui/highlighter";
import { LinkPreview } from "@/components/ui/link-preview";
import { motion } from "framer-motion";
import React from "react";

interface HighlightedTextProps {
  text: string;
}

/**
 * Component that renders text with [[highlight]] syntax as underlined
 * or [[highlight|url]] as a LinkPreview
 * Example: "Text [[underlined word]] or [[link|https://example.com]]"
 */
export function HighlightedText({ text }: HighlightedTextProps) {
  // Regex to match [[text]] or [[text|url]]
  // Group 1: text content
  // Group 2: optional url (undefined if not present)
  const regex = /\[\[(.+?)(?:\|(.+?))?\]\]/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const content = match[1];
    const url = match[2];

    if (url) {
      parts.push(
        <LinkPreview
          key={key}
          url={url}
          className="font-bold bg-clip-text text-transparent bg-linear-to-br from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 transition-colors cursor-pointer"
        >
          {content}
        </LinkPreview>
      );
    } else {
      parts.push(
        <motion.span
          key={key}
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.5, 
            delay: key * 0.1,
            ease: "easeOut"
          }}
        >
          <Highlighter 
            color="var(--primary)"
            action="underline" 
            isView
            strokeWidth={2}
          >
            <span className="font-semibold text-foreground">
              {content}
            </span>
          </Highlighter>
        </motion.span>
      );
    }

    key++;
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <>{parts.length > 0 ? parts : text}</>;
}
