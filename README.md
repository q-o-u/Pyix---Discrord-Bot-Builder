
## Features

- **100+ Command Templates** — Moderation, fun, utility, economy, music, and events — ready to use out of the box.
- **Visual Logic System** — Build IF / THEN / ELSE flows with 18 conditions, 17 actions, and 30+ variables. No code needed.
- **Auto-Moderation** — Anti-spam, anti-links, bad word filters, mass mention detection — all built in.
- **One-Click Run** — Start and stop your bot directly from the app. No terminal required.
- **Slash Commands** — Toggle between prefix commands, slash commands, or both with one click.
- **Live Preview** — Discord-style preview of your bot's responses as you configure them.
- **Auto-Save** — Your entire configuration is saved automatically and restored on launch.
- **Code Export** — Export the generated `bot.js` file and run it anywhere.

## Screenshots

> Coming soon

## Getting Started

### Requirements

- [Node.js](https://nodejs.org/) v18 or later
- Windows 10+

### Installation

1. Clone or download this repository
2. Double-click **`install.bat`** to install all dependencies
3. Run the app:

```bash
npm start
```

### Manual Installation

```bash
npm install
npm start
```

## How It Works

1. **Add Commands** — Click the + button and pick from 100+ templates across 6 categories.
2. **Configure** — Fill in the fields (response text, permissions, cooldowns, etc.).
3. **Add Logic** — Attach IF/THEN/ELSE conditions and actions to any command.
4. **Set Your Token** — Paste your Discord bot token in the settings panel.
5. **Run** — Hit the green play button. Your bot goes online instantly.

## Project Structure

```
Pyix/
├── main.js            # Electron main process
├── preload.js         # IPC bridge between main and renderer
├── renderer/
│   ├── index.html     # App UI
│   ├── app.js         # App logic, templates, code generation
│   └── style.css      # Styles
├── install.bat        # One-click dependency installer
└── package.json
```

## Tech Stack

- **Electron** — Desktop app framework
- **Discord.js** v14 — Bot runtime
- **Vanilla JS** — No frontend framework, pure DOM manipulation

## License

MIT

---

<p align="center">Built with ❤️ for the Discord community</p>
