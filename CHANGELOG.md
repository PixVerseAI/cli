# Changelog

All notable changes to PixVerse CLI will be documented in this file.


## [1.0.4](https://github.com/PixVerseAI/cli/releases/tag/v1.0.4) — 2026-03-23

### Documentation

- Rewrite public README with full product intro, usage guide, and accurate command examples

### Features

- Update creation success message to "Generation Task Created"

### Miscellaneous

- Update dependencies and configuration files

## [1.0.0](https://github.com/PixVerseAI/cli/releases/tag/v1.0.0) — 2026-03-06

Initial release of PixVerse CLI.

### Creation

- **Text to Video / Image to Video** — generate videos from text prompts or reference images (`create video`)
- **Text to Image / Image to Image** — generate images from text or transform existing images (`create image`)
- **Transition** — create smooth transitions between keyframes (`create transition`)
- **Speech** — add lip-sync speech to videos via TTS or audio file (`create speech`)
- **Sound Effects** — add AI-generated sound effects to videos (`create sound`)
- **Extend** — extend video duration (`create extend`)
- **Upscale** — upscale video resolution (`create upscale`)
- **Reference** — generate videos with character reference images (`create reference`)

### Task & Asset Management

- Check task status and wait for completion (`task status`, `task wait`)
- List, inspect, download, and delete generated assets (`asset list`, `asset info`, `asset download`, `asset delete`)

### Account

- OAuth device flow authentication (`auth login`)
- View account info and credit usage (`account info`, `account usage`)
- Open subscription page in browser (`subscribe`)

### CLI Features

- Interactive wizard mode for all creation commands
- JSON output (`--json` / `-p`) for scripts and AI agents
- Configurable defaults (`config set`, `config list`, `config reset`)
- Structured exit codes for error handling