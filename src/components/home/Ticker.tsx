export default function Ticker() {
  const items = [
    "Stanford",
    "MIT",
    "Oxford",
    "Cambridge",
    "Yale",
    "Princeton",
    "Harvard",
    "Columbia",
    "Cornell",
    "Penn",
  ];
  return (
    <div className="py-14 bg-white overflow-hidden border-y border-black/4">
      <div className="flex">
        <div className="animate-ticker flex items-center gap-16 whitespace-nowrap">
          {[...items, ...items].map((u, i) => (
            <span
              key={i}
              className="text-[20px] font-display italic text-black/20 font-normal shrink-0"
            >
              {u}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
