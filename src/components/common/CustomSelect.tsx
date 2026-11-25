import {useEffect, useId, useRef, useState, type KeyboardEvent} from "react";
import {Check, ChevronDown} from "lucide-react";

type CustomSelectProps = {
  ariaLabel: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
};

export default function CustomSelect({
  ariaLabel,
  options,
  value,
  onChange,
}: CustomSelectProps) {
  const root = useRef<HTMLDivElement>(null);
  const listId = useId();
  const [active, setActive] = useState<number | null>(null);
  const open = active !== null;
  const selected = Math.max(0, options.indexOf(value));

  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !root.current?.contains(event.target)
      ) {
        setActive(null);
      }
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  function choose(option: string) {
    setActive(null);
    if (option !== value) onChange(option);
  }

  function navigate(event: KeyboardEvent<HTMLButtonElement>) {
    const last = options.length - 1;
    switch (event.key) {
      case "ArrowDown":
        setActive(active === null ? selected : Math.min(active + 1, last));
        break;
      case "ArrowUp":
        setActive(active === null ? selected : Math.max(active - 1, 0));
        break;
      case "Home":
        setActive(0);
        break;
      case "End":
        setActive(last);
        break;
      case "Enter":
      case " ":
        if (active === null) setActive(selected);
        else choose(options[active]);
        break;
      case "Escape":
        if (!open) return;
        setActive(null);
        break;
      default: {
        if (
          event.key.length !== 1 ||
          event.ctrlKey ||
          event.metaKey ||
          event.altKey
        )
          return;
        for (let offset = 1; offset <= options.length; offset++) {
          const index = ((active ?? selected) + offset) % options.length;
          if (
            options[index].toLowerCase().startsWith(event.key.toLowerCase())
          ) {
            setActive(index);
            break;
          }
        }
      }
    }
    event.preventDefault();
  }

  return (
    <div
      ref={root}
      className={`dropdown dropdown-bottom min-w-32 max-w-full ${open ? "dropdown-open" : "dropdown-close"}`}
    >
      <button
        type="button"
        role="combobox"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-activedescendant={open ? listId + "-" + active : undefined}
        disabled={!options.length}
        onClick={() => setActive(open ? null : selected)}
        onKeyDown={navigate}
        onBlur={() => setActive(null)}
        className="flex min-h-8 w-full cursor-pointer items-center justify-between gap-2 rounded-field bg-accent px-3 text-[15px] font-medium wrap-anywhere text-base-content enabled:hover:bg-secondary-content/15 motion-safe:transition-[background-color,scale] motion-safe:duration-150 motion-safe:enabled:active:scale-[0.98] max-[761px]:min-h-11"
      >
        {value}
        <ChevronDown
          aria-hidden="true"
          size={15}
          className={`shrink-0 motion-safe:transition-transform motion-safe:duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <ul
        id={listId}
        role="listbox"
        aria-label={ariaLabel}
        hidden={!open}
        className="dropdown-content left-0 mt-1 w-full rounded-box border border-base-300 bg-base-100 p-1 shadow-md"
      >
        {options.map((option, index) => (
          <li
            key={option}
            id={listId + "-" + index}
            role="option"
            aria-selected={option === value}
            onPointerMove={() => setActive(index)}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => choose(option)}
            className={`flex cursor-pointer items-center justify-between gap-2 rounded-field px-3 py-2 text-sm wrap-anywhere text-base-content motion-safe:transition-colors motion-safe:duration-150 ${index === active ? "bg-secondary" : ""}`}
          >
            {option}
            {option === value && (
              <Check
                aria-hidden="true"
                size={15}
                className="shrink-0 text-neutral-content"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
