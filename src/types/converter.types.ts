export type Matcher = (text: string, index: number) => string | undefined

export type VowelPair = [independent: string, dependent: string]

export type CharacterMap = Record<string, string>

export type SlotsData = Record<string, CharacterMap>

export interface PhoneticsData {
  vowels: Record<string, VowelPair>
  consonants: CharacterMap
}

export interface CompiledLayout {
  table: CharacterMap
  findMatch: Matcher
}