import { useState } from 'react';

export default function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="w-full bg-black text-white text-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-4 py-2">
        <span className="font-medium tracking-wide">Drop One ships this Friday • Free returns 30 days</span>
        <button onClick={() => setOpen(false)} aria-label="Close" className="ml-2 rounded px-2 py-1 text-white/70 hover:text-white">×</button>
      </div>
    </div>
  );
}

