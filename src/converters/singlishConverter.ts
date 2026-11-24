import rawPhonetics from "../data/phonetics.json";
import type {CharacterMap, PhoneticsData} from "../types/converter.types";
import {createMatcher} from "../utils/matcher";

const phonetics = rawPhonetics as unknown as PhoneticsData;
const vowels = phonetics.vowels;

const consonants: CharacterMap = {
  ...phonetics.consonants,
  GN: "ඥ",
  KN: "ඤ",
  Y: "‍ය",
};

const specials: CharacterMap = {
  "\\n": "ං",
  "\\N": "ඞ",
  "\\h": "ඃ",
  "\\r": "ර්‍",
  R: "ර්‍",
};

const findSpecial = createMatcher(specials);
const findVowel = createMatcher(vowels);
const findConsonant = createMatcher(consonants);

export function singlishToUnicode(singlishText: string): string {
  let output = "";
  let i = 0;

  while (i < singlishText.length) {
    // 1. Check special symbols first (\n, \N, \h, \r, R)
    const special = findSpecial(singlishText, i);
    if (special) {
      output += specials[special];
      i += special.length;
      continue;
    }

    // 2. Check consonants and their attached modifiers
    const consonant = findConsonant(singlishText, i);
    if (consonant) {
      output += consonants[consonant];
      i += consonant.length;

      // Handle 'ru' and 'ruu' (Gaetta-pilla)
      if (singlishText.startsWith("ru", i)) {
        const isLong = singlishText.startsWith("ruu", i);
        output += isLong ? "ෲ" : "ෘ";
        i += isLong ? 3 : 2;
        continue;
      }

      // Handle 'r' (Rakaransaya)
      const hasRakaransaya = singlishText[i] === "r";
      if (hasRakaransaya) {
        output += "්‍ර";
        i += 1;
      }

      // Attach dependent vowel sign (Pillam) or Hal Kirima (්)
      const vowel = findVowel(singlishText, i);
      if (vowel) {
        output += vowels[vowel][1];
        i += vowel.length;
      } else if (!hasRakaransaya) {
        output += "්";
      }

      continue;
    }

    // 3. Check standalone vowels or pass through unchanged characters
    const vowel = findVowel(singlishText, i);
    if (vowel) {
      output += vowels[vowel][0];
      i += vowel.length;
    } else {
      output += singlishText[i];
      i += 1;
    }
  }

  return output;
}
