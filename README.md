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

This opens your browser where you confirm the authorization. The CLI receives a token automatically and stores it locally.

- Token is valid for 30 days
- CLI sessions are independent from your web/app sessions
- Run `pixverse auth status` to check your login state and credits
- Run `pixverse auth logout` to remove the stored token

> You need a PixVerse account to use the CLI. Sign up at [pixverse.ai](https://pixverse.ai) if you don't have one.

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

# Upscale video resolution
pixverse create upscale --video <video_id> --quality 1080p

# Generate video with character reference (1–7 images)
pixverse create reference --images ./char1.png ./char2.png --prompt "Two friends walking in a park"

# Create from a template/effect
pixverse create template --template-id 12345 --image ./photo.png
```

### Task Management

```bash
# Check task status
pixverse task status <id>

# Wait for a task to complete
pixverse task wait <id>
```

### Asset Management

```bash
# List your generated assets
pixverse asset list

# Get asset details
pixverse asset info <id>

# Download a generated video or image
pixverse asset download <id>

# Delete an asset
pixverse asset delete <id>
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
| `create upscale` | Upscale video resolution |
| `create reference` | Generate video with character references |
| `create template` | Create from a template/effect |
| `template categories` | List template categories |
| `template list` | List templates (with category filter) |
| `template search` | Search templates by keyword |
| `template info` | Get template details |
| `task status` | Check task status |
| `task wait` | Wait for task completion |
| `asset list` | List generated assets |
| `asset info` | Get asset details |
| `asset download` | Download a generated asset |
| `asset delete` | Delete an asset |
| `account info` | View account info |
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
| `-V, --version` | Show CLI version |
| `-h, --help` | Show help for any command |

## Links

- [PixVerse Website](https://pixverse.ai)
- [Report Issues](https://github.com/PixVerseAI/cli/issues)

## License

[MIT](LICENSE)
