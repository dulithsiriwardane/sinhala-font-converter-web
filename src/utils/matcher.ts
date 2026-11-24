import type { Matcher } from '../types/converter.types'

export function createMatcher(dictionary: Record<string, unknown>): Matcher {
  const groupedKeys = new Map<string, string[]>()
  const sortedKeys = Object.keys(dictionary).sort((a, b) => b.length - a.length)

  for (const key of sortedKeys) {
    const firstChar = key[0]
    if (!groupedKeys.has(firstChar)) {
      groupedKeys.set(firstChar, [])
    }
    groupedKeys.get(firstChar)!.push(key)
  }

  return function findMatch(text: string, index: number): string | undefined {
    const candidates = groupedKeys.get(text[index])
    if (!candidates) return undefined

    return candidates.find((key) => text.startsWith(key, index))
  }
}