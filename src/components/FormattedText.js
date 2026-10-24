// Renders the AI's light markdown as real formatting in React Native:
//   **bold**       -> bold text
//   # / ## / ###   -> bold headings
//   - item, * item -> bullet points
//   https://...    -> tappable links
// React Native's <Text> shows markdown symbols literally, which is why
// replies used to display stray ** characters.

import React from "react";
import { Text, Linking } from "react-native";

const TOKEN = /(\*\*[^*\n]+\*\*|https?:\/\/[^\s)]+)/g;

function openLink(url) {
  Linking.openURL(url).catch(() => {});
}

function renderInline(line, linkColor, keyPrefix) {
  return line.split(TOKEN).map((part, i) => {
    if (!part) return null;
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <Text key={key} style={{ fontWeight: "700" }}>
          {part.slice(2, -2)}
        </Text>
      );
    }
    if (/^https?:\/\//.test(part)) {
      const url = part.replace(/[.,;:!?]+$/, ""); // drop trailing punctuation
      const trailing = part.slice(url.length);
      return (
        <Text key={key}>
          <Text
            style={{ color: linkColor, textDecorationLine: "underline" }}
            onPress={() => openLink(url)}
          >
            {url}
          </Text>
          {trailing}
        </Text>
      );
    }
    return part;
  });
}

export default function FormattedText({ text, style, linkColor = "#0891B2" }) {
  const lines = String(text || "")
    .replace(/\r/g, "")
    .replace(/`/g, "")
    .split("\n");

  const out = [];
  let previousBlank = true;

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trimEnd();
    if (!line.trim()) {
      if (!previousBlank) out.push("\n");
      previousBlank = true;
      return;
    }

    let content = line;
    let isHeading = false;

    const heading = content.match(/^\s*#{1,6}\s+(.*)$/);
    if (heading) {
      content = `**${heading[1].replace(/\*\*/g, "")}**`;
      isHeading = true;
    } else if (/^\s*\*\*[^*]+\*\*\s*:?\s*$/.test(content)) {
      isHeading = true; // a line that is only bold text acts as a side heading
    }

    const bullet = content.match(/^\s*[-*•]\s+(.*)$/);
    if (bullet) content = `•  ${bullet[1]}`;

    // a little extra space above side headings
    if (isHeading && out.length && !previousBlank) out.push("\n");

    out.push(...renderInline(content, linkColor, `l${idx}`));
    out.push("\n");
    previousBlank = false;
  });

  // remove the very last line break
  while (out.length && out[out.length - 1] === "\n") out.pop();

  return <Text style={style}>{out}</Text>;
}