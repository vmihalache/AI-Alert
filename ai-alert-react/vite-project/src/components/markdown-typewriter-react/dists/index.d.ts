import React from 'react';

interface MarkdownTypewriterProps {
    /** The markdown content to render */
    markdown: string;
    /** Typing delay in milliseconds */
    delay?: number;
    /** Number of characters to type per tick (>=1) */
    charsPerTick?: number;
    /** Layout when showing raw + rendered */
    layout?: "stack" | "split";
    /** Additional CSS class name */
    className?: string;
    /** Inline styles */
    style?: React.CSSProperties;
    /** Whether to show the raw typed markdown with a caret */
    showRaw?: boolean;
    /** Callback function to be called when typing is complete */
    onComplete?: () => void;
}
declare const MarkdownTypewriter: React.FC<MarkdownTypewriterProps>;

export { MarkdownTypewriter as default };
