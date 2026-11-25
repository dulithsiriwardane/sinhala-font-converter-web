import {singlishToUnicode} from "../index";

const examples = [
  {
    label: "Forms of ත",
    keys: [
      "th", "tha", "thaa", "thA", "thae", "thi", "thii", "thu", "thuu",
      "the", "thea", "tho", "thoe", "thau", "thI", "thr", "thraa", "thrA",
      "thrae", "thri", "thrii", "thre", "threa", "thro", "throe", "thru", "thruu",
    ],
  },
  {
    label: "Vowels",
    keys: ["a", "aa", "A", "ae", "i", "ii", "u", "uu", "e", "ea", "o", "oe", "au", "I"],
  },
  {
    label: "Consonants",
    keys: [
      "ka", "kha", "ga", "gha", "nnga", "cha", "Cha", "ja", "qa", "KNa", "GNa",
      "ta", "Ta", "da", "Da", "nnda", "Na", "tha", "Tha", "dha", "Dha", "nndha",
      "na", "pa", "pha", "ba", "bha", "ma", "Ba", "ya", "ra", "la", "va",
      "sha", "Sha", "sa", "ha", "La", "fa",
    ],
  },
  {
    label: "Special signs",
    keys: ["\\n", "\\h", "\\N", "\\r"],
  },
];

export default function TypingGuide() {
  return (
    <div className="font-inter mx-auto max-w-300 px-3 pt-2 pb-5 min-[761px]:px-4 min-[761px]:pb-8">
      <section aria-labelledby="typing-guide-title" className="rounded-box border border-base-300 bg-base-100 p-5 sm:p-7">
        <h2 id="typing-guide-title" className="text-xl font-medium">Singlish typing guide</h2>
        <div className="mt-6 divide-y divide-base-300">
          {examples.map(({label, keys}) => (
            <div key={label} className="py-5 first:pt-0 last:pb-0 sm:py-6">
              <h3 className="mb-3 text-sm font-medium text-neutral-content">{label}</h3>
              <ul role="list" className="flex flex-wrap gap-x-3 gap-y-2.5">
                {keys.map((keysToType) => (
                  <li key={keysToType} className="badge inline-flex h-auto min-h-9 min-w-16 items-center justify-center gap-2  border-base-300 bg-secondary px-3 py-1.5 text-center text-secondary-content">
                    <span lang="si" className="text-base leading-none">{singlishToUnicode(keysToType)}</span>
                    <kbd className="font-mono text-[13px] leading-none text-neutral-content">{keysToType}</kbd>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
