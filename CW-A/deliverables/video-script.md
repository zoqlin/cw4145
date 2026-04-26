# 10-Minute Video Script

## Total Target Duration
9 minutes 20 seconds to 9 minutes 40 seconds

This leaves a safe margin below the 10-minute limit.

## 0:00 - 0:35
Hello, this project is called Champagne Green MR Idol Support Stage. It is a mixed reality performance experience designed for the UNNC campus lawn using Meta Quest 3, A-Frame, and WebXR. The goal is to transform a real campus site into a world-locked interactive support stage where users can walk, aim, select a member, and perform using spatial sound and a virtual light stick.

## 0:35 - 1:45
For the research stage, I selected the UNNC campus lawn as my target location. I documented the site through photos, spatial observations, and a simple map of the area. I focused on openness, user movement paths, visibility, and safety. The lawn offers enough room for turning, approaching, and embodied interaction, which made it suitable for a performance-oriented MR design. These observations directly informed my final design. Because the site is large and open, I decided to use a world-locked stage instead of a body-locked interface. Because users need to scan multiple elements comfortably, I used a curved layout rather than a flat row.

## 1:45 - 2:40
For ideation, I used mixed reality creative cards to explore combinations of place, trigger, media, and performance. My early concept relied more heavily on image recognition, where scanning physical album covers and photocards would trigger audio and video. During iteration, I realized that this approach was too fragile in Quest Browser and sometimes reduced the experience to a scanning demo. I then refined the concept into a stage-based interaction where the emphasis shifted from scanning objects to inhabiting and performing within a spatially anchored scene.

## 2:40 - 4:40
The final concept is a cyber altar in champagne green placed on the campus lawn. When the user starts the experience, a large silent MV screen appears in front of them, with member panels arranged below in a curved formation. As the user walks closer to a panel, the panel brightens and becomes the current target. When the user gets close enough, or performs a pinch gesture, the system locks onto that member. At that point, the member voice begins playing through spatial audio, a second related portrait appears above the stage, the spotlight and ground ring activate, and the virtual light stick changes color. If the user waves while a member is active, particles appear around the selected member, making the experience feel more like a live support performance.

## 4:40 - 6:15
Technically, the prototype was built in A-Frame and WebXR for Meta Quest 3. I implemented a world-locked stage root, a curved member panel layout, hand-tracked virtual light sticks, and layered media control. The MV is always present but muted, so it contributes atmosphere without competing with spoken audio. A looping background track provides continuity in the environment. When a member is selected, the background audio is ducked and the member voice becomes dominant, which improves intelligibility. I also used spatial audio with exponential distance attenuation so the sound appears to come from each member’s location. The interaction logic follows a simple state model: idle, candidate, selected, and release.

## 6:15 - 7:10
For testing, I focused on whether users could understand the stage layout, notice when a member had been targeted, and successfully trigger the member content. The main findings were that users liked the visual atmosphere and understood the general idea of approaching a member, but they sometimes struggled to tell whether they had successfully selected someone. Hand gesture reliability was also inconsistent. Based on this, I strengthened the visual feedback through target labels, spotlight cues, ground rings, and a floating portrait. I also made proximity a stronger fallback so the experience does not fail if pinch recognition is imperfect.

## 7:10 - 8:25
In terms of HCI reflection, this project helped me think carefully about world-locked versus body-locked interaction, spatial presence, feed-forward, and multi-modal feedback. The most important lesson was that reliability and clarity are more valuable than complexity. The earlier image-recognition concept sounded exciting, but the final world-locked stage was much stronger because users could understand and perform within it more naturally. I also reflected on perceptual continuity: instead of abruptly switching media, I used layered audio, ducking, and gradual transitions to make the scene feel more coherent and immersive.

## 8:25 - 9:10
There are still limitations. The stage is placed convincingly in space, but it does not yet use a persistent real-world anchor saved to a campus landmark. Hand tracking can also still vary depending on lighting and the outdoor environment. In future work, I would improve anchor persistence, expand the number of members, and add more accessibility options for users who cannot rely on precise hand gestures.

## 9:10 - 9:35
To conclude, this project demonstrates how mixed reality can transform a specific UNNC campus site into an interactive performance space. The final prototype combines spatial layout, audio hierarchy, gesture-enhanced performance, and iterative HCI reasoning across research, ideation, prototyping, testing, and reflection.
