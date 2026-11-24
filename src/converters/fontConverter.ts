import rawSlots from "../data/slots.json";
import type {CompiledLayout, SlotsData} from "../types/converter.types";
import {createMatcher} from "../utils/matcher";

const slots = rawSlots as SlotsData;
const compiledLayouts: Record<string, CompiledLayout> = {};

for (const [layoutName, table] of Object.entries(slots)) {
  compiledLayouts[layoutName] = {
    table,
    findMatch: createMatcher(table),
  };
}

export function convertToFontLayout(
  unicodeText: string,
  layoutName: string,
): string {
  const layout = compiledLayouts[layoutName];
  if (!layout) {
    throw new Error(`Unknown font layout: ${layoutName}`);
  }

  let output = "";
  let i = 0;

  while (i < unicodeText.length) {
    const matchedKey = layout.findMatch(unicodeText, i);

    if (matchedKey) {
      output += layout.table[matchedKey];
      i += matchedKey.length;
    } else {
      output += unicodeText[i];
      i += 1;
    }
  }

  return output;
}

export function unicodeToFmFont(unicodeText: string): string {
  return convertToFontLayout(unicodeText, "fm");
}

export function unicodeToIsiFont(unicodeText: string): string {
  return convertToFontLayout(unicodeText, "isi");
}
