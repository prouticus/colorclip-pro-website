/**
 * ASCII Art Icons for Features
 * Hand-crafted box-drawing and ASCII art icons
 */

// Palette/Grid Icon
export const ICON_PALETTE = `
┌─────────┐
│ ▓ ▓ ▓ ▓ │
│ ▓ ▓ ▓ ▓ │
│ ▓ ▓ ▓ ▓ │
└─────────┘`;

export const ICON_PALETTE_DETAILED = `
╔═══════════════════════╗
║ YOUR PALETTES         ║
╠═══╤═══╤═══╤═══╤═══╤═══╣
║ ▓ │ ▓ │ ▓ │ ▓ │ ░ │ ░ ║
║ R │ O │ Y │ G │ C │ B ║
╚═══╧═══╧═══╧═══╧═══╧═══╝`;

// Eyedropper Icon
export const ICON_EYEDROPPER = `
   ╭───╮
   │ ◉ │
   │ │ │
   ╰─┼─╯
     ▼`;

export const ICON_EYEDROPPER_DETAILED = `
     ╭────╮
     │ ◉  │
     │ ║  │
     │ ║  │
     ╰─╨──╯
       │
       ▼
   [SCREEN]`;

// Cloud Sync Icon
export const ICON_CLOUD_SYNC = `
  ☁  ↕  ☁
     │
  ┌──┴──┐
  │█████│
  └─────┘`;

export const ICON_CLOUD_SYNC_DETAILED = `
   .-~~~-.
 .'       '.
:  CLOUD   :
 '._     _.'
     ↕↕↕
  ┌────────┐
  │ DEVICE │
  └────────┘`;

// Color Formats Icon
export const ICON_COLOR_FORMATS = `
#FF5733
RGB(255,87,51)
HSV(11,80,100)
0.8 Alpha`;

export const ICON_COLOR_FORMATS_BOX = `
┌──────────────┐
│ #FF5733      │
│ RGB(255,87…) │
│ HSV(11,80…)  │
│ α: 0.80      │
└──────────────┘`;

// Color Picker/Wheel Icon
export const ICON_COLOR_PICKER = `
    ╭───╮
   ╱ ◉ ◉ ╲
  │ ◉ ● ◉ │
   ╲ ◉ ◉ ╱
    ╰───╯`;

export const ICON_SLIDER = `
┌──────────────┐
│ H ━━━●━━━━━ │
│ S ━━━━━●━━━ │
│ V ━━●━━━━━━ │
│ A ━━━━━━━━● │
└──────────────┘`;

// i18n/Languages Icon
export const ICON_LANGUAGES = `
┌───────────┐
│ EN FR DE  │
│ ES IT RU  │
│ JA KO ZH  │
└───────────┘`;

export const ICON_GLOBE = `
    .--.
   /    \\
  |  EN  |
  |FR DE |
   \\    /
    '--'`;

// Download Icon
export const ICON_DOWNLOAD = `
    ▼
  ┌─┴─┐
  │   │
  └───┘`;

export const ICON_DOWNLOAD_BOX = `
┌─────────┐
│    ▼    │
│  ┌───┐  │
│  │   │  │
│  └───┘  │
└─────────┘`;

// Check/Success Icon
export const ICON_CHECK = '✓';
export const ICON_CHECK_BOX = '[✓]';

// Cross/Error Icon
export const ICON_CROSS = '✗';
export const ICON_CROSS_BOX = '[✗]';

// Loading Spinner Frames
export const LOADING_FRAMES = [
  '⠋',
  '⠙',
  '⠹',
  '⠸',
  '⠼',
  '⠴',
  '⠦',
  '⠧',
  '⠇',
  '⠏'
];

// Alternative loading animation
export const LOADING_DOTS_FRAMES = [
  '   ',
  '.  ',
  '.. ',
  '...',
  ' ..',
  '  .',
];

// Color swatch animation frames
export const SWATCH_ANIMATION_FRAMES = [
  `┌───────┐
│▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓│
└───────┘
 #FF5733`,
  `┌───────┐
│▒▒▒▒▒▒▒│
│▒▒▒▒▒▒▒│
└───────┘
 #33FF57`,
  `┌───────┐
│░░░░░░░│
│░░░░░░░│
└───────┘
 #5733FF`,
];
