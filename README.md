# PixVerse CLI

The official command-line interface (CLI) for [PixVerse](https://pixverse.ai) — create AI-powered videos, images, and audio directly from your terminal.

## What is PixVerse?

PixVerse is an AI-powered creative platform that generates high-quality videos, images, and audio from text prompts or reference images. It supports a wide range of creative workflows including text-to-video, image-to-video, text-to-image, video transitions, text-to-speech (voice synthesis), music generation, templates/effects, and more.

## What is PixVerse CLI?

PixVerse CLI is essentially **a UI-free version of the PixVerse website**. All features and capabilities are aligned with the web experience — if you can do it on [pixverse.ai](https://pixverse.ai), you can do it from the command line with the same models, parameters, and quality.

It is designed for:

- **AI agents** — structured JSON output, deterministic exit codes, and pipeable commands make it a perfect tool for autonomous workflows (e.g. Claude Code, Cursor, Codex, LangChain, custom agents).
- **Developers & power users** — scriptable video/image/audio generation without leaving the terminal.
- **Automation** — integrate AI content generation into CI/CD pipelines, batch processing scripts, or content production workflows.

## Subscription Required

PixVerse CLI uses the same credit system as the website — generating videos, images, and audio consumes credits from your PixVerse account balance with the same pricing. To prevent abuse, **PixVerse CLI is currently available to subscribed users only**. For details on subscription plans and member benefits, see the [PixVerse Subscribe](https://app.pixverse.ai/subscribe) page.

## Installation

```bash
npm install -g pixverse
```

Or run without installing:

```bash
npx pixverse
```

**Requirements:** Node.js >= 22.12

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

Supported modes are `pixverse create` subcommands. Defaults are mode-specific.

| Model | `--model` value | Supported create modes | Quality | Duration | Aspect Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- |
| PixVerse V6 | `v6` | `video` (default), `transition` (2 frames, default), `extend` (default), `reference` (default) | `360p` `540p` `720p` `1080p` | `1`–`15`s | `16:9` `21:9` `4:3` `1:1` `3:4` `9:16` `3:2` `2:3` |
| PixVerse C1 | `pixverse-c1` | `video`, `transition` (2 frames), `reference` | `360p` `540p` `720p` `1080p` | `1`–`15`s | `16:9` `4:3` `1:1` `3:4` `9:16` `3:2` `2:3` |
| Seedance 2.5 | `seedance-2.5` | `video`, `transition` (2 frames), `reference` | `480p` `720p` `1080p` | `4`–`30`s | `auto` `21:9` `16:9` `4:3` `1:1` `3:4` `9:16` |
| Seedance 2.0 Standard | `seedance-2.0-standard` | `video`, `transition` (2 frames), `reference` | `480p` `720p` `1080p` `2160p` | `4`–`15`s | `16:9` `4:3` `1:1` `3:4` `9:16` `21:9` |
| Seedance 2.0 Fast | `seedance-2.0-fast` | `video`, `transition` (2 frames), `reference` | `480p` `720p` | `4`–`15`s | `16:9` `4:3` `1:1` `3:4` `9:16` `21:9` |
| Seedance 2.0 Mini | `seedance-2.0-mini` | `video`, `transition` (2 frames), `reference` | `480p` `720p` | `4`–`15`s | `16:9` `4:3` `1:1` `3:4` `9:16` `21:9` |
| MiniMax H3 | `minimax-h3` | `video`, `transition` (2 frames), `reference` | `768p` `1440p` | `5`–`15`s | `21:9` `16:9` `4:3` `1:1` `3:4` `9:16` `auto` |
| FLUX 3 | `flux-3.0` | `video` | `720p` `1080p` | `5`–`20`s | `auto` `21:9` `2:1` `16:9` `4:3` `1:1` `3:4` `9:16` |
| Wan 3.0 | `wan-3.0` | `video`, `transition` (2 frames), `reference` | `480p` `720p` `1080p` | `2`–`30`s | `auto` `16:9` `4:3` `1:1` `3:4` `9:16` |
| Google Gemini Omni | `gemini-omni-flash` | `video`, `reference` | `720p` | `3`–`10`s | `16:9` `9:16` |
| Happy Horse 1.0 | `happyhorse-1.0` | `video` | `720p` `1080p` | `3`–`15`s | `16:9` `9:16` `1:1` `4:3` `3:4` |
| Kling O3 Pro | `kling-o3-pro` | `video`, `transition` (2 frames), `reference` | Selected by model ID | `3`–`15`s | `16:9` `9:16` `1:1` |
| Kling O3 Standard | `kling-o3-standard` | `video`, `transition` (2 frames), `reference` | Selected by model ID | `3`–`15`s | `16:9` `9:16` `1:1` |
| Kling O3 4K | `kling-o3-4k` | `video`, `transition` (2 frames), `reference` | Selected by model ID | `3`–`15`s | `16:9` `9:16` `1:1` |
| Kling 3.0 Pro | `kling-3.0-pro` | `video`, `transition` (2 frames) | Selected by model ID | `3`–`15`s | `16:9` `9:16` `1:1` |
| Kling 3.0 Standard | `kling-3.0-standard` | `video`, `transition` (2 frames) | Selected by model ID | `3`–`15`s | `16:9` `9:16` `1:1` |
| Kling 3.0 4K | `kling-3.0-4k` | `video`, `transition` (2 frames) | Selected by model ID | `3`–`15`s | `16:9` `9:16` `1:1` |
| Grok Imagine 1.5 | `grok-imagine-1.5` | `video` | `480p` `720p` `1080p` | `1`–`15`s | Derived from source image |
| Grok Imagine | `grok-imagine` | `video`, `extend`, `reference` | `480p` `720p` | `1`–`15`s | `16:9` `4:3` `1:1` `9:16` `3:4` `3:2` `2:3` |
| Veo 3.1 Lite | `veo-3.1-lite` | `video`, `transition` (2 frames) | `720p` `1080p` | `4` `6` `8`s | `16:9` `9:16` |
| Veo 3.1 Standard | `veo-3.1-standard` | `video`, `transition` (2 frames) | `720p` `1080p` `2160p` | `4` `6` `8`s | `16:9` `9:16` |
| Veo 3.1 Fast | `veo-3.1-fast` | `video`, `transition` (2 frames) | `720p` `1080p` `2160p` | `4` `6` `8`s | `16:9` `9:16` |
| Sora 2 Pro | `sora-2-pro` | `video` | `720p` `1080p` | `4` `8` `12`s | `16:9` `9:16` |
| Sora 2 | `sora-2` | `video` | `720p` | `4` `8` `12`s | `16:9` `9:16` |
| PixVerse V5.6 | `v5.6` | `video`, `transition` (2 frames), `reference`, `motion-control` (default) | `360p` `480p` `540p` `720p` `1080p` | `1`–`10`s | `16:9` `9:16` `1:1` `4:3` `3:4` `3:2` `2:3` |
| PixVerse V5.5 | `v5.5` | `modify` (default) | `360p` `540p` `720p` | — | — |
| PixVerse V5 | `v5` | `transition` (3+ frames, default) | `360p` `540p` `720p` `1080p` | `1`–`10`s | — |

> Seedance 2.5 defaults to `720p`, 5 seconds, and `16:9` for generation without a reference video. Text-to-video and reference mode accept `--aspect-ratio auto` in addition to the fixed ratios. Reference requests containing a video default to automatic duration and lock the aspect ratio to `auto`; selecting an integer from 4 through 30 unlocks both automatic and fixed aspect ratios. Reference mode also accepts the optional `--task-type <type>` flag (`auto` by default, `reference`, `edit`, or `extend`) to guide the task intent; this flag is rejected for other models. Image-to-video retains its existing fixed-ratio behavior, while transition does not send a user-selected aspect ratio. Generated audio, multi-shot, and off-peak generation are unsupported.

> MiniMax H3 text-to-video defaults to `16:9`. Image-to-video forces `auto`; reference mode with images supports both `auto` and fixed aspect ratios and defaults to `auto`.

> FLUX 3 is available only in `create video`. Text-to-video defaults to `16:9`; image-to-video defaults to `auto` while preserving an explicit fixed ratio. Requests always include the model's fixed safety setting.

> Wan 3.0 defaults to `720p`, 5 seconds, and `auto`, and is available in video, two-frame transition, and reference creation. Reference accepts up to 10 images, 5 videos, and 5 audios (20 total), including audio-only input. Video and audio reference durations are each limited to 15 seconds in aggregate. With a video reference, duration defaults to `auto`; fixed output duration is limited by `30 - reference video duration`.

> Kling resolution is selected entirely by the model ID. Kling requests do not send `quality`; an explicit `--quality` value is ignored with a warning. Both 4K models support text/image-to-video and two-frame transitions, while only Kling O3 4K supports `create reference`.

> Reference video editing: V6 accepts up to 10 images and 2 videos (15s total after per-clip rounding); requests with a video lock duration to `auto` and reject fixed values. Seedance 2.5 accepts up to 10 videos (30s total); requests with a video default to `auto` but may select a fixed 4–30 seconds. Gemini Omni accepts up to 5 images and 1 video up to 10s; requests with a video lock duration to `auto` and reject fixed values. Kling O3 accepts up to 7 images without video or 4 images with 1 video up to 15s (200MB, 2048px per side). Grok Imagine accepts either 1–7 images with normal fixed duration or exactly 1 MP4 video up to 8.7s; video mode locks duration to `auto` and derives aspect ratio from the source video.

> Grok Imagine 1.5 is image-to-video only — it requires `--image`, supports `480p`, `720p`, and `1080p`, and derives its aspect ratio from the input image (the `--aspect-ratio` flag is ignored).

> Audio creation uses separate model families: `create voice` for text-to-speech and `create music` for prompt-to-music.

### Image Models (`--model <value>`)

| Model | `--model` value | Quality | Aspect Ratio | Max references |
| :--- | :--- | :--- | :--- | :--- |
| GPT Image 2 _(default)_ | `gpt-image-2.0` | `1080p` `1440p` `2160p` | `1:1` `16:9` `9:16` `4:3` `3:4` `3:2` `2:3` `2:1` `1:2` `21:9` | 9 |
| Nano Banana 2 | `gemini-3.1-flash` | `512p` `1080p` `1440p` `2160p` | `auto` `1:1` `16:9` `9:16` `4:3` `3:4` `5:4` `4:5` `3:2` `2:3` `21:9` | 9 |
| Nano Banana 2 Lite | `gemini-3.1-flash-lite` | `1080p` | `auto` `1:1` `3:2` `2:3` `3:4` `4:3` `4:5` `5:4` `9:16` `16:9` `21:9` | 14 |
| Qwen-image | `qwen-image` | `720p` `1080p` | `1:1` `16:9` `9:16` `4:3` `3:4` `5:4` `4:5` `3:2` `2:3` `21:9` | 3 |
| Nano Banana Pro | `gemini-3.0` | `1080p` `1440p` `2160p` | `auto` `1:1` `16:9` `9:16` `4:3` `3:4` `5:4` `4:5` `3:2` `2:3` `21:9` | 9 |
| Nano Banana | `gemini-2.5-flash` | `1080p` | `auto` `1:1` `16:9` `9:16` `4:3` `3:4` `5:4` `4:5` `3:2` `2:3` `21:9` | 3 |
| Seedream 5.0 Pro | `seedream-5.0-pro` | `1080p` `1440p` | `auto` `1:1` `16:9` `9:16` `4:3` `3:4` `5:4` `4:5` `3:2` `2:3` `21:9` | 10 |
| Seedream 5.0 Lite | `seedream-5.0-lite` | `1440p` `1800p` `2160p` | `auto` `1:1` `16:9` `9:16` `4:3` `3:4` `5:4` `4:5` `3:2` `2:3` `21:9` | 6 |
| Seedream 4.5 | `seedream-4.5` | `1440p` `2160p` | `auto` `1:1` `16:9` `9:16` `4:3` `3:4` `5:4` `4:5` `3:2` `2:3` `21:9` | 6 |
| Seedream 4.0 | `seedream-4.0` | `1080p` `1440p` `2160p` | `auto` `1:1` `16:9` `9:16` `4:3` `3:4` `5:4` `4:5` `3:2` `2:3` `21:9` | 6 |
| Kling Image O3 | `kling-image-o3` | `1080p` `1440p` `2160p` | `16:9` `9:16` `1:1` `4:3` `3:4` `3:2` `2:3` `21:9` | 10 |
| Kling Image V3 | `kling-image-v3` | `1080p` `1440p` | `16:9` `9:16` `1:1` `4:3` `3:4` `3:2` `2:3` `21:9` | 1 |

### Voice / TTS Models (`create voice --model <value>`)

| Model | `--model` value | Provider | Max characters | Speed |
| :--- | :--- | :--- | :--- | :--- |
| MiniMax Speech 2.8 HD _(default)_ | `speech-2.8-hd` | MiniMax | 10,000 | `0.5`–`2` |
| MiniMax Speech 2.8 Turbo | `speech-2.8-turbo` | MiniMax | 10,000 | `0.5`–`2` |
| Eleven Multilingual v2 | `eleven-multilingual-v2` | ElevenLabs | 10,000 | `0.7`–`1.2` |
| Eleven v3 | `eleven-v3` | ElevenLabs | 5,000 | `0.7`–`1.2` |
| Eleven Turbo v2.5 | `eleven-turbo-v2.5` | ElevenLabs | 40,000 | `0.7`–`1.2` |

> Browse available preset voices with `pixverse voice presets --model <id>` and the full live model catalog with `pixverse voice models`.

### Music Models (`create music --model <value>`)

| Model | `--model` value | Provider | Duration | Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| MiniMax Music 3.0 | `music-3.0` | MiniMax | `10`–`240`s | lyrics, auto lyrics, instrumental |
| MiniMax Music 2.6 _(default)_ | `music-2.6` | MiniMax | `10`–`240`s | lyrics, auto lyrics, instrumental |
| ElevenLabs Music V2 | `music-v2` | ElevenLabs | `10`–`240`s | lyrics, auto lyrics, instrumental |
| ElevenLabs Music | `music-v1` | ElevenLabs | `10`–`240`s | lyrics, auto lyrics, instrumental |
| Google Lyria 3 Pro | `lyria-3-pro-preview` | Google | `10`–`240`s | auto lyrics, instrumental, image references |

> Browse the live music model catalog with `pixverse music models`.

---

## Usage

### Interactive Mode

Run any creation command without arguments to enter the interactive wizard:

```bash
pixverse create video
pixverse create image
```

The wizard guides you through prompt, model, quality, aspect ratio, and other options step by step.

Local image inputs larger than `1920x1920` or `5MB` are automatically resized/compressed before upload. Remote image URLs are validated by the backend as-is.

### Text to Video

```bash
pixverse create video --prompt "A cat walking on Mars" --model v6 --quality 720p --aspect-ratio 16:9

# Seedance 2.5 supports integer durations from 4 through 30 seconds
pixverse create video --prompt "A slow aerial orbit around an alpine lake" --model seedance-2.5 --quality 720p --duration 12 --aspect-ratio 21:9

# Seedance 2.5 can let the model determine the text-to-video aspect ratio
pixverse create video --prompt "A cinematic landscape revealed through fog" --model seedance-2.5 --aspect-ratio auto
```

### Text inputs: literal, a file, or stdin

Text-input flags — `--prompt` (all create commands), `--text` (`create voice`), and `--lyrics` (`create music`) — accept three forms, just like `--image` / `--video`:

- a **literal** string: `--prompt "A neon city skyline"`
- a **local file path**: `--prompt ./scene.txt` (the file's contents are used)
- `-` to read from **stdin**: `... | pixverse create video --prompt -`

```bash
pixverse create video --prompt ./scene.txt
cat scene.txt | pixverse create image --prompt - --json
echo "Hello from the command line" | pixverse create voice --text -
pixverse create music --prompt "Bright synth-pop" --lyrics ./lyrics.txt
```

> A value is treated as a file only when a matching file actually exists on disk; otherwise it's used as literal text (the same rule as `--image` / `--video`).

### Image to Video

```bash
pixverse create video --prompt "Slow zoom in" --image ./photo.png

# Seedance 2.5 image-to-video preserves an explicitly selected fixed ratio
pixverse create video --prompt "The subject turns toward the camera" --image ./portrait.png --model seedance-2.5 --aspect-ratio 4:3
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

# Seedance 2.5 transition requires exactly 2 frames; do not pass --aspect-ratio
pixverse create transition -m seedance-2.5 --images ./first.png ./last.png --prompt "A seamless transformation"

# Generate speech audio from text (text-to-speech)
pixverse create voice --text "Hello world" --voice-id <preset_voice_id> --output ./out.mp3
# Browse available models / preset voices:
pixverse voice models
pixverse voice presets --model speech-2.8-hd

# Generate music audio from a prompt
pixverse create music --prompt "A cinematic pop song with bright synths" --auto-lyrics
pixverse create music --prompt "Uplifting piano theme" --instrumental --duration-seconds 60
# Lyrics-capable models require lyrics unless --auto-lyrics or --instrumental is used:
# (--lyrics takes a literal string, a local file path, or - for stdin)
pixverse create music --prompt "Bright synth-pop, uplifting mood" --lyrics ./lyrics.txt
# Google Lyria supports image references and expects lyric-like instructions in --prompt:
pixverse create music -m lyria-3-pro-preview --prompt "Instrumental orchestral cue inspired by these images" --image ./moodboard.png
# Browse available music models:
pixverse music models

# Extend video duration
pixverse create extend --video <video_id>

# Modify an existing video
pixverse create modify --video <video_id> --prompt "Change the background to a beach"

# Upscale video resolution
pixverse create upscale --video <video_id> --quality 2160p

# Generate video from image references (V6 accepts up to 10 images)
pixverse create reference -m v6 --images ./char1.png ./char2.png --prompt "Two friends walking in a park"

# Edit video with V6 reference media (up to 2 videos, rounded total ≤ 15s)
pixverse create reference -m v6 --videos ./shot1.mp4 ./shot2.mov --duration auto --prompt "Turn the scene into a rainy night"

# Gemini Omni defaults to automatic duration with its single source video (up to 10s)
pixverse create reference -m gemini-omni-flash --images ./style.png --videos ./source.mp4 --prompt "Keep @video1's motion and apply @image1's style"

# Kling O3 4K accepts up to 4 images when a video is present (video ≤ 15s, 200MB, 2048px per side)
pixverse create reference -m kling-o3-4k --images ./character.png --videos ./motion.mov --prompt "Use @image1 as the subject in @video1"

# Grok Imagine accepts images or one MP4 video, but not both (video ≤ 8.7s)
pixverse create reference -m grok-imagine --videos ./source.mp4 --prompt "Replace the background with a desert"

# Seedance 2.5 reference — up to 50 total inputs: 30 images, 10 videos, and 10 audios;
# video and audio totals are each limited to 30s, audio needs an image or video,
# and --task-type defaults to auto (or explicitly accepts reference, edit, or extend)
pixverse create reference -m seedance-2.5 --images ./char.png --videos ./motion.mp4 --audios ./voice.mp3 --duration auto --aspect-ratio auto --prompt "@image1 follows @video1 and @audio1"

# Seedance 2.0 reference — mix images and videos (max 3 videos, total ≤ 15s)
pixverse create reference -m seedance-2.0-standard --images ./char.png --videos ./motion.mp4 --prompt "@image1 follows the motion in @video1"

# Seedance 2.0 reference — add audio references (max 3, each 2–15s, total ≤ 15s; needs a visual reference)
pixverse create reference -m seedance-2.0-standard --images ./char.png --audios ./voice.mp3 --prompt "@image1 speaks the line in @audio1"

# MiniMax H3 reference — mix up to 9 images, 3 videos, and 3 audios
pixverse create reference -m minimax-h3 --images ./char.png --videos ./motion.mp4 --audios ./voice.mp3 --prompt "@image1 follows @video1 and @audio1"

# Wan 3.0 reference — mixed inputs or audio-only, with automatic output duration when video is present
pixverse create reference -m wan-3.0 --videos ./motion.mp4 --audios ./voice.mp3 --duration auto --prompt "Follow @video1 and @audio1"

# Motion control — character image + motion reference video
pixverse create motion-control --image ./character.png --video ./dance.mp4

# Create from a template/effect
pixverse create template --template-id 12345 --image ./photo.png
```

Voice speed uses provider-specific validation:

| Provider | Default | Valid range | CLI flag |
| :--- | :--- | :--- | :--- |
| MiniMax | `1` | `0.5`–`2` | `--speed` |
| ElevenLabs | `1` | `0.7`–`1.2` | `--speed` |

### Common Creation Flags

These flags are available across most `create` subcommands:

| Flag | Type | Default | Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| `--count` | integer | `1` | `1`–`4` count | Number of generation results. |
| `--seed` | integer | — | model-specific | Random seed for reproducible generation. |
| `--off-peak` | boolean | `false` | model-specific | Use off-peak generation where supported. |
| `--audio` / `--no-audio` | boolean | `true` | model-specific | Enable or disable generated audio where supported. |
| `--multi-shot` / `--no-multi-shot` | boolean | `true` | model-specific | Enable multi-shot generation where supported. |
| `--no-wait` | boolean | `true` | model-specific | Wait for the generated asset unless disabled. |
| `--timeout` | integer | `300` | `1`–`∞` seconds | Polling timeout when waiting for completion. |

> Model-specific support still applies. Seedance 2.5 does not support `--audio`, `--multi-shot`, or `--off-peak`. Its `--audios` values in `create reference` are input references, not a generated-audio toggle.

### MiniApps

MiniApps are preset, single-purpose generators from the PixVerse web app (Magic
Extend, Image Region Editor, …). The CLI is a thin pass-through: it does not
bundle each app's parameter schema. Instead, `miniapps info <id>` returns the
app's **parameter schema** (required fields, types, enum values, and a
copy-pasteable example) — read it, then submit the app id plus its `args` as JSON
with `miniapps create`.

```bash
# List available MiniApps
pixverse miniapps list

# Show a MiniApp's details + its parameter schema (what to put in --params)
pixverse miniapps info magic_extend          # add --json for the machine-readable params_schema

# Create a MiniApp project — --id and --params are required; --params takes JSON (a literal, a file path, or - for stdin)
pixverse miniapps create --id magic_extend --params '{"image":"<media-path>","ratio":"16:9","quality":"720p"}'
pixverse miniapps create --id image_region_editor --params ./args.json

# create returns a project_id — query / download / delete it with --type miniapps
pixverse task status <project_id> --type miniapps
pixverse task wait <project_id> --type miniapps
pixverse asset info <project_id> --type miniapps
pixverse asset download <project_id> --type miniapps --dest ./out/
pixverse asset delete <project_id> --type miniapps
```

Media fields inside `--params` must be **media paths** — the `path` returned by
`asset upload` (not a URL, not a local file). The CLI passes `--params` straight
through without uploading, so upload first with `pixverse asset upload <file>` and
use the returned `path`.

### Canvas

Canvas lets you build and manage connected creative workflows. A Canvas project
contains nodes for prompts, reference media, generation tasks, and composed
outputs. Dependencies connect those nodes and determine when generation can
start.

The CLI uses these terms consistently:

| Term           | Meaning                                                        |
| :------------- | :------------------------------------------------------------- |
| Canvas project | One Canvas workspace containing nodes and their connections    |
| Node           | One input, generated asset, text artifact, or composition step |
| Dependency     | A connection that requires one node before another can run     |
| Patch          | A validated set of node and dependency changes                 |
| Dispatch       | Starting generation for specific ready nodes                   |
| Dispatch plan  | A confirmation record authorizing one exact batch of nodes     |
| Version        | One saved generation result for a node                         |

Canvas node structure and routing come from the current Canvas capabilities;
model and parameter constraints come from the installed CLI. Query their
combined view instead of copying a fixed catalog from examples.

Create an empty project when starting a new workflow. The name and description
are optional:

```bash
pixverse canvas project create \
  --name "Campaign workspace" \
  --description "Connected image and video workflow" \
  --json
```

For reliable automation, inspect capabilities → read the project → validate the
patch → apply the patch → dispatch generated nodes → check node status:

```bash
# 1. Create a project when needed and retain project_id
pixverse canvas project create --json

# 2. Check the current Canvas capabilities
pixverse capabilities canvas \
  --node-type image_generate \
  --selector text_to_image \
  --model qwen-image \
  --json
pixverse canvas node schema --node-type image_generate --json

# 3. Read the project and retain edit_version
pixverse canvas graph get --project-id "$PROJECT_ID" --json

# 4. Validate and apply the same patch input
pixverse canvas patch dry-run --project-id "$PROJECT_ID" --patch patch.json --json
pixverse canvas patch apply --project-id "$PROJECT_ID" --patch patch.json --json

# 5. Start generation only for diff.executable_node_ids from patch apply
pixverse canvas dispatch \
  --project-id "$PROJECT_ID" \
  --node-ids image_01,video_01 \
  --edit-version 13 \
  --json

# 6. Check only the nodes involved in this workflow
pixverse canvas graph status \
  --project-id "$PROJECT_ID" \
  --node-ids image_01,video_01 \
  --json
```

`--patch` accepts a JSON literal, a local file path, or `-` for stdin. The input
contains a `graph_patch` object without an outer request wrapper. For example,
`patch.json` can contain:

```json
{
  "schema_version": "canvas_agent_graph.v1",
  "base_edit_version": 12,
  "nodes": [
    {
      "node_id": "script_01",
      "node_type": "script",
      "title": "Opening scene",
      "artifact": { "text": "A wide establishing shot at sunrise." }
    }
  ]
}
```

The `--project-id` flag identifies the project. A matching `project_id` inside
the patch is accepted for compatibility, but omitting it is preferred. Keep all
IDs as strings. If the edit version has changed, read the project again and
rebuild the patch instead of replacing only `base_edit_version`.

For the same project and unchanged patch file, `dry-run` and `apply`
automatically derive the same stable idempotency key. Use
`--idempotency-key` only when your workflow needs to supply its own retry key.

Additional Canvas operations:

```bash
# Bind a specific batch of ready nodes to a dispatch plan
pixverse canvas dispatch rebind \
  --project-id "$PROJECT_ID" \
  --dispatch-plan-id plan-20260817-001 \
  --node-ids image_01,video_01 \
  --json

# After confirmation, dispatch the same nodes with rebind's edit_version
pixverse canvas dispatch \
  --project-id "$PROJECT_ID" \
  --dispatch-plan-id plan-20260817-001 \
  --node-ids image_01,video_01 \
  --edit-version "$REBIND_EDIT_VERSION" \
  --json

# List, inspect, and apply saved node versions
pixverse canvas node versions \
  --project-id "$PROJECT_ID" --node-id video_01 \
  --page 1 --page-size 20 --json
pixverse canvas node version \
  --project-id "$PROJECT_ID" --node-id video_01 \
  --history-id "$HISTORY_ID" --json
pixverse canvas node version apply \
  --project-id "$PROJECT_ID" --node-id video_01 \
  --history-id "$HISTORY_ID" --json

# Run generation again for a specific failed node
pixverse canvas node rerun \
  --project-id "$PROJECT_ID" --node-id video_01 \
  --edit-version 13 --json

# Extract the full audio track from a video node
pixverse canvas node extract-audio \
  --project-id "$PROJECT_ID" \
  --node-id audio_extract_01 \
  --source-node-id video_01 \
  --json
```

Important constraints:

- A `video_compose` node references completed source media only through
  `payload.tracks`. Omit `depends_on` entirely; composition timeline materials
  do not create Canvas dependency edges.
- `dispatch` and `graph reconcile` require explicit node IDs and the current
  `edit_version`; the CLI does not intentionally start every ready node in a
  project.
- Dispatch states `partial` and `failed` return a non-zero exit code. Add
  `--require-dispatch` when `skipped` or `no_ready_nodes` should also stop an
  automated workflow.
- Existing dependencies cannot be cleared or replaced in place. For an
  agent-created node, delete it in one patch, read the project again, then
  create a replacement with a new `node_id` and the complete desired
  dependencies in a second patch. Deleted IDs remain reserved, so do not reuse
  the old ID; redirect all downstream dependencies and node references to the
  replacement ID.
- Applying a version may return `applied=false` when that version is already
  current. This is a successful no-op. Read the project again before the next
  change.
- Audio extraction accepts a trusted source video node, not a raw media path.
  The CLI creates the target audio node when needed and extracts the complete
  audio track.

### Task Management

```bash
# Check task status
pixverse task status <id>

# Poll a voice/music audio task (audio is not auto-detected — pass --type audio)
pixverse task status <id> --type audio

# Poll a MiniApp project (pass --type miniapps; project_id comes from `miniapps create`)
pixverse task status <project_id> --type miniapps

# Batch status query with space-separated IDs (parallel; per-ID failures captured)
pixverse task status 123 456 789 --type video --json

# Comma-separated batch syntax remains supported
pixverse task status --ids 123,456,789 --type video --json

# Wait for a task to complete
pixverse task wait <id>
```

### Asset Management

```bash
# List your generated assets (default: created videos)
pixverse asset list
pixverse asset list --type image
pixverse asset list --type audio              # voice and music audio history
pixverse asset list --type audio --source upload
pixverse asset list --type miniapps           # MiniApp projects
pixverse asset list --source upload
pixverse asset list --source create --off-peak

# Upload a local file or URL to asset library
pixverse asset upload ./photo.png
pixverse asset upload ./voice-over.mp3
pixverse asset upload https://example.com/image.jpg

# Get asset details (type auto-detected: video → image → audio)
pixverse asset info <id>
# Pass --type to skip auto-detection
pixverse asset info <id> --type audio
pixverse asset info <id> --type audio --source upload

# Download a created video, image, or audio (uploads are not downloadable)
pixverse asset download <id>
pixverse asset download <id> --type audio --dest ./out/

# Delete a created asset — pass its id (auto-detected)
pixverse asset delete <id>
pixverse asset delete <id> --type audio

# Delete an uploaded asset — pass the id from `asset list --source upload`
pixverse asset delete <id> --source upload --type image
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

# View current concurrent generation slots (image / video)
pixverse account slots
pixverse account slots --json

# Open subscription page in browser
pixverse subscribe
```

### Keeping the CLI up to date

```bash
# Update to the latest published version
pixverse update
```

When run interactively, the CLI checks the npm registry at most once per day and prints a one-line "update available" notice to **stderr** (never to stdout, so `--json` output stays clean). The check is skipped in `--json`/`-p` mode, in CI, and when stdout/stderr is piped.

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

| Code | Meaning                                                |
| :--- | :----------------------------------------------------- |
| `0`  | Success                                                |
| `1`  | General error                                          |
| `2`  | Timeout                                                |
| `3`  | Authentication error                                   |
| `4`  | Credit / subscription limit                            |
| `5`  | Generation failed                                      |
| `6`  | Validation error                                       |
| `7`  | Concurrent generation limit; wait for a slot and retry |

## All Commands

| Command                      | Description                                                                         |
| :--------------------------- | :---------------------------------------------------------------------------------- |
| `auth login`                 | Login via browser (OAuth device flow)                                               |
| `auth status`                | Check authentication status                                                         |
| `auth logout`                | Remove stored token                                                                 |
| `create video`               | Text-to-video or image-to-video                                                     |
| `create image`               | Text-to-image or image-to-image                                                     |
| `create transition`          | Create transitions between keyframes                                                |
| `create voice`               | Generate speech audio from text (text-to-speech)                                    |
| `create music`               | Generate music audio from a prompt                                                  |
| `create extend`              | Extend video duration                                                               |
| `create modify`              | Modify an existing video                                                            |
| `create upscale`             | Upscale video resolution                                                            |
| `create reference`           | Create or edit a video with reference media                                         |
| `create motion-control`      | Motion control with character image + reference video                               |
| `create template`            | Create from a template/effect                                                       |
| `capabilities`               | Show the installed static CLI capability bundle                                     |
| `capabilities create`        | Show structured Create modes, models, parameters, defaults, and limits              |
| `capabilities canvas`        | Query merged Canvas and CLI capabilities, or the raw Canvas response with `--raw`   |
| `template categories`        | List template categories                                                            |
| `template list`              | List templates (with category filter)                                               |
| `template search`            | Search templates by keyword                                                         |
| `template info`              | Get template details                                                                |
| `voice models`               | List voice/TTS providers, models, and supported languages                           |
| `voice presets`              | List preset voices (filterable by model / language / provider)                      |
| `music models`               | List music providers, models, and capabilities                                      |
| `task status`                | Check one ID or batch with space-separated IDs / `--ids id1,id2,...`                |
| `task wait`                  | Wait for task completion                                                            |
| `asset list`                 | List assets (`--source create\|upload`, `--type video\|image\|audio`, `--off-peak`) |
| `asset upload`               | Upload a local file or HTTPS URL to asset library                                   |
| `asset info`                 | Get asset details                                                                   |
| `asset download`             | Download a generated asset                                                          |
| `asset delete`               | Delete an asset                                                                     |
| `saved list`                 | List saved folders                                                                  |
| `saved items`                | List items in a saved folder                                                        |
| `saved new`                  | Create a new saved folder                                                           |
| `saved rename`               | Rename a saved folder                                                               |
| `saved add`                  | Add assets to a saved folder                                                        |
| `saved remove`               | Remove assets from a saved folder                                                   |
| `saved delete`               | Delete a saved folder                                                               |
| `workspace list`             | List all workspaces                                                                 |
| `workspace status`           | Show current workspace                                                              |
| `workspace switch`           | Switch workspace (interactive or by ID)                                             |
| `workspace manage`           | Open workspace management in browser                                                |
| `account info`               | View account info and workspace credits                                             |
| `account usage`              | View credit usage                                                                   |
| `account slots`              | View current concurrent generation slots (image / video)                            |
| `subscribe`                  | Open subscription page                                                              |
| `update`                     | Update the CLI to the latest version (`npm i -g pixverse@latest`)                   |
| `config set`                 | Set a config value                                                                  |
| `config get`                 | Get a config value                                                                  |
| `config list`                | List all config values                                                              |
| `config reset`               | Reset config to defaults                                                            |
| `config path`                | Show config file path                                                               |
| `config defaults`            | Manage per-mode creation defaults                                                   |
| `canvas project create`      | Create an empty Canvas project with an optional name and description                |
| `canvas graph get`           | Get a Canvas project's nodes, connections, and edit version                         |
| `canvas graph status`        | Get the generation status of Canvas nodes                                           |
| `canvas graph invalid-nodes` | Show Canvas validation issues and invalid node details                              |
| `canvas graph reconcile`     | Recover generation for specific Canvas nodes                                        |
| `canvas node get`            | Get details for a Canvas node                                                       |
| `canvas node schema`         | Show the current schema for a Canvas node type                                      |
| `canvas node versions`       | List saved versions for a Canvas node                                               |
| `canvas node version`        | Get a saved version for a Canvas node                                               |
| `canvas node version apply`  | Set a saved version as the current Canvas node version                              |
| `canvas node rerun`          | Run generation again for a specific Canvas node                                     |
| `canvas node extract-audio`  | Extract the full audio track from a Canvas video node                               |
| `canvas patch dry-run`       | Validate Canvas changes without saving them                                         |
| `canvas patch apply`         | Apply validated changes to a Canvas project                                         |
| `canvas dispatch`            | Start generation for specific ready Canvas nodes                                    |
| `canvas dispatch rebind`     | Bind specific ready Canvas nodes to a dispatch plan                                 |

## Global Flags

| Flag                  | Description                                               |
| :-------------------- | :-------------------------------------------------------- |
| `--json`              | Output as JSON                                            |
| `-p`                  | Print mode (alias for `--json`)                           |
| `--workspace-id <id>` | Override active workspace for this command (0 = personal) |
| `--region <region>`   | Service region: `global` or `cn` (default: `global`)      |
| `-V, --version`       | Show CLI version                                          |
| `-h, --help`          | Show help for any command                                 |

## For AI Agents — Advanced Usage

For AI agents (Claude Code, Cursor, Codex, etc.), we **strongly recommend** installing [PixVerse Skills](https://github.com/PixVerseAI/skills) — a comprehensive skill library that teaches agents how to use PixVerse CLI correctly with full model constraints, multi-step pipelines, and error handling.

For lightweight discovery, the public repo includes the same machine-readable
capability bundle at `capabilities.json` that the npm package installs as
`dist/capabilities.json`. Query the installed version directly without signing
in or making a network request:

```bash
pixverse capabilities --json
pixverse capabilities create --json
pixverse capabilities create video --model v6 --json
```

The file uses a normalized compact encoding to avoid repeating shared
parameters and model metadata. `capabilities create` expands the selected mode
and model into a query-ready structure.

Canvas node schemas and route mappings are queried live instead of being
duplicated in the bundled file. Use
`pixverse capabilities canvas --node-type <type> --json` to combine them with
the installed CLI's model and parameter rules. Use
`pixverse capabilities canvas --raw --json` or
`pixverse canvas node schema --node-type <type> --json` when the unmodified
Canvas response is required.

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
