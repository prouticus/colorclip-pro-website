/**
 * Reusable ASCII UI Elements
 * Box-drawing characters and common UI patterns
 */

// Button states
export const BUTTON_DEFAULT = (text: string) => {
  const paddedText = text.padEnd(13);
  return `┌──────────────────┐
│  ◇ ${paddedText} │
└──────────────────┘`;
};

export const BUTTON_HOVER = (text: string) => {
  const paddedText = text.toUpperCase().padEnd(13);
  return `╔══════════════════╗
║  ◆ ${paddedText} ║
╚══════════════════╝`;
};

// Download buttons
export const DOWNLOAD_MAC_DEFAULT = `┌────────────────┐
│ ▼ Download Mac │
│  [arm64/x64]   │
└────────────────┘`;

export const DOWNLOAD_MAC_HOVER = `╔════════════════╗
║ ▼ DOWNLOAD MAC ║
║  [ARM64/X64]   ║
╚════════════════╝`;

export const DOWNLOAD_WIN_DEFAULT = `┌────────────────┐
│ ▼ Download Win │
│    [x64]       │
└────────────────┘`;

export const DOWNLOAD_WIN_HOVER = `╔════════════════╗
║ ▼ DOWNLOAD WIN ║
║    [X64]       ║
╚════════════════╝`;

// App mockup - simplified interface
export const APP_MOCKUP = `╔════════════════════════════════════════════════════════════╗
║ ColorClip Pro                          ─  ☐  ✕             ║
╠════════════════════════════════════════════════════════════╣
║  ┌──────────────────┐  ┌─────────────────────────────────┐ ║
║  │  PALETTE         │  │  COLOR PICKER                   │ ║
║  ├──────────────────┤  │                                 │ ║
║  │ ▓ ▓ ▓ ▓ ▓       │  │     ╭─────────╮                 │ ║
║  │ ▓ ▓ ░ ░ ░       │  │    ╱   ●     ╲                 │ ║
║  │ ░ ░ ░ ░ ░       │  │   │     ◉     │ ┌──────────┐   │ ║
║  │                  │  │    ╲         ╱  │ H: 165   │   │ ║
║  │ #33CC99          │  │     ╰─────────╯  │ S: 100   │   │ ║
║  │                  │  │                  │ V:  80   │   │ ║
║  │ [Add Swatch]     │  │     ╭────────╮   │ A: 255   │   │ ║
║  │ [Eyedropper]     │  │     │ ▓▓▓▓▓▓ │   └──────────┘   │ ║
║  │                  │  │     │ ▓▓▓▓▓▓ │                  │ ║
║  └──────────────────┘  │     ╰────────╯                  │ ║
║                         └─────────────────────────────────┘ ║
╚════════════════════════════════════════════════════════════╝`;

export const APP_MOCKUP_COMPACT = `┌─────────────────────────────────────┐
│ ColorClip Pro              ─  ☐  ✕ │
├─────────────────────────────────────┤
│ ■ ■ ■ ■ ■   │ H: 165 │ ╭────────╮ │
│ ■ ■ ■ ■ ■   │ S: 100 │ │ ▓▓▓▓▓▓ │ │
│ ■ ■ ■ ■ ■   │ V:  80 │ │ ▓▓▓▓▓▓ │ │
│             │ A: 255 │ ╰────────╯ │
│ #33CC99     └────────┘            │
└─────────────────────────────────────┘`;

// Terminal prompt
export const TERMINAL_PROMPT = '>';
export const TERMINAL_PROMPT_WITH_CURSOR = '>_';

// Dividers
export const DIVIDER_LIGHT = '────────────────────────────────────────';
export const DIVIDER_HEAVY = '════════════════════════════════════════';
export const DIVIDER_DOUBLE = '╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌';

// Progress bar
export const progressBar = (percent: number, width: number = 20) => {
  const filled = Math.round((percent / 100) * width);
  const empty = width - filled;
  return `[${'█'.repeat(filled)}${'░'.repeat(empty)}] ${percent}%`;
};

// Status indicators
export const STATUS_ONLINE = '● ONLINE';
export const STATUS_OFFLINE = '○ OFFLINE';
export const STATUS_SYNCING = '◐ SYNCING';
export const STATUS_ERROR = '✗ ERROR';

// Arrows
export const ARROW_RIGHT = '→';
export const ARROW_LEFT = '←';
export const ARROW_UP = '↑';
export const ARROW_DOWN = '↓';
export const ARROW_DOUBLE_RIGHT = '⇒';
export const ARROW_DOUBLE_LEFT = '⇐';
