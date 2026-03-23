import { useEffect, useState } from 'react';

const gifs = [
  { file: '00_Draggable_Color_Drawer.gif', label: 'Draggable Color Drawer' },
  { file: '01_Fully_Offline_Mode.gif', label: 'Fully Offline Mode' },
  { file: '02_Multiple_Color_Models.gif', label: 'Multiple Color Models' },
  { file: '03_Multiple_Dark_Modes.gif', label: 'Multiple Dark Modes' },
  { file: '04_Unlimited_Palettes.gif', label: 'Unlimited Palettes' },
  { file: '05_Automatic_Value_Conversion.gif', label: 'Automatic Value Conversion' },
  { file: '06_Fuzzy_Eyedropper.gif', label: 'Fuzzy Eyedropper' },
  { file: '07_Cross_OS_Cloud_Sync.gif', label: 'Cross-OS Cloud Sync' },
  { file: '08_Swatch_Copy_Paste.gif', label: 'Swatch Copy & Paste' },
  { file: '09_Swatch_Label.gif', label: 'Swatch Labels' },
  { file: '10_Swatch_History.gif', label: 'Swatch History' },
  { file: '11_Easy_Cloud_Sync.gif', label: 'Easy Cloud Sync' },
  { file: '12_Nine_Languages.gif', label: 'Nine Languages' },
];

const SLIDE_DURATION = 4000;

export default function TeaserSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % gifs.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white w-full max-w-3xl mx-auto">
        {gifs.map((gif, i) => (
          <img
            key={gif.file}
            src={`/teaser_videos/${gif.file}`}
            alt={gif.label}
            className="w-full h-auto block transition-opacity duration-500"
            style={{ display: i === current ? 'block' : 'none' }}
          />
        ))}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center">
          <span className="bg-black/50 text-white text-xs px-3 py-1 rounded-full">
            {gifs[current].label}
          </span>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex gap-2 flex-wrap justify-center">
        {gifs.map((gif, i) => (
          <button
            key={gif.file}
            onClick={() => setCurrent(i)}
            aria-label={`Show ${gif.label}`}
            className="w-2 h-2 rounded-full transition-colors"
            style={{ backgroundColor: i === current ? '#e85d00' : '#d1d5db' }}
          />
        ))}
      </div>
    </div>
  );
}
