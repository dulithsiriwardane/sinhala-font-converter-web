import {useRef, useState} from "react";
import {Copy, Trash2} from "lucide-react";
import CustomSelect from "./common/CustomSelect";
import {singlishToUnicode, unicodeToFmFont, unicodeToIsiFont} from "../index";

export default function TextConverter() {
  const [inputType, setInputType] = useState("Singlish");
  const [outputType, setOutputType] = useState("FM Font");
  const [text, setText] = useState("aayuboewan !");
  const [copyStatus, setCopyStatus] = useState("");
  const input = useRef<HTMLTextAreaElement>(null);
  const unicode = inputType === "Singlish" ? singlishToUnicode(text) : text;
  const isUnicode = outputType === "Unicode";
  const fm = outputType === "FM Font";
  const output = isUnicode
    ? unicode
    : fm
      ? unicodeToFmFont(unicode)
      : unicodeToIsiFont(unicode);
  const count = Array.from(text).length;

  async function copyOutput() {
    try {
      await navigator.clipboard.writeText(output);
      setCopyStatus("Copied to clipboard");
    } catch {
      setCopyStatus("Select the output and copy manually");
    }
  }

  return (
    <div className="font-inter mx-auto grid max-w-300 grid-cols-1 gap-3 p-3 min-[761px]:sticky min-[761px]:top-0 min-[761px]:z-20 min-[761px]:grid-cols-2 min-[761px]:gap-x-5 min-[761px]:gap-y-0 min-[761px]:bg-base-200 min-[761px]:p-4 **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-ring">
      <section className="min-w-0 rounded-box border border-base-300 bg-base-100 p-[clamp(16px,2vw,26px)] min-[761px]:row-span-3 min-[761px]:grid min-[761px]:grid-rows-subgrid">
        <header className="mb-5 flex flex-wrap items-center justify-between gap-2.5">
          <h2 className="flex items-center gap-2.5 text-xl font-medium">
            Type in {inputType === "Unicode" ? "Unicode" : "Singlish"}
          </h2>
          <CustomSelect
            ariaLabel="Input text type"
            options={["Unicode", "Singlish"]}
            value={inputType}
            onChange={(value: string) => {
              setInputType(value);
              setCopyStatus("");
            }}
          />
        </header>
        <textarea
          className="min-h-39.5 w-full overflow-y-auto rounded-field border border-input bg-base-200 hover:border-ring/70 focus:border-ring motion-safe:transition-colors motion-safe:duration-150 px-4 py-3 leading-[1.6] scrollbar-thin [scrollbar-color:var(--color-ring)_transparent] block resize-y text-xl placeholder:text-xl"
          ref={input}
          aria-label="Input text"
          lang={inputType === "Unicode" ? "si" : undefined}
          placeholder={
            inputType === "Unicode"
              ? "Enter Sinhala Unicode text"
              : "Type in Singlish"
          }
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            setCopyStatus("");
          }}
        />
        <footer className="mt-3 flex flex-wrap items-center justify-between gap-2.5">
          <small className="text-sm text-neutral-content">
            {count} {count === 1 ? "character" : "characters"}
          </small>
          <button
            className="flex cursor-pointer items-center gap-2.5 rounded-field bg-secondary px-3.5 py-2.5 text-sm font-semibold text-secondary-content enabled:hover:bg-secondary-content/15 motion-safe:transition-[background-color,scale] motion-safe:duration-150 motion-safe:enabled:active:scale-[0.98] disabled:cursor-default disabled:opacity-50"
            disabled={!text}
            onClick={() => {
              setText("");
              setCopyStatus("");
              input.current?.focus();
            }}
          >
            <Trash2 size={16} /> CLEAR
          </button>
        </footer>
      </section>

      <section className="min-w-0 rounded-box border border-base-300 bg-base-100 p-[clamp(16px,2vw,26px)] min-[761px]:row-span-3 min-[761px]:grid min-[761px]:grid-rows-subgrid">
        <header className="mb-5 flex flex-wrap items-center justify-between gap-2.5">
          <h2 className="flex items-center gap-2.5  text-xl font-medium">
            Converted output
          </h2>
          <CustomSelect
            ariaLabel="Output text type"
            options={["FM Font", "Isiwara", "Unicode"]}
            value={outputType}
            onChange={(value: string) => {
              setOutputType(value);
              setCopyStatus("");
            }}
          />
        </header>
        <div
          role="region"
          aria-label="Converted output"
          lang={isUnicode ? "si" : undefined}
          tabIndex={0}
          className={`min-h-39.5 w-full overflow-y-auto rounded-field border border-input bg-base-200 hover:border-ring/70 focus:border-ring motion-safe:transition-colors motion-safe:duration-150 px-4 py-3 leading-[1.6] scrollbar-thin [scrollbar-color:var(--color-ring)_transparent] text-[22px] whitespace-pre-wrap wrap-anywhere contain-[size] ${isUnicode ? "font-inter" : fm ? "font-fmbindu" : "font-isibindu"}`}
        >
          {output}
        </div>
        <footer className="mt-3 flex flex-wrap items-center justify-between gap-2.5">
          <small className="text-sm text-neutral-content" role="status">
            {copyStatus ||
              (isUnicode
                ? "Sinhala unicode text"
                : fm
                  ? "FM font text"
                  : "Isiwara font text")}
          </small>
          <button
            className="flex cursor-pointer items-center gap-2.5 rounded-field px-3.5 py-2.5 text-sm font-semibold disabled:cursor-default disabled:opacity-50 bg-primary text-primary-content enabled:hover:bg-primary/90 motion-safe:transition-[background-color,scale] motion-safe:duration-150 motion-safe:enabled:active:scale-[0.98]"
            disabled={!output}
            onClick={copyOutput}
          >
            <Copy size={16} /> COPY OUTPUT
          </button>
        </footer>
      </section>
    </div>
  );
}
