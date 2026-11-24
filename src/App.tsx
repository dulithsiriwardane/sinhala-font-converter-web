import {useState} from "react";
import {unicodeToFmFont, unicodeToIsiFont, singlishToUnicode} from "./index";

function App() {
  const [singlish, setSinglish] = useState("");
  const [unicodeSin, setUnicodeSin] = useState("");
  return (
    <section>
      <div className="flex flex-col gap-4  border-2 border-gray-500 rounded-lg p-4 w-96">
        <input
          type="text"
          placeholder="Singlish text"
          value={singlish}
          onChange={(e) => setSinglish(e.target.value)}
          className="border border-gray-500 rounded-lg"
        />
        <input
          type="text"
          placeholder="Sinhala unicode text"
          value={unicodeSin}
          onChange={(e) => setUnicodeSin(e.target.value)}
          className="border border-gray-500 rounded-lg"
        />
      </div>
      <div>
        <div className="font-fmbindu">
          {unicodeToFmFont(singlishToUnicode(singlish))}
        </div>
      </div>
      <div>
        <div className="font-isibindu">
          {unicodeToIsiFont(singlishToUnicode(singlish))}
        </div>
      </div>
    </section>
  );
}
export default App;
