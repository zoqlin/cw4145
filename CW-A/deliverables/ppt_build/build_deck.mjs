// Node-oriented editable pro deck builder.
// Run this after editing SLIDES, SOURCES, and layout functions.
// The init script installs a sibling node_modules/@oai/artifact-tool package link
// and package.json with type=module for shell-run eval builders. Run with the
// Node executable from Codex workspace dependencies or the platform-appropriate
// command emitted by the init script.
// Do not use pnpm exec from the repo root or any Node binary whose module
// lookup cannot resolve the builder's sibling node_modules/@oai/artifact-tool.

const fs = await import("node:fs/promises");
const path = await import("node:path");
const { Presentation, PresentationFile } = await import("@oai/artifact-tool");

const W = 1280;
const H = 720;

const DECK_ID = "cw4145-final";
const OUT_DIR = "E:\\unnc\\4145\\CW-A\\deliverables\\ppt_out";
const REF_DIR = "E:\\unnc\\4145\\CW-A\\deliverables\\ppt_refs";
const SCRATCH_DIR = path.resolve(process.env.PPTX_SCRATCH_DIR || path.join("tmp", "slides", DECK_ID));
const PREVIEW_DIR = path.join(SCRATCH_DIR, "preview");
const VERIFICATION_DIR = path.join(SCRATCH_DIR, "verification");
const INSPECT_PATH = path.join(SCRATCH_DIR, "inspect.ndjson");
const MAX_RENDER_VERIFY_LOOPS = 3;

const INK = "#101214";
const GRAPHITE = "#30363A";
const MUTED = "#687076";
const PAPER = "#F7F4ED";
const PAPER_96 = "#F7F4EDF5";
const WHITE = "#FFFFFF";
const ACCENT = "#27C47D";
const ACCENT_DARK = "#116B49";
const GOLD = "#D7A83D";
const CORAL = "#E86F5B";
const TRANSPARENT = "#00000000";

const TITLE_FACE = "Caladea";
const BODY_FACE = "Lato";
const MONO_FACE = "Aptos Mono";

const FALLBACK_PLATE_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=";

const SOURCES = {
  site: "Replace with your own lawn photos, field notes, and annotated campus map.",
  ideation: "Replace with your own MR creative card photos and iteration sketches.",
  prototype: "Based on the A-Frame/WebXR prototype implemented in CW-A/index.html.",
  testing: "Replace with your own participant count, test protocol, quotes, and screenshots.",
};

const SLIDES = [
  {
    kicker: "CW4145 FINAL PRESENTATION",
    title: "Champagne Green MR Idol Support Stage",
    subtitle: "A world-locked mixed reality performance designed for the UNNC campus lawn.",
    expectedVisual: "Hero title slide with one full-screen prototype screenshot from Quest 3.",
    moment: "From campus lawn to spatial fan-support stage",
    notes: "Introduce the project title, platform, site, and one-sentence goal: transforming a real lawn into a performative MR support experience.",
    sources: ["prototype"],
  },
  {
    kicker: "01 PROJECT OVERVIEW",
    title: "Design Goal And Experience Loop",
    subtitle: "The project is designed as a performative interaction rather than a passive media viewer.",
    expectedVisual: "Simple process diagram: Summon, Aim, Lock, Perform.",
    cards: [
      ["Summon", "Press Start Experience and generate a world-locked central screen plus member arc on the lawn."],
      ["Lock", "Approach or pinch a member to trigger voice playback, visual focus, and light-stick synchronization."],
      ["Perform", "Wave the hand and light stick to generate particles and support-stage feedback around the active member."],
    ],
    notes: "Explain the four-stage interaction loop clearly before moving into research and ideation.",
    sources: ["prototype"],
  },
  {
    kicker: "02 RESEARCH",
    title: "Why The UNNC Lawn Was Selected",
    subtitle: "The site was chosen because it supports embodied movement, clear visibility, and spatial staging.",
    expectedVisual: "Insert your own lawn photos and an annotated top-down map.",
    metrics: [
      ["Open", "Wide walkable area", "Supports safe turning, approach, and embodied performance."],
      ["Visible", "Clear line of sight", "Lets users read the stage composition without heavy clutter."],
      ["Specific", "Campus landmark context", "Strengthens the project as a site-specific MR installation."],
    ],
    notes: "Point to your real research evidence here: site photos, map, and brief observation notes.",
    sources: ["site"],
  },
  {
    kicker: "03 RESEARCH",
    title: "Research Findings To Design Decisions",
    subtitle: "Each field observation directly informed a layout or interaction decision.",
    expectedVisual: "Two-column mapping between finding and design response.",
    cards: [
      ["Open lawn", "Use a world-locked stage so users must physically walk through the site instead of standing still."],
      ["Wide field of view", "Arrange members in a curved layout to reduce excessive head turning and keep targets ergonomic."],
      ["Outdoor uncertainty", "Use strong visual state changes and proximity as a fallback when hand input becomes unreliable."],
    ],
    notes: "Emphasize that research was not descriptive only; it directly shaped the prototype structure.",
    sources: ["site", "prototype"],
  },
  {
    kicker: "04 IDEATION",
    title: "Ideation With Mixed Reality Creative Cards",
    subtitle: "Creative cards were used to structure the concept around site, trigger, performance, and feedback.",
    expectedVisual: "Insert your own card photos and highlight the selected cards.",
    cards: [
      ["Space", "I focused on cards that encouraged site-specific staging instead of floating interface panels."],
      ["Trigger", "I explored scanning, proximity, and gesture options before choosing a more stable hybrid interaction."],
      ["Performance", "I intentionally pushed the concept toward embodied support behavior, not just media consumption."],
    ],
    notes: "Show the actual cards you used and briefly explain why those cards mattered.",
    sources: ["ideation"],
  },
  {
    kicker: "05 IDEATION",
    title: "Concept Iteration",
    subtitle: "The design evolved from recognition-heavy triggering to a more robust spatial performance model.",
    expectedVisual: "Three-step concept evolution diagram.",
    metrics: [
      ["V1", "Image-triggered media", "Interesting concept but unstable in Quest Browser."],
      ["V2", "Cards plus gestures", "Stronger interaction, but still too dependent on recognition accuracy."],
      ["V3", "World-locked stage", "Most coherent balance of stability, clarity, and performance."],
    ],
    notes: "Frame the pivot as a design decision informed by testing and HCI reasoning, not as a failure.",
    sources: ["ideation", "prototype"],
  },
  {
    kicker: "06 FINAL CONCEPT",
    title: "Final Experience Composition",
    subtitle: "The final system combines a silent MV altar, member arc, floating portrait, BGM, and a reactive light stick.",
    expectedVisual: "Labeled scene diagram or screenshot montage from the final build.",
    cards: [
      ["Central screen", "A silent looping MV provides atmosphere without competing with speech or spatial voice."],
      ["Member arc", "Curved member cards support selection, navigation, and comparative scanning in a natural field of view."],
      ["Reactive feedback", "Ground cue, spotlight, particles, and light-stick color changes reinforce selection and performance."],
    ],
    notes: "Explain that this is now a staged MR performance space rather than a scanning demo.",
    sources: ["prototype"],
  },
  {
    kicker: "07 USER JOURNEY",
    title: "Interaction Flow",
    subtitle: "The experience is intentionally progressive, moving from orientation to selection to performance.",
    expectedVisual: "Storyboard screenshots: Start, Aim, Selected, Perform.",
    cards: [
      ["Start", "The stage appears in front of the user and stays fixed in the lawn space."],
      ["Aim", "Approaching a member triggers feed-forward targeting through light, motion, and labels."],
      ["Selected", "Voice playback, portrait reveal, and audio hierarchy confirm that the chosen member is active."],
    ],
    notes: "This slide should visually explain how the user learns the system step by step.",
    sources: ["prototype"],
  },
  {
    kicker: "08 PROTOTYPE",
    title: "Prototype Stack",
    subtitle: "The system was implemented in A-Frame and WebXR for Meta Quest 3 with layered media control.",
    expectedVisual: "A technical architecture diagram or code screenshot with scene layers.",
    metrics: [
      ["A-Frame", "Scene authoring", "Used for entities, media surfaces, panels, particles, and world layout."],
      ["WebXR", "Quest 3 runtime", "Used for immersive MR presentation and hand-tracking support."],
      ["Audio", "Three-layer mix", "Silent MV, looping BGM, and ducked member voice hierarchy."],
    ],
    notes: "Mention the actual implementation choices without overloading the slide with code.",
    sources: ["prototype"],
  },
  {
    kicker: "09 PROTOTYPE",
    title: "Core Interaction Logic",
    subtitle: "A simple state model keeps the behavior readable and easier to debug.",
    expectedVisual: "State diagram: Idle, Candidate, Selected, Released.",
    cards: [
      ["Candidate", "A member becomes the current target through proximity and visual feed-forward."],
      ["Selected", "The active member receives voice, spotlight, floating portrait, and reactive performance feedback."],
      ["Released", "Audio fades out and the light stick returns to a breathing idle state."],
    ],
    notes: "Explain how this state machine improved clarity in both development and presentation.",
    sources: ["prototype"],
  },
  {
    kicker: "10 PROTOTYPE",
    title: "Key Features Implemented",
    subtitle: "The final prototype works as a coherent mixed reality system rather than a static mockup.",
    expectedVisual: "Feature icons or screenshot grid.",
    cards: [
      ["Spatial stage", "World-locked placement creates a site-specific altar that users must physically approach."],
      ["Media hierarchy", "Silent MV loop and BGM ducking preserve speech intelligibility during member playback."],
      ["Interactive performance", "Wave-triggered particles and light-stick syncing turn selection into active support behavior."],
    ],
    notes: "Stress that the prototype is working in Quest 3 and not only described theoretically.",
    sources: ["prototype"],
  },
  {
    kicker: "11 PROTOTYPE DEMO",
    title: "Prototype Running In Quest 3",
    subtitle: "This section should show the system operating in real time on the headset.",
    expectedVisual: "Use video stills or embed exported screenshots from your recording.",
    metrics: [
      ["Show", "Stage summon", "Central screen, curved member arc, and light stick visible at entry."],
      ["Show", "Member selection", "Approach, targeting, lock, and floating portrait activation."],
      ["Show", "Performance", "Wave gesture, particles, audio ducking, and reactive lighting."],
    ],
    notes: "This slide should line up with the actual demo segment in your video recording.",
    sources: ["prototype"],
  },
  {
    kicker: "12 TESTING",
    title: "Testing Setup",
    subtitle: "Testing focused on discoverability, state clarity, and the reliability of approach versus gesture selection.",
    expectedVisual: "Insert participant photos or setup screenshots if available.",
    cards: [
      ["Participants", "Replace with your actual participant count and short description."],
      ["Method", "Replace with your actual test protocol, tasks, and observation method."],
      ["Tasks", "Start the experience, approach a member, identify the selected state, and trigger playback."],
    ],
    notes: "Do not invent participant numbers. Replace the placeholder with your real test information before submission.",
    sources: ["testing"],
  },
  {
    kicker: "13 TESTING",
    title: "Testing Results And Key Findings",
    subtitle: "The strongest findings were about selection clarity, audio intelligibility, and robustness of triggering.",
    expectedVisual: "Add a small chart or table using your real findings.",
    cards: [
      ["What worked", "Users understood the stage composition and could identify that members were interactable."],
      ["What was unclear", "Users were not always sure whether they had successfully selected a member."],
      ["What changed", "I increased target feedback and made proximity a stronger fallback to gesture-only input."],
    ],
    notes: "Replace this with your own quotes or observations if you collected them.",
    sources: ["testing", "prototype"],
  },
  {
    kicker: "14 ITERATION",
    title: "Design Changes After Testing",
    subtitle: "The revised version is more readable, more performative, and more stable.",
    expectedVisual: "Before and after comparison of the earlier version versus final version.",
    metrics: [
      ["Before", "Weaker state clarity", "Users could see scaling, but not always understand successful selection."],
      ["After", "Clearer performance cues", "Floating portrait, ground ring, spotlight, and text labels reinforce state."],
      ["Result", "Better usability", "Selection is easier to interpret and the final scene feels more theatrical."],
    ],
    notes: "Use screenshots from both versions if possible.",
    sources: ["prototype", "testing"],
  },
  {
    kicker: "15 HCI REFLECTION",
    title: "HCI Concepts Applied",
    subtitle: "The prototype was shaped by spatial interaction principles rather than visual novelty alone.",
    expectedVisual: "Concept map linking HCI terms to project features.",
    cards: [
      ["World-locked vs body-locked", "Keeping the stage anchored in the lawn made the experience site-specific and spatially meaningful."],
      ["Feed-forward", "Target glow, labels, spotlight, and ground cues help users understand what will happen before selection."],
      ["Multi-modal interaction", "Walking, gesture, light, sound, and particles work together to produce a more performative experience."],
    ],
    notes: "This is the key theory slide. Link each concept to an actual design choice you implemented.",
    sources: ["prototype"],
  },
  {
    kicker: "16 HCI REFLECTION",
    title: "Perceptual Continuity, Audio Hierarchy, And Accessibility",
    subtitle: "A major improvement came from reducing overload and giving users multiple routes to success.",
    expectedVisual: "Audio layering diagram or flowchart.",
    cards: [
      ["Continuity", "Silent MV, looping BGM, and voice fade transitions reduce abrupt mode changes."],
      ["Hierarchy", "BGM is ducked during member playback so speech remains understandable."],
      ["Accessibility", "Users can trigger the main experience through proximity even when pinch is unreliable."],
    ],
    notes: "This slide is useful for showing deeper critical reflection beyond visual polish.",
    sources: ["prototype", "testing"],
  },
  {
    kicker: "17 LIMITATIONS",
    title: "Limitations And Future Work",
    subtitle: "The final prototype is functional, but several areas could be improved in future iterations.",
    expectedVisual: "Future roadmap or staged improvement diagram.",
    cards: [
      ["Persistent anchor", "The stage is convincingly world-locked, but not yet saved to a precise campus landmark across sessions."],
      ["Tracking robustness", "Hand tracking outdoors can still vary depending on lighting and body position."],
      ["Scale and accessibility", "Future work could add more members, more accessible input modes, and richer user testing data."],
    ],
    notes: "Be honest about what still needs improvement. This strengthens the reflection section.",
    sources: ["prototype", "testing"],
  },
  {
    kicker: "18 CONCLUSION",
    title: "Conclusion",
    subtitle: "This project demonstrates how mixed reality can turn a real campus lawn into a spatial performance experience.",
    expectedVisual: "Return to the strongest final prototype image.",
    metrics: [
      ["Research", "Site-specific", "Real campus context directly guided the design choices."],
      ["Prototype", "Working MR system", "The final build integrates stage, sound, gesture, and performative feedback."],
      ["Reflection", "HCI-led iteration", "The strongest outcome came from choosing clarity and robustness over fragile novelty."],
    ],
    notes: "Close by reinforcing that the project covers research, ideation, prototyping, testing, and HCI reflection as one coherent process.",
    sources: ["prototype", "site", "testing"],
  },
];

const inspectRecords = [];

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readImageBlob(imagePath) {
  const bytes = await fs.readFile(imagePath);
  if (!bytes.byteLength) {
    throw new Error(`Image file is empty: ${imagePath}`);
  }
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

async function normalizeImageConfig(config) {
  if (!config.path) {
    return config;
  }
  const { path: imagePath, ...rest } = config;
  return {
    ...rest,
    blob: await readImageBlob(imagePath),
  };
}

async function ensureDirs() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const obsoleteFinalArtifacts = [
    "preview",
    "verification",
    "inspect.ndjson",
    ["presentation", "proto.json"].join("_"),
    ["quality", "report.json"].join("_"),
  ];
  for (const obsolete of obsoleteFinalArtifacts) {
    await fs.rm(path.join(OUT_DIR, obsolete), { recursive: true, force: true });
  }
  await fs.mkdir(SCRATCH_DIR, { recursive: true });
  await fs.mkdir(PREVIEW_DIR, { recursive: true });
  await fs.mkdir(VERIFICATION_DIR, { recursive: true });
}

function lineConfig(fill = TRANSPARENT, width = 0) {
  return { style: "solid", fill, width };
}

function recordShape(slideNo, shape, role, shapeType, x, y, w, h) {
  if (!slideNo) return;
  inspectRecords.push({
    kind: "shape",
    slide: slideNo,
    id: shape?.id || `slide-${slideNo}-${role}-${inspectRecords.length + 1}`,
    role,
    shapeType,
    bbox: [x, y, w, h],
  });
}

function addShape(slide, geometry, x, y, w, h, fill = TRANSPARENT, line = TRANSPARENT, lineWidth = 0, meta = {}) {
  const shape = slide.shapes.add({
    geometry,
    position: { left: x, top: y, width: w, height: h },
    fill,
    line: lineConfig(line, lineWidth),
  });
  recordShape(meta.slideNo, shape, meta.role || geometry, geometry, x, y, w, h);
  return shape;
}

function normalizeText(text) {
  if (Array.isArray(text)) {
    return text.map((item) => String(item ?? "")).join("\n");
  }
  return String(text ?? "");
}

function textLineCount(text) {
  const value = normalizeText(text);
  if (!value.trim()) {
    return 0;
  }
  return Math.max(1, value.split(/\n/).length);
}

function requiredTextHeight(text, fontSize, lineHeight = 1.18, minHeight = 8) {
  const lines = textLineCount(text);
  if (lines === 0) {
    return minHeight;
  }
  return Math.max(minHeight, lines * fontSize * lineHeight);
}

function assertTextFits(text, boxHeight, fontSize, role = "text") {
  const required = requiredTextHeight(text, fontSize);
  const tolerance = Math.max(2, fontSize * 0.08);
  if (normalizeText(text).trim() && boxHeight + tolerance < required) {
    throw new Error(
      `${role} text box is too short: height=${boxHeight.toFixed(1)}, required>=${required.toFixed(1)}, ` +
        `lines=${textLineCount(text)}, fontSize=${fontSize}, text=${JSON.stringify(normalizeText(text).slice(0, 90))}`,
    );
  }
}

function wrapText(text, widthChars) {
  const words = normalizeText(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > widthChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) {
    lines.push(current);
  }
  return lines.join("\n");
}

function recordText(slideNo, shape, role, text, x, y, w, h) {
  const value = normalizeText(text);
  inspectRecords.push({
    kind: "textbox",
    slide: slideNo,
    id: shape?.id || `slide-${slideNo}-${role}-${inspectRecords.length + 1}`,
    role,
    text: value,
    textPreview: value.replace(/\n/g, " | ").slice(0, 180),
    textChars: value.length,
    textLines: textLineCount(value),
    bbox: [x, y, w, h],
  });
}

function recordImage(slideNo, image, role, imagePath, x, y, w, h) {
  inspectRecords.push({
    kind: "image",
    slide: slideNo,
    id: image?.id || `slide-${slideNo}-${role}-${inspectRecords.length + 1}`,
    role,
    path: imagePath,
    bbox: [x, y, w, h],
  });
}

function applyTextStyle(box, text, size, color, bold, face, align, valign, autoFit, listStyle) {
  box.text = text;
  box.text.fontSize = size;
  box.text.color = color;
  box.text.bold = Boolean(bold);
  box.text.alignment = align;
  box.text.verticalAlignment = valign;
  box.text.typeface = face;
  box.text.insets = { left: 0, right: 0, top: 0, bottom: 0 };
  if (autoFit) {
    box.text.autoFit = autoFit;
  }
  if (listStyle) {
    box.text.style = "list";
  }
}

function addText(
  slide,
  slideNo,
  text,
  x,
  y,
  w,
  h,
  {
    size = 22,
    color = INK,
    bold = false,
    face = BODY_FACE,
    align = "left",
    valign = "top",
    fill = TRANSPARENT,
    line = TRANSPARENT,
    lineWidth = 0,
    autoFit = null,
    listStyle = false,
    checkFit = true,
    role = "text",
  } = {},
) {
  if (!checkFit && textLineCount(text) > 1) {
    throw new Error("checkFit=false is only allowed for single-line headers, footers, and captions.");
  }
  if (checkFit) {
    assertTextFits(text, h, size, role);
  }
  const box = addShape(slide, "rect", x, y, w, h, fill, line, lineWidth);
  applyTextStyle(box, text, size, color, bold, face, align, valign, autoFit, listStyle);
  recordText(slideNo, box, role, text, x, y, w, h);
  return box;
}

async function addImage(slide, slideNo, config, position, role, sourcePath = null) {
  const image = slide.images.add(await normalizeImageConfig(config));
  image.position = position;
  recordImage(slideNo, image, role, sourcePath || config.path || config.uri || "inline-data-url", position.left, position.top, position.width, position.height);
  return image;
}

async function addPlate(slide, slideNo, opacityPanel = false) {
  slide.background.fill = PAPER;
  const platePath = path.join(REF_DIR, `slide-${String(slideNo).padStart(2, "0")}.png`);
  if (await pathExists(platePath)) {
    await addImage(
      slide,
      slideNo,
      { path: platePath, fit: "cover", alt: `Text-free art-direction plate for slide ${slideNo}` },
      { left: 0, top: 0, width: W, height: H },
      "art plate",
      platePath,
    );
  } else {
    await addImage(
      slide,
      slideNo,
      { dataUrl: FALLBACK_PLATE_DATA_URL, fit: "cover", alt: `Fallback blank art plate for slide ${slideNo}` },
      { left: 0, top: 0, width: W, height: H },
      "fallback art plate",
      "fallback-data-url",
    );
  }
  if (opacityPanel) {
    addShape(slide, "rect", 0, 0, W, H, "#FFFFFFB8", TRANSPARENT, 0, { slideNo, role: "plate readability overlay" });
  }
}

function addHeader(slide, slideNo, kicker, idx, total) {
  addText(slide, slideNo, String(kicker || "").toUpperCase(), 64, 34, 430, 24, {
    size: 13,
    color: ACCENT_DARK,
    bold: true,
    face: MONO_FACE,
    checkFit: false,
    role: "header",
  });
  addText(slide, slideNo, `${String(idx).padStart(2, "0")} / ${String(total).padStart(2, "0")}`, 1114, 34, 104, 24, {
    size: 13,
    color: ACCENT_DARK,
    bold: true,
    face: MONO_FACE,
    align: "right",
    checkFit: false,
    role: "header",
  });
  addShape(slide, "rect", 64, 64, 1152, 2, INK, TRANSPARENT, 0, { slideNo, role: "header rule" });
  addShape(slide, "ellipse", 57, 57, 16, 16, ACCENT, INK, 2, { slideNo, role: "header marker" });
}

function addTitleBlock(slide, slideNo, title, subtitle = null, x = 64, y = 86, w = 780, dark = false) {
  const titleColor = dark ? PAPER : INK;
  const bodyColor = dark ? PAPER : GRAPHITE;
  addText(slide, slideNo, title, x, y, w, 142, {
    size: 40,
    color: titleColor,
    bold: true,
    face: TITLE_FACE,
    role: "title",
  });
  if (subtitle) {
    addText(slide, slideNo, subtitle, x + 2, y + 148, Math.min(w, 720), 70, {
      size: 19,
      color: bodyColor,
      face: BODY_FACE,
      role: "subtitle",
    });
  }
}

function addIconBadge(slide, slideNo, x, y, accent = ACCENT, kind = "signal") {
  addShape(slide, "ellipse", x, y, 54, 54, PAPER_96, INK, 1.2, { slideNo, role: "icon badge" });
  if (kind === "flow") {
    addShape(slide, "ellipse", x + 13, y + 18, 10, 10, accent, INK, 1, { slideNo, role: "icon glyph" });
    addShape(slide, "ellipse", x + 31, y + 27, 10, 10, accent, INK, 1, { slideNo, role: "icon glyph" });
    addShape(slide, "rect", x + 22, y + 25, 19, 3, INK, TRANSPARENT, 0, { slideNo, role: "icon glyph" });
  } else if (kind === "layers") {
    addShape(slide, "roundRect", x + 13, y + 15, 26, 13, accent, INK, 1, { slideNo, role: "icon glyph" });
    addShape(slide, "roundRect", x + 18, y + 24, 26, 13, GOLD, INK, 1, { slideNo, role: "icon glyph" });
    addShape(slide, "roundRect", x + 23, y + 33, 20, 10, CORAL, INK, 1, { slideNo, role: "icon glyph" });
  } else {
    addShape(slide, "rect", x + 16, y + 29, 6, 12, accent, TRANSPARENT, 0, { slideNo, role: "icon glyph" });
    addShape(slide, "rect", x + 25, y + 21, 6, 20, accent, TRANSPARENT, 0, { slideNo, role: "icon glyph" });
    addShape(slide, "rect", x + 34, y + 14, 6, 27, accent, TRANSPARENT, 0, { slideNo, role: "icon glyph" });
  }
}

function addCard(slide, slideNo, x, y, w, h, label, body, { accent = ACCENT, fill = PAPER_96, line = INK, iconKind = "signal" } = {}) {
  if (h < 156) {
    throw new Error(`Card is too short for editable pro-deck copy: height=${h.toFixed(1)}, minimum=156.`);
  }
  addShape(slide, "roundRect", x, y, w, h, fill, line, 1.2, { slideNo, role: `card panel: ${label}` });
  addShape(slide, "rect", x, y, 8, h, accent, TRANSPARENT, 0, { slideNo, role: `card accent: ${label}` });
  addIconBadge(slide, slideNo, x + 22, y + 24, accent, iconKind);
  addText(slide, slideNo, label, x + 88, y + 22, w - 108, 28, {
    size: 14,
    color: ACCENT_DARK,
    bold: true,
    face: MONO_FACE,
    role: "card label",
  });
  const wrapped = wrapText(body, Math.max(28, Math.floor(w / 13)));
  const bodyY = y + 82;
  const bodyH = h - (bodyY - y) - 18;
  if (bodyH < 54) {
    throw new Error(`Card body area is too short: height=${bodyH.toFixed(1)}, cardHeight=${h.toFixed(1)}, label=${JSON.stringify(label)}.`);
  }
  addText(slide, slideNo, wrapped, x + 24, bodyY, w - 48, bodyH, {
    size: 14,
    color: INK,
    face: BODY_FACE,
    role: `card body: ${label}`,
  });
}

function addMetricCard(slide, slideNo, x, y, w, h, metric, label, note = null, accent = ACCENT) {
  if (h < 132) {
    throw new Error(`Metric card is too short for editable pro-deck copy: height=${h.toFixed(1)}, minimum=132.`);
  }
  addShape(slide, "roundRect", x, y, w, h, PAPER_96, INK, 1.2, { slideNo, role: `metric panel: ${label}` });
  addShape(slide, "rect", x, y, w, 7, accent, TRANSPARENT, 0, { slideNo, role: `metric accent: ${label}` });
  addText(slide, slideNo, metric, x + 22, y + 24, w - 44, 54, {
    size: 34,
    color: INK,
    bold: true,
    face: TITLE_FACE,
    role: "metric value",
  });
  addText(slide, slideNo, label, x + 24, y + 82, w - 48, 38, {
    size: 16,
    color: GRAPHITE,
    face: BODY_FACE,
    role: "metric label",
  });
  if (note) {
    addText(slide, slideNo, note, x + 24, y + h - 42, w - 48, 22, {
      size: 10,
      color: MUTED,
      face: BODY_FACE,
      role: "metric note",
    });
  }
}

function addNotes(slide, body, sourceKeys) {
  const sourceLines = (sourceKeys || []).map((key) => `- ${SOURCES[key] || key}`).join("\n");
  slide.speakerNotes.setText(`${body || ""}\n\n[Sources]\n${sourceLines}`);
}

function addReferenceCaption(slide, slideNo) {
  addText(
    slide,
    slideNo,
    "Generated art plate is used as visual direction; all meaningful copy and structure are editable PowerPoint objects.",
    64,
    674,
    980,
    22,
    {
      size: 10,
      color: MUTED,
      face: BODY_FACE,
      checkFit: false,
      role: "caption",
    },
  );
}

async function slideCover(presentation) {
  const slideNo = 1;
  const data = SLIDES[0];
  const slide = presentation.slides.add();
  await addPlate(slide, slideNo);
  addShape(slide, "rect", 0, 0, W, H, "#FFFFFFCC", TRANSPARENT, 0, { slideNo, role: "cover contrast overlay" });
  addShape(slide, "rect", 64, 86, 7, 455, ACCENT, TRANSPARENT, 0, { slideNo, role: "cover accent rule" });
  addText(slide, slideNo, data.kicker, 86, 88, 520, 26, {
    size: 13,
    color: ACCENT_DARK,
    bold: true,
    face: MONO_FACE,
    role: "kicker",
  });
  addText(slide, slideNo, data.title, 82, 130, 785, 184, {
    size: 48,
    color: INK,
    bold: true,
    face: TITLE_FACE,
    role: "cover title",
  });
  addText(slide, slideNo, data.subtitle, 86, 326, 610, 86, {
    size: 20,
    color: GRAPHITE,
    face: BODY_FACE,
    role: "cover subtitle",
  });
  addShape(slide, "roundRect", 86, 456, 390, 92, PAPER_96, INK, 1.2, { slideNo, role: "cover moment panel" });
  addText(slide, slideNo, data.moment || "Replace with core idea", 112, 478, 336, 40, {
    size: 23,
    color: INK,
    bold: true,
    face: TITLE_FACE,
    role: "cover moment",
  });
  addReferenceCaption(slide, slideNo);
  addNotes(slide, data.notes, data.sources);
}

async function slideCards(presentation, idx) {
  const data = SLIDES[idx - 1];
  const slide = presentation.slides.add();
  await addPlate(slide, idx);
  addShape(slide, "rect", 0, 0, W, H, "#FFFFFFB8", TRANSPARENT, 0, { slideNo: idx, role: "content contrast overlay" });
  addHeader(slide, idx, data.kicker, idx, SLIDES.length);
  addTitleBlock(slide, idx, data.title, data.subtitle, 64, 86, 760);
  const cards = data.cards?.length
    ? data.cards
    : [
        ["Replace", "Add a specific, sourced point for this slide."],
        ["Author", "Use native PowerPoint chart objects for charts; use deterministic geometry for cards and callouts."],
        ["Verify", "Render previews, inspect them at readable size, and fix actionable layout issues within 3 total render loops."],
      ];
  const cols = Math.min(3, cards.length);
  const cardW = (1114 - (cols - 1) * 24) / cols;
  const iconKinds = ["signal", "flow", "layers"];
  for (let cardIdx = 0; cardIdx < cols; cardIdx += 1) {
    const [label, body] = cards[cardIdx];
    const x = 84 + cardIdx * (cardW + 24);
    addCard(slide, idx, x, 408, cardW, 196, label, body, { iconKind: iconKinds[cardIdx % iconKinds.length] });
  }
  addReferenceCaption(slide, idx);
  addNotes(slide, data.notes, data.sources);
}

async function slideMetrics(presentation, idx) {
  const data = SLIDES[idx - 1];
  const slide = presentation.slides.add();
  await addPlate(slide, idx);
  addShape(slide, "rect", 0, 0, W, H, "#FFFFFFBD", TRANSPARENT, 0, { slideNo: idx, role: "metrics contrast overlay" });
  addHeader(slide, idx, data.kicker, idx, SLIDES.length);
  addTitleBlock(slide, idx, data.title, data.subtitle, 64, 86, 700);
  const metrics = data.metrics || [
    ["00", "Replace metric", "Source"],
    ["00", "Replace metric", "Source"],
    ["00", "Replace metric", "Source"],
  ];
  const accents = [ACCENT, GOLD, CORAL];
  for (let metricIdx = 0; metricIdx < Math.min(3, metrics.length); metricIdx += 1) {
    const [metric, label, note] = metrics[metricIdx];
    addMetricCard(slide, idx, 92 + metricIdx * 370, 404, 330, 174, metric, label, note, accents[metricIdx % accents.length]);
  }
  addReferenceCaption(slide, idx);
  addNotes(slide, data.notes, data.sources);
}

async function createDeck() {
  await ensureDirs();
  if (!SLIDES.length) {
    throw new Error("SLIDES must contain at least one slide.");
  }
  const presentation = Presentation.create({ slideSize: { width: W, height: H } });
  await slideCover(presentation);
  for (let idx = 2; idx <= SLIDES.length; idx += 1) {
    const data = SLIDES[idx - 1];
    if (data.metrics) {
      await slideMetrics(presentation, idx);
    } else {
      await slideCards(presentation, idx);
    }
  }
  return presentation;
}

async function saveBlobToFile(blob, filePath) {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  await fs.writeFile(filePath, bytes);
}

async function writeInspectArtifact(presentation) {
  inspectRecords.unshift({
    kind: "deck",
    id: DECK_ID,
    slideCount: presentation.slides.count,
    slideSize: { width: W, height: H },
  });
  presentation.slides.items.forEach((slide, index) => {
    inspectRecords.splice(index + 1, 0, {
      kind: "slide",
      slide: index + 1,
      id: slide?.id || `slide-${index + 1}`,
    });
  });
  const lines = inspectRecords.map((record) => JSON.stringify(record)).join("\n") + "\n";
  await fs.writeFile(INSPECT_PATH, lines, "utf8");
}

async function currentRenderLoopCount() {
  const logPath = path.join(VERIFICATION_DIR, "render_verify_loops.ndjson");
  if (!(await pathExists(logPath))) return 0;
  const previous = await fs.readFile(logPath, "utf8");
  return previous.split(/\r?\n/).filter((line) => line.trim()).length;
}

async function nextRenderLoopNumber() {
  return (await currentRenderLoopCount()) + 1;
}

async function appendRenderVerifyLoop(presentation, previewPaths, pptxPath) {
  const logPath = path.join(VERIFICATION_DIR, "render_verify_loops.ndjson");
  const priorCount = await currentRenderLoopCount();
  const record = {
    kind: "render_verify_loop",
    deckId: DECK_ID,
    loop: priorCount + 1,
    maxLoops: MAX_RENDER_VERIFY_LOOPS,
    capReached: priorCount + 1 >= MAX_RENDER_VERIFY_LOOPS,
    timestamp: new Date().toISOString(),
    slideCount: presentation.slides.count,
    previewCount: previewPaths.length,
    previewDir: PREVIEW_DIR,
    inspectPath: INSPECT_PATH,
    pptxPath,
  };
  await fs.appendFile(logPath, JSON.stringify(record) + "\n", "utf8");
  return record;
}

async function verifyAndExport(presentation) {
  await ensureDirs();
  const nextLoop = await nextRenderLoopNumber();
  if (nextLoop > MAX_RENDER_VERIFY_LOOPS) {
    throw new Error(
      `Render/verify/fix loop cap reached: ${MAX_RENDER_VERIFY_LOOPS} total renders are allowed. ` +
        "Do not rerender; note any remaining visual issues in the final response.",
    );
  }
  await writeInspectArtifact(presentation);
  const previewPaths = [];
  for (let idx = 0; idx < presentation.slides.items.length; idx += 1) {
    const slide = presentation.slides.items[idx];
    const preview = await presentation.export({ slide, format: "png", scale: 1 });
    const previewPath = path.join(PREVIEW_DIR, `slide-${String(idx + 1).padStart(2, "0")}.png`);
    await saveBlobToFile(preview, previewPath);
    previewPaths.push(previewPath);
  }
  const pptxBlob = await PresentationFile.exportPptx(presentation);
  const pptxPath = path.join(OUT_DIR, "output.pptx");
  await pptxBlob.save(pptxPath);
  const loopRecord = await appendRenderVerifyLoop(presentation, previewPaths, pptxPath);
  return { pptxPath, loopRecord };
}

const presentation = await createDeck();
const result = await verifyAndExport(presentation);
console.log(result.pptxPath);
