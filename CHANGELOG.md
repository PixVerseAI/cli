# Changelog

All notable changes to PixVerse CLI will be documented in this file.

## [1.1.9](https://github.com/PixVerseAI/cli/releases/tag/v1.1.9) — 2026-05-15

### Features

- Add `v6` model support to `create reference`
- `create image` default model is now `gpt-image-2.0`

## [1.1.8](https://github.com/PixVerseAI/cli/releases/tag/v1.1.8) — 2026-05-14

### Breaking Changes

- Remove `create sound` command
- Drop deprecated models from selected creation modes (passing them as `--model` now fails validation):
  - `create video`: `v5.5`, `v5`, `v5-fast`
  - `create extend`: `v5.5`, `v5`
  - `create reference`: `v5`
  - `create transition` (2 frames): `v5.5`, `v5`, `v4.5`
  - `create transition` (3+ frames): `v4.5`

### Features

- Add `2160p` quality for `seedream-5.0-lite`
- `create <mode> --no-wait --json` output now includes the resolved `params`

## [1.1.7](https://github.com/PixVerseAI/cli/releases/tag/v1.1.7) — 2026-05-09

### Features

- Support Seedance 2.0 mixed image+video reference
- Support more GPT Image 2 aspect ratios

### Refactor

- Simplify GPT Image 2 aspect ratio validation

## [1.1.6](https://github.com/PixVerseAI/cli/releases/tag/v1.1.6) — 2026-04-27

### Features

- Enable grok-imagine for extend and reference modes

## [1.1.5](https://github.com/PixVerseAI/cli/releases/tag/v1.1.5) — 2026-04-27

### Features

- Add happyhorse-1.0 video model

## [1.1.4](https://github.com/PixVerseAI/cli/releases/tag/v1.1.4) — 2026-04-22

### Features

- Add gpt-image-2.0 image model

## [1.1.3](https://github.com/PixVerseAI/cli/releases/tag/v1.1.3) — 2026-04-20

### Bug Fixes

- Auto-compress oversized local images and harden JSON/download behavior

## [1.1.2](https://github.com/PixVerseAI/cli/releases/tag/v1.1.2) — 2026-04-16

### Features

- Add 1080p support for seedance-2.0-standard video generation

## [1.1.1](https://github.com/PixVerseAI/cli/releases/tag/v1.1.1) — 2026-04-16

### Features

- Add veo-3.1-lite model

## [1.1.0](https://github.com/PixVerseAI/cli/releases/tag/v1.1.0) — 2026-04-12

### Features

- Add seedance-2.0 and seedance-2.0-fast models
- Add kling-o3 and kling-3.0 models
- Add asset list --source/--off-peak filtering and asset upload command with unified upload flow
- Add saved folders command with list/items/new/rename/add/remove/delete

## [1.0.13](https://github.com/PixVerseAI/cli/releases/tag/v1.0.13) — 2026-04-10

### Features

- --image and --video support more input types for better compatibility

## [1.0.12](https://github.com/PixVerseAI/cli/releases/tag/v1.0.12) — 2026-04-08

### Features

- Add pixverse-c1 model support, use friendly model display names

## [1.0.11](https://github.com/PixVerseAI/cli/releases/tag/v1.0.11) — 2026-04-07

### Bug Fixes

- Support batch polling for --count > 1 across all create commands

## [1.0.10](https://github.com/PixVerseAI/cli/releases/tag/v1.0.10) — 2026-04-04

### Features

- Add create motion-control command

## [1.0.9](https://github.com/PixVerseAI/cli/releases/tag/v1.0.9) — 2026-04-02

### Features

- Add create modify command with keyframe support

## [1.0.8](https://github.com/PixVerseAI/cli/releases/tag/v1.0.8) — 2026-04-02

### Bug Fixes

- Add `--no-audio` flag to `create video`, `create transition`, `create extend`, and `create reference` to allow disabling audio generation
- Add `--no-multi-shot` flag to `create video` to allow disabling multi-shot mode

## [1.0.7](https://github.com/PixVerseAI/cli/releases/tag/v1.0.7) — 2026-03-31

### Features

- Add workspace support (list, status, switch, manage)

## [1.0.6](https://github.com/PixVerseAI/cli/releases/tag/v1.0.6) — 2026-03-30

### Bug Fixes

- Validate image model before API call to prevent silent fallback

## [1.0.5](https://github.com/PixVerseAI/cli/releases/tag/v1.0.5) — 2026-03-30

### Features

- Add V6 model support, refactor defaults caching

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
