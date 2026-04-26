# PowerPoint Outline And Slide Script

## Slide 1
Title: Champagne Green MR Idol Support Stage

On-slide content:
- Module code / course title
- Your name and student ID
- One full-screen hero screenshot of the final MR stage
- One-line subtitle: “A world-locked mixed reality performance for the UNNC campus lawn”

What to say:
This project explores how an ordinary campus lawn can be transformed into a mixed reality fan-support stage. The final experience combines a silent MV screen, spatial member audio, a virtual light stick, and proximity-based performance interaction.

## Slide 2
Title: Project Overview

On-slide content:
- Problem statement
- Design objective
- Final interaction loop diagram: Summon -> Aim -> Lock -> Perform

What to say:
My goal was to design an MR interaction that feels performative rather than just informational. I wanted users to walk in a real campus space, approach virtual members, lock onto one of them, and then react as if they were at a live support event.

## Slide 3
Title: Research: UNNC Lawn Context

On-slide content:
- Photos of the selected campus lawn
- Annotated top-down map
- Observation bullets: openness, circulation, visibility, safety

What to say:
I chose the campus lawn because it supports walking, turning, and large-body movement. It also provides a strong contrast between the real environment and the inserted MR stage. These site characteristics directly influenced my decision to use a world-locked stage rather than body-locked UI.

## Slide 4
Title: Research Findings To Design Decisions

On-slide content:
- Two-column table:
  - Finding
  - Design consequence

Suggested rows:
- Open lawn -> world-locked altar
- Wide field of view -> curved member layout
- Outdoor noise / distraction -> strong visual state changes
- Variable tracking -> proximity as fallback to pinch

What to say:
This slide shows how the field observations were translated into design decisions. Instead of listing research separately, I linked each observation to a specific interaction or layout choice in the prototype.

## Slide 5
Title: Ideation With MR Creative Cards

On-slide content:
- Photo of the cards you used
- Small grid showing selected cards
- Labels: space, trigger, performance, media, feedback

What to say:
I used MR creative cards to structure ideation. I focused on combinations related to spatial performance, embodied input, audio feedback, and site-specific augmentation. This prevented the concept from becoming only a media viewer.

## Slide 6
Title: Idea Iteration

On-slide content:
- 3-step progression
- Idea 1: image recognition based media trigger
- Idea 2: card recognition plus hand interaction
- Final: world-locked stage with proximity + pinch

What to say:
The concept changed significantly through iteration. I began with image-recognition triggers, but because of reliability issues in Quest Browser I pivoted to a stronger spatial stage concept. This made the final interaction more stable and also more convincing from an HCI perspective.

## Slide 7
Title: Final Concept

On-slide content:
- Main scene diagram
- Labels for central MV screen, member arc, floating portrait, light stick, ground ring, spotlight

What to say:
The final concept is a cyber-altar in champagne green, positioned in the campus lawn. Users enter the space, walk toward different members, lock onto one, and perform through body motion and hand tracking.

## Slide 8
Title: User Journey

On-slide content:
- Four panels: Start / Aim / Lock / Perform
- One screenshot or mockup for each

What to say:
The experience is intentionally progressive. First the stage appears. Then the user approaches and receives aim feedback. Next the member is locked and the voice begins. Finally the user performs by waving and interacting with the active state.

## Slide 9
Title: Prototype Architecture

On-slide content:
- A-Frame + WebXR + Quest 3
- Scene graph diagram
- Audio layers: MV / BGM / member voice

What to say:
The prototype is implemented in A-Frame for WebXR on Meta Quest 3. I used a scene-based structure with a world-locked stage root, member panels, hand-tracked light sticks, and layered media channels for clearer control of audio hierarchy.

## Slide 10
Title: Core Interaction Logic

On-slide content:
- State diagram
- Idle -> Candidate -> Selected -> Released

What to say:
This state model helps explain the design clearly. Candidate means a member is being targeted through proximity. Selected means the member is now the active source of voice, visual emphasis, and performance effects.

## Slide 11
Title: Key Features Implemented

On-slide content:
- Silent MV loop
- Looping BGM
- Spatial member audio
- Audio ducking
- World-locked stage
- Curved member layout
- Light stick sync
- Wave-triggered particles

What to say:
These are the main implemented functions in the prototype. They are important because they show that the project is not just a visual mockup; it is a working mixed reality interaction system.

## Slide 12
Title: Prototype Demo

On-slide content:
- Full-slide video stills or QR code / note to live recording segment

What to say:
Here I show the prototype running on Quest 3. The important points are the world-locked stage, the visible target feedback, the audio transition, and the way the user can perform once a member is active.

## Slide 13
Title: Testing Setup

On-slide content:
- Number of participants
- Test method
- Tasks list

Suggested tasks:
- Start the experience
- Approach a member
- Identify target feedback
- Trigger playback
- Describe what felt clear or unclear

What to say:
I ran a focused usability test to understand whether users could interpret the stage, discover the target state, and understand how to trigger media without needing too much instruction.

## Slide 14
Title: Testing Results

On-slide content:
- Chart or table
- Example findings:
  - Stage readability
  - Audio clarity
  - Gesture reliability
  - Selection clarity

What to say:
The strongest positive result was the stage readability. The biggest challenge was hand tracking reliability and understanding when a member had been selected. This directly led to clearer target labels, stronger visual cues, and automatic proximity-based locking.

## Slide 15
Title: Iteration After Testing

On-slide content:
- Before / after comparison
- Old: side image, louder media mix, weaker state clarity
- New: floating portrait, ducked BGM, spotlight, ground cue, particle feedback

What to say:
This slide shows how testing shaped the final design. The revised version is more legible, more performative, and better balanced in terms of audio and visual hierarchy.

## Slide 16
Title: HCI Reflection

On-slide content:
- World-locked vs body-locked
- Spatial presence
- Feed-forward
- Multi-modal interaction
- Perceptual continuity
- Accessibility and fallback interaction

What to say:
This project allowed me to reflect on several HCI concepts from the course. The most important insight is that reliability and clarity are just as important as novelty. The final design became stronger when I chose robust spatial interaction over fragile recognition-heavy triggering.

## Slide 17
Title: Limitations And Future Work

On-slide content:
- Persistent anchor tied to a real campus landmark
- More member assets
- More robust outdoor hand tracking
- Better accessibility modes
- Stronger environmental lighting adaptation

What to say:
The prototype is functional, but there is room to improve anchor persistence, tracking robustness, and accessibility. Future work could also include more members, more choreography, and a saved site-specific anchor aligned to a real campus landmark.

## Slide 18
Title: Conclusion

On-slide content:
- Final one-sentence takeaway
- Thank you

What to say:
In conclusion, this project demonstrates how mixed reality can turn a real campus lawn into a performative, spatially grounded fan-support experience. The final prototype shows not only technical implementation, but also iterative HCI reasoning across research, ideation, prototyping, testing, and reflection.
