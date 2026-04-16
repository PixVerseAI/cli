# PixVerse CLI

The official command-line interface (CLI) for [PixVerse](https://pixverse.ai) — create AI-powered videos and images directly from your terminal.

## What is PixVerse?

PixVerse is an AI-powered creative platform that generates high-quality videos and images from text prompts or reference images. It supports a wide range of creative workflows including text-to-video, image-to-video, text-to-image, video transitions, lip-sync speech, sound effects, templates/effects, and more.

## What is PixVerse CLI?

PixVerse CLI is essentially **a UI-free version of the PixVerse website**. All features and capabilities are aligned with the web experience — if you can do it on [pixverse.ai](https://pixverse.ai), you can do it from the command line with the same models, parameters, and quality.

It is designed for:

- **AI agents** — structured JSON output, deterministic exit codes, and pipeable commands make it a perfect tool for autonomous workflows (e.g. Claude Code, Cursor, Codex, LangChain, custom agents).
- **Developers & power users** — scriptable video/image generation without leaving the terminal.
- **Automation** — integrate AI content generation into CI/CD pipelines, batch processing scripts, or content production workflows.

## Subscription Required

PixVerse CLI uses the same credit system as the website — generating videos and images consumes credits from your PixVerse account balance with the same pricing. To prevent abuse, **PixVerse CLI is currently available to subscribed users only**. For details on subscription plans and member benefits, see the [PixVerse Subscribe](https://app.pixverse.ai/subscribe) page.

## Installation

```bash
npm install -g pixverse
```

Or run without installing:

```bash
npx pixverse
```

**Requirements:** Node.js >= 20

## Authentication

PixVerse CLI uses OAuth device flow — no need to manually copy tokens:

```bash
pixverse auth login
```

This opens a browser where you confirm the authorization. You can also copy the URL and authorize from **any browser on any device** — useful for SSH or headless environments. The CLI receives a token automatically and stores it locally.

- Token is valid for 30 days
- CLI sessions are independent from your web/app sessions
- Run `pixverse auth status` to check your login state and credits
- Run `pixverse auth logout` to remove the stored token

> You need a PixVerse account to use the CLI. Sign up at [pixverse.ai](https://pixverse.ai) if you don't have one.

## Supported Models

### Video Models (`--model <value>`)

| Model | `--model` value | Quality | Duration | Aspect Ratio |
|:---|:---|:---|:---|:---|
| PixVerse V6 *(default)* | `v6` | `360p` `540p` `720p` `1080p` | `1`–`15`s | `16:9` `4:3` `1:1` `3:4` `9:16` `3:2` `2:3` `21:9` |
| PixVerse C1 | `pixverse-c1` | `360p` `540p` `720p` `1080p` | `1`–`15`s | `16:9` `4:3` `1:1` `3:4` `9:16` `3:2` `2:3` |
| PixVerse v5.6 | `v5.6` | `360p` `480p` `540p` `720p` `1080p` | `1`–`10`s | `16:9` `4:3` `1:1` `3:4` `9:16` `3:2` `2:3` |
| PixVerse v5.5 | `v5.5` | `360p` `480p` `540p` `720p` `1080p` | `1`–`10`s | `16:9` `4:3` `1:1` `3:4` `9:16` `3:2` `2:3` |
| PixVerse v5 | `v5` | `360p` `480p` `540p` `720p` `1080p` | `1`–`10`s | `16:9` `4:3` `1:1` `3:4` `9:16` `3:2` `2:3` |
| PixVerse V5 Fast | `v5-fast` | `360p` `480p` `540p` `720p` `1080p` | `1`–`10`s | `16:9` `4:3` `1:1` `3:4` `9:16` `3:2` `2:3` |
| PixVerse V4.5 | `v4.5` | `360p` `480p` `540p` `720p` `1080p` | `1`–`10`s | `16:9` `4:3` `1:1` `3:4` `9:16` `3:2` `2:3` |
| Seedance 2.0 Standard | `seedance-2.0-standard` | `480p` `720p` `1080p` | `4`–`15`s | `16:9` `4:3` `1:1` `3:4` `9:16` `21:9` |
| Seedance 2.0 Fast | `seedance-2.0-fast` | `480p` `720p` | `4`–`15`s | `16:9` `4:3` `1:1` `3:4` `9:16` `21:9` |
| Kling O3 Pro | `kling-o3-pro` | `720p` | `3`–`15`s | `16:9` `9:16` `1:1` |
| Kling O3 Standard | `kling-o3-standard` | `720p` | `3`–`15`s | `16:9` `9:16` `1:1` |
| Kling 3.0 Pro | `kling-3.0-pro` | `720p` | `3`–`15`s | `16:9` `9:16` `1:1` |
| Kling 3.0 Standard | `kling-3.0-standard` | `720p` | `3`–`15`s | `16:9` `9:16` `1:1` |
| Grok Imagine | `grok-imagine` | `480p` `720p` | `1`–`15`s | `16:9` `4:3` `1:1` `9:16` `3:4` `3:2` `2:3` |
| Veo 3.1 Lite | `veo-3.1-lite` | `720p` `1080p` | `4` `6` `8`s | `16:9` `9:16` |
| Veo 3.1 Standard | `veo-3.1-standard` | `720p` `1080p` `2160p` | `4` `6` `8`s | `16:9` `9:16` |
| Veo 3.1 Fast | `veo-3.1-fast` | `720p` `1080p` `2160p` | `4` `6` `8`s | `16:9` `9:16` |
| Sora 2 Pro | `sora-2-pro` | `720p` `1080p` | `4` `8` `12`s | `16:9` `9:16` |
| Sora 2 | `sora-2` | `720p` | `4` `8` `12`s | `16:9` `9:16` |

> Not all models support all creation modes. For per-mode model support (e.g. which models work with Transition, Reference, Motion Control), see the [PixVerse Skills](#for-ai-agents--advanced-usage) documentation.

### Image Models (`--model <value>`)

| Model | `--model` value | Quality | Aspect Ratio |
|:---|:---|:---|:---|
| Qwen-image *(default)* | `qwen-image` | `720p` `1080p` | `1:1` `16:9` `9:16` `4:3` `3:4` `5:4` `4:5` `3:2` `2:3` `21:9` |
| Nano Banana 2 | `gemini-3.1-flash` | `512p` `1080p` `1440p` `2160p` | `auto` `1:1` `16:9` `9:16` + more |
| Nano Banana Pro | `gemini-3.0` | `1080p` `1440p` `2160p` | `auto` `1:1` `16:9` `9:16` + more |
| Nano Banana | `gemini-2.5-flash` | `1080p` | `auto` `1:1` `16:9` `9:16` + more |
| Seedream 5.0 Lite | `seedream-5.0-lite` | `1440p` `1800p` | `auto` `1:1` `16:9` `9:16` + more |
| Seedream 4.5 | `seedream-4.5` | `1440p` `2160p` | `auto` `1:1` `16:9` `9:16` + more |
| Seedream 4.0 | `seedream-4.0` | `1080p` `1440p` `2160p` | `auto` `1:1` `16:9` `9:16` + more |
| Kling Image O3 | `kling-image-o3` | `1080p` `1440p` `2160p` | `16:9` `9:16` `1:1` + more |
| Kling Image V3 | `kling-image-v3` | `1080p` `1440p` | `16:9` `9:16` `1:1` + more |

---

## Usage

### Interactive Mode

Run any creation command without arguments to enter the interactive wizard:

```bash
pixverse create video
pixverse create image
```

The wizard guides you through prompt, model, quality, aspect ratio, and other options step by step.

### Text to Video

```bash
pixverse create video --prompt "A cat walking on Mars" --model v6 --quality 720p --aspect-ratio 16:9
```

### Image to Video

```bash
pixverse create video --prompt "Slow zoom in" --image ./photo.png
```

### Text to Image

```bash
pixverse create image --prompt "Cyberpunk cityscape at night" --aspect-ratio 16:9
```

### Image to Image

```bash
pixverse create image --prompt "Turn this into a watercolor painting" --image ./photo.png
```

### Other Creation Modes

```bash
# Create a transition between keyframes (requires 2+ images)
pixverse create transition --images ./frame1.png ./frame2.png ./frame3.png

# Add lip-sync speech to a video (via TTS or audio file)
pixverse create speech --video <video_id> --tts-text "Hello world"
pixverse create speech --video <video_id> --audio ./speech.mp3

# Add AI sound effects to a video
pixverse create sound --video <video_id> --prompt "Birds chirping in a forest"

# Extend video duration
pixverse create extend --video <video_id>

# Modify an existing video
pixverse create modify --video <video_id> --prompt "Change the background to a beach"

# Upscale video resolution
pixverse create upscale --video <video_id> --quality 1080p

# Generate video with character reference (1–7 images)
pixverse create reference --images ./char1.png ./char2.png --prompt "Two friends walking in a park"

# Motion control — character image + motion reference video
pixverse create motion-control --image ./character.png --video ./dance.mp4

# Create from a template/effect
pixverse create template --template-id 12345 --image ./photo.png
```

### Common Creation Flags

These flags are available across most `create` subcommands:

| Flag | Description |
|:---|:---|
| `--count <n>` | Generate multiple variations (1–4, default 1) |
| `--seed <number>` | Set random seed for reproducible results |
| `--off-peak` | Use off-peak pricing (lower credit cost) |
| `--audio` / `--no-audio` | Enable or disable audio generation |
| `--multi-shot` / `--no-multi-shot` | Enable or disable multi-shot mode (video only) |
| `--no-wait` | Return immediately without waiting for completion |
| `--timeout <sec>` | Polling timeout in seconds (default 300) |

### Task Management

```bash
# Check task status
pixverse task status <id>

# Wait for a task to complete
pixverse task wait <id>
```

### Asset Management

```bash
# List your generated assets (default: created videos)
pixverse asset list
pixverse asset list --type image
pixverse asset list --source upload
pixverse asset list --source create --off-peak

# Upload a local file or URL to asset library
pixverse asset upload ./photo.png
pixverse asset upload https://example.com/image.jpg

# Get asset details
pixverse asset info <id>

# Download a generated video or image
pixverse asset download <id>

# Delete an asset
pixverse asset delete <id>
```

### Saved Folders

```bash
# List all saved folders
pixverse saved list

# List items in a folder (default folder if omitted)
pixverse saved items
pixverse saved items <folder_id> --type image --source upload

# Create a new folder
pixverse saved new "My Collection"

# Rename a folder
pixverse saved rename <folder_id> "New Name"

# Add assets to a folder
pixverse saved add <asset_id...> --folder <folder_id> --type video

# Remove assets from a folder
pixverse saved remove <asset_id...> --folder <folder_id> --type video

# Delete a folder
pixverse saved delete <folder_id>
```

### Templates

```bash
# List template categories
pixverse template categories

# List templates (with optional category filter and pagination)
pixverse template list
pixverse template list --category 5 --page 2 --limit 10

# Search templates by keyword
pixverse template search "dance"

# Get template details
pixverse template info <template_id>
```

### Workspaces

```bash
# List all workspaces
pixverse workspace list

# Show current workspace
pixverse workspace status

# Switch workspace (interactive or by ID)
pixverse workspace switch
pixverse workspace switch <workspace_id>

# Open workspace management in browser
pixverse workspace manage
```

### Account & Subscription

```bash
# View account info and credits
pixverse account info
pixverse account usage

# Open subscription page in browser
pixverse subscribe
```

### Configuration

```bash
# Set output directory
pixverse config set output-dir ~/Downloads

# View current configuration
pixverse config list

# Show config file path
pixverse config path

# Set per-mode creation defaults (model, quality, duration, etc.)
pixverse config defaults set video model v6
pixverse config defaults set video quality 1080p
pixverse config defaults show
```

## JSON Output for Scripts & Agents

All commands support `--json` (or `-p`) for structured JSON output, making the CLI easy to integrate into automated workflows:

```bash
pixverse create video --prompt "A sunset over the ocean" --json
pixverse task wait <id> --json
pixverse account info --json
```

### Pipeline Example

```bash
# Create a video → wait for completion → download
VID=$(pixverse create video --prompt "A cat on the moon" --json | jq -r '.video_id')
pixverse task wait "$VID" --json
pixverse asset download "$VID" --dest ./output/
```

### Exit Codes

| Code | Meaning |
|:---|:---|
| `0` | Success |
| `1` | General error |
| `2` | Timeout |
| `3` | Authentication error |
| `4` | Credit / subscription limit |
| `5` | Generation failed |
| `6` | Validation error |

## All Commands

| Command | Description |
|:---|:---|
| `auth login` | Login via browser (OAuth device flow) |
| `auth status` | Check authentication status |
| `auth logout` | Remove stored token |
| `create video` | Text-to-video or image-to-video |
| `create image` | Text-to-image or image-to-image |
| `create transition` | Create transitions between keyframes |
| `create speech` | Add lip-sync speech to video |
| `create sound` | Add AI sound effects to video |
| `create extend` | Extend video duration |
| `create modify` | Modify an existing video |
| `create upscale` | Upscale video resolution |
| `create reference` | Generate video with character references |
| `create motion-control` | Motion control with character image + reference video |
| `create template` | Create from a template/effect |
| `template categories` | List template categories |
| `template list` | List templates (with category filter) |
| `template search` | Search templates by keyword |
| `template info` | Get template details |
| `task status` | Check task status |
| `task wait` | Wait for task completion |
| `asset list` | List assets (`--source create\|upload`, `--type video\|image`, `--off-peak`) |
| `asset upload` | Upload a local file or HTTPS URL to asset library |
| `asset info` | Get asset details |
| `asset download` | Download a generated asset |
| `asset delete` | Delete an asset |
| `saved list` | List saved folders |
| `saved items` | List items in a saved folder |
| `saved new` | Create a new saved folder |
| `saved rename` | Rename a saved folder |
| `saved add` | Add assets to a saved folder |
| `saved remove` | Remove assets from a saved folder |
| `saved delete` | Delete a saved folder |
| `workspace list` | List all workspaces |
| `workspace status` | Show current workspace |
| `workspace switch` | Switch workspace (interactive or by ID) |
| `workspace manage` | Open workspace management in browser |
| `account info` | View account info and workspace credits |
| `account usage` | View credit usage |
| `subscribe` | Open subscription page |
| `config set` | Set a config value |
| `config get` | Get a config value |
| `config list` | List all config values |
| `config reset` | Reset config to defaults |
| `config path` | Show config file path |
| `config defaults` | Manage per-mode creation defaults |

## Global Flags

| Flag | Description |
|:---|:---|
| `--json` | Output as JSON |
| `-p` | Print mode (alias for `--json`) |
| `--workspace-id <id>` | Override active workspace for this command (0 = personal) |
| `-V, --version` | Show CLI version |
| `-h, --help` | Show help for any command |

## For AI Agents — Advanced Usage

For AI agents (Claude Code, Cursor, Codex, etc.), we **strongly recommend** installing [PixVerse Skills](https://github.com/PixVerseAI/skills) — a comprehensive skill library that teaches agents how to use PixVerse CLI correctly with full model constraints, multi-step pipelines, and error handling.

**Install via Skills CLI:**

```bash
npx skills add https://github.com/pixverseai/skills --skill pixverse-ai-image-and-video-generator
```

**Or browse on ClawHub:**

[https://clawhub.ai/pixverse-official/pixverse-ai-image-and-video-generator](https://clawhub.ai/pixverse-official/pixverse-ai-image-and-video-generator)

Skills include:
- Per-model parameter constraints (which models support which modes, quality levels, durations, aspect ratios)
- End-to-end workflow pipelines (text-to-video, storyboard-to-video, video production, motion control, etc.)
- Prompt optimization techniques for better generation quality
- Batch creation patterns and error handling strategies

## Links

- [PixVerse Website](https://pixverse.ai)
- [PixVerse Skills](https://github.com/PixVerseAI/skills) — Agent skill library
- [npm Package](https://www.npmjs.com/package/pixverse)
- [Changelog](https://github.com/PixVerseAI/cli/blob/main/CHANGELOG.md)
- [Report Issues](https://github.com/PixVerseAI/cli/issues)

## License

[MIT](LICENSE)
