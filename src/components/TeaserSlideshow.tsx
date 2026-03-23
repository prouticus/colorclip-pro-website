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

export default function TeaserGrid() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {gifs.map((gif) => (
        <div
          key={gif.file}
          className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-md flex flex-col"
        >
          <img
            src={`/teaser_videos/${gif.file}`}
            alt={gif.label}
            className="w-full h-auto block"
            loading="lazy"
          />
          <p className="text-xs text-center text-gray-500 py-2 px-1 font-medium">
            {gif.label}
          </p>
        </div>
      ))}
    </div>
  );
}
