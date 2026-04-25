# HCI Design Statement

## Project Title
Champagne Green MR Idol Support Stage for the UNNC Campus Lawn

## Design Goal
This project explores how mixed reality can transform a familiar campus lawn into a performative fan-support space. The goal is not only to let users watch media, but to let them feel that they are entering a spatially anchored, interactive stage in which movement, proximity, gesture, sound, and light work together as one coherent experience.

The final design focuses on a world-locked MR altar placed in front of the user on the campus lawn. A silent looping MV plays on the central screen, while a curved array of member panels invites the user to walk closer, aim, lock onto a member, and perform supportive gestures with a virtual light stick.

## Context Of Use
The design is intended for use outdoors on the UNNC campus lawn, where there is enough open space for safe walking, turning, and embodied interaction. The lawn is important because it supports:

- spatial exploration rather than seated interaction
- large-scale body movement and orientation changes
- clear contrast between the physical world and virtual stage elements
- the feeling of a temporary performance venue inserted into a real campus setting

This site-specific context directly shaped the design. Instead of body-locked floating UI, the system uses a world-locked arrangement so that users must physically move through the environment to approach members and trigger content. This strengthens spatial awareness, presence, and the relationship between the real site and the virtual performance.

## Core Interaction Concept
The experience is designed as a four-stage interaction loop:

1. Summon
The user presses “Start Experience” and a cyber-altar appears in front of them. A central screen begins silent MV playback and a curved array of member panels appears below.

2. Aim
As the user walks toward a member panel, the panel brightens, moves forward slightly, and gains a visible target state. This provides feed-forward information before any explicit selection happens.

3. Lock
When the user comes closer, or performs a pinch gesture, the selected member becomes the active focus. A second related portrait appears above the stage, a spotlight and ground cue appear, the light stick changes color, and the member voice playback begins.

4. Perform
While the member is active, the user can wave the hand and light stick to generate particles and visual emphasis around the member. This transforms the user from observer into performer.

## Key HCI Principles

### 1. World-Locked Spatial Context
The stage is anchored in the physical space instead of following the head or body. This supports the distinction between world-locked and body-locked interfaces and makes the experience feel like a site-specific installation rather than a floating menu.

### 2. Curved Layout And Ergonomic Viewing
Member panels are arranged in a curved formation below the main screen. This reduces excessive head turning, keeps multiple targets within a comfortable field of view, and supports gradual approach without disorientation.

### 3. Feed-Forward And Affordance
Before playback begins, users receive clear pre-selection feedback through:

- panel enlargement
- panel glow change
- target label states
- screen glow synchronization
- light stick color anticipation

These signals help users understand what can be interacted with before they commit to an action.

### 4. Multi-Modal Interaction
The system combines several output channels at once:

- visual: spotlight, glow, stage screen, panel scaling, particles
- auditory: background music, spatial member voice, ducked mix hierarchy
- embodied action: walking, orientation, hand motion, optional pinch gesture

This multi-modal design improves immersion and creates a stronger sense of performance than a visual-only interaction.

### 5. Spatial Audio Presence
Member voices are attached to the member panel location using positional audio with exponential distance falloff. This supports spatial presence because the sound appears to come from the member’s place on the stage rather than from the headset alone.

### 6. Perceptual Continuity
Abrupt media changes were reduced through:

- looping background audio
- ducking rather than muting the environment abruptly
- voice fade-in and fade-out
- persistent silent MV playback

These choices improve continuity and reduce cognitive overload when multiple media channels are active.

## Accessibility And Usability Considerations

- The design does not depend only on pinch gestures. Users can also trigger the main state by physical approach, which improves robustness when hand tracking is unstable.
- Strong visual state changes help users understand system status even if audio is unclear outdoors.
- The central MV remains silent so spoken voice content is easier to understand.
- BGM is ducked during member playback to preserve speech intelligibility.
- Large targets and exaggerated transitions reduce precision requirements for first-time users.

## Technical Realisation Summary
The prototype is implemented in A-Frame and WebXR for Meta Quest 3. The final system includes:

- world-locked stage placement
- hand-tracked virtual light sticks
- curved member panel layout
- silent looping MV playback
- looping BGM layer
- spatial member audio playback
- automatic volume ducking
- target state visual feedback
- spotlight and ground ring cues
- wave-triggered particles during active performance

## Reflection
The strongest design decision in the final prototype was moving away from unreliable image-tracking as the primary trigger and instead using a stable world-locked stage with proximity and gesture as layered interaction methods. This improved clarity, reduced failure cases, and produced a more coherent HCI narrative for performance, embodiment, and spatial interaction.

The prototype still has limitations. Hand tracking outdoors may remain imperfect, and the spatial anchor is currently defined through stage placement rather than a persistent saved anchor tied to a precise campus landmark. However, for the final coursework framing, the current version better demonstrates spatial context, performative interaction, media hierarchy, and HCI-informed iteration than the earlier recognition-heavy design.
