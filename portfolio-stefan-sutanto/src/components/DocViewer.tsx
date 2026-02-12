"use client";

import { useEffect, useState } from "react";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";

/**
 * DocViewer Component - Renders MDX content with table of contents
 */
interface DocViewerProps {
  content: string;
  title: string;
}

export function DocViewer({ content, title }: DocViewerProps) {
  const [activeSection, setActiveSection] = useState("");

  // Extract headings from content for TOC
  useEffect(() => {
    const headings = content.match(/^#{2,3}\s+(.+)$/gm) || [];
    // Simple TOC generation - can be enhanced
  }, [content]);

  // MDX components configuration
  const components: MDXRemoteProps["components"] = {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-neutral-100 mt-8 mb-4 pb-2 border-b border-neutral-800">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-neutral-200 mt-8 mb-4" id={String(children)?.toLowerCase().replace(/\s+/g, "-")}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-neutral-300 mt-6 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-medium text-neutral-400 mt-4 mb-2">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="text-neutral-400 leading-relaxed mb-4">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-neutral-400 mb-4 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-neutral-400 mb-4 space-y-2">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="text-neutral-400">{children}</li>,
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-blue-400 hover:text-blue-300 underline"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    code: ({ className, children }: any) => {
      const isInline = !className;
      return isInline ? (
        <code className="px-1.5 py-0.5 bg-neutral-800 rounded text-sm text-blue-400">
          {children}
        </code>
      ) : (
        <code className={className}>{children}</code>
      );
    },
    pre: ({ children }) => (
      <pre className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 mb-4 overflow-x-auto">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-neutral-700 pl-4 py-2 mb-4 text-neutral-500 italic">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border border-neutral-800 rounded-lg overflow-hidden">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-neutral-800">{children}</thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
      <tr className="border-b border-neutral-800">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-2 text-left text-sm font-semibold text-neutral-300">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2 text-sm text-neutral-400">{children}</td>
    ),
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-neutral-100 mb-6 pb-4 border-b border-neutral-800">
          {title}
        </h2>
        <div className="prose prose-invert max-w-none">
          <MDXRemote source={content} components={components} />
        </div>
      </div>
    </div>
  );
}
