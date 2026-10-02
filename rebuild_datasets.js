const fs = require('fs');
const path = require('path');

const aviationFullPrompt = `# BASIT ACADEMY — OFFICIAL MASTER PROMPT BLUEPRINT
## 🇺🇸 U.S. ARMY FITNESS CHALLENGE (Aviation Prompt)

Use this master prompt whenever I ask for new U.S. Army fitness challenge videos. Do not shorten the prompts. Do not remove sections. Do not simplify details. Do not add your own changes to the established format. Every new video prompt must follow the complete structure below.

1. CORE CONTENT IDENTITY
Create realistic U.S. Army fitness challenge / physical training videos featuring two recurring Army soldiers competing in realistic fitness challenges.
Platform: Facebook
Target Audience: United States
Language: English (US)
Video Generator: Seedance 2.5
Video Duration: Exactly 30 seconds
Format: Vertical 9:16
Visual Style: Ultra-photorealistic documentary-style military training footage
Main Goal: Make the footage look like genuine real-world U.S. Army training recorded by a real camera operator.
The videos must never look like CGI, cartoons, video games, AI animation, cinematic action movies, or unrealistic fitness commercials.

2. CHARACTER LOCK — SERGEANT JOHNSON
Sergeant Johnson is a short, athletic Black American female U.S. Army soldier, approximately 5 feet 4 inches tall, with deep brown skin, defined cheekbones, full lips, dark brown eyes, and black hair pulled tightly into a neat regulation military bun.
She has a compact athletic build with realistic muscle definition and natural human proportions.
She wears:
- Authentic U.S. Army Operational Camouflage Pattern (OCP) uniform
- Matching OCP trousers
- Tan military T-shirt underneath where naturally visible
- Tan military combat boots
- Realistic American flag patch on the shoulder
- Name tape reading “JOHNSON”
Her face, skin tone, hairstyle, height, body proportions, uniform, patches, boots, and overall identity must remain exactly consistent throughout the entire video.
She must look like the same real person in every frame.
Her expressions should remain natural and controlled:
- Focused
- Determined
- Confident
- Physically engaged
- Natural fatigue when appropriate
Do not give her exaggerated facial expressions.
Do not change her ethnicity, face, skin tone, hairstyle, body shape, height, uniform, or age during the video.
IDENTITY LOCK: Sergeant Johnson must remain the exact same person from the first frame to the final frame.

3. OPPONENT LOCK — RYAN MITCHELL
Ryan Mitchell is an athletic white American male U.S. Army soldier, approximately 6 feet tall, with fair skin, short brown military-style hair, and a fit muscular athletic build.
He wears:
- Authentic U.S. Army OCP uniform
- Matching OCP trousers
- Tan military T-shirt where naturally visible
- Tan military combat boots
Ryan is visibly taller and larger than Sergeant Johnson.
His face, hairstyle, height, body proportions, uniform, boots, and identity must remain completely consistent throughout the video.
Ryan must always remain physically believable.
He should be competitive with Johnson, but his performance must never become superhuman.
When appropriate, fatigue can appear naturally through:
- Heavier breathing
- Slightly slower repetitions
- Shorter pauses
- Realistic muscular effort
Never show dramatic collapse, injury, exaggerated shaking, or cartoon-like exhaustion unless specifically requested.
IDENTITY LOCK: Ryan Mitchell must remain the exact same person throughout the entire video.

4. MILITARY ENVIRONMENT LOCK
Every video must remain within a believable U.S. Army training environment unless I specifically request another Army setting.
Possible environments include:
- Outdoor Army physical-training field
- Military obstacle course
- Army fitness training area
- Training ground
- Compact dirt training surface
- Gravel training area
- Military strength-training area
- Army obstacle-course facility
The environment must contain realistic military training equipment appropriate to the challenge.
Do not randomly convert the scene into:
- Civilian gym
- Commercial fitness studio
- Hollywood action set
- Modern luxury gym
- School playground
- Generic civilian sports facility
The Army identity must remain visually clear.

5. CHALLENGE DESIGN RULE
Every new video must feature a specific physical fitness challenge.
The challenge must be:
- Physically plausible
- Safe-looking
- Easy for the viewer to understand visually
- Appropriate for Army physical training
- Possible for a real human
- Based on realistic body mechanics
- Different from recently used challenges
Do not repeatedly use the same challenge.
Avoid immediately repeating concepts such as:
- Balance beam
- Cargo net
- Rope bridge
- Tire flip
- Sandbag carry
- Sled push
- Battle ropes
- Push-ups
- Farmer's carry
- Dead hang
- Wall sit
- Broad jumps
- Medicine-ball slams
- Forearm plank
- Ruck march
- Step-up endurance
- Low crawl sprint
- Shuttle sprint
- Pull-ups
- Burpees
- Ammo-can lift
- Kettlebell deadlift
- Agility cone sprint
- Bear crawl
- Overhead press
- Goblet squat
- Hex-bar deadlift
- Weighted walking lunges
- Sprint-drag-carry
- Box step-ups
- Front-rack weighted march
- Split-squat hold
- Plate pinch carry
- Low-hurdle step-over
When creating new videos, select a fresh Army fitness concept that has not just been used.

6. EXACT VIDEO FORMAT
Every video must be:
Duration: Exactly 30 seconds
Aspect Ratio: 9:16 vertical
Structure: One continuous shot
Camera: Realistic handheld/documentary camera
Style: Photorealistic
Lighting: Natural and consistent
Location: Realistic U.S. Army training environment
Do not use:
- Jump cuts
- Time skips
- Scene transitions
- Montage
- Flash transitions
- Slow-motion sequences
- Speed ramps
- Cinematic camera teleportation
- Impossible camera movements
The complete physical sequence must happen visibly in real time.

7. REQUIRED PROMPT STRUCTURE
Every video prompt must contain ALL of these sections:
1. Character Lock — Sergeant Johnson
Give the complete character description.
2. Opponent Lock — Ryan Mitchell
Give the complete opponent description.
3. Environment and Challenge Setup
Describe:
- Exact location
- Training surface
- Equipment
- Starting positions
- Lane positions
- Challenge rules
- Physical setup
4. Detailed Continuous Timeline — Exactly 30 Seconds
Always divide the entire video into detailed timestamps.
Example structure:
00:00–00:04 — Setup
00:04–00:09 — First movement
00:09–00:14 — Challenge progression
00:14–00:19 — Mid-challenge
00:19–00:24 — Fatigue / competition
00:24–00:28 — Final push
00:28–00:30 — Finish
The timestamps must total exactly 30 seconds.
Every movement must be described in detail.
Do not summarize the timeline.
Do not write vague instructions such as “they perform the exercise.”
Describe exactly:
- Hand placement
- Foot placement
- Body position
- Weight transfer
- Object movement
- Direction
- Speed
- Physical contact
- Recovery
- Finish

8. PHYSICAL CONTINUITY RULES
This is one of the highest-priority requirements.
Every movement must follow realistic cause-and-effect physics.
If an object moves, the character must physically cause it to move.
If a character changes position, the movement must visibly happen.
Never teleport characters or equipment.
Body continuity
Hands, arms, legs, feet, knees, hips, shoulders, elbows, wrists, neck, and torso must remain anatomically connected.
Never allow:
- Extra limbs
- Missing limbs
- Extra fingers
- Missing fingers
- Rubber-like joints
- Twisted joints
- Impossible body angles
- Stretching limbs
- Body parts passing through objects
- Feet floating above surfaces
Object continuity
All equipment must:
- Have consistent dimensions
- Have consistent weight
- Remain physically connected to the person holding it
- Move only when force is applied
- Stop when the force stops
- Remain in the same environment
No object may:
- Teleport
- Float
- Disappear
- Duplicate
- Change size
- Change color
- Change shape
- Move without physical force
Ground contact
Feet must physically contact the ground.
Hands must physically contact objects or surfaces.
Boots must not float.
Objects must not pass through the ground.
No unexplained sliding.

9. CHARACTER POSITION LOCK
If Johnson starts on the left, she remains on the left.
If Ryan starts on the right, he remains on the right.
Do not randomly switch their positions.
If there are two lanes:
Johnson = Left Lane
Ryan = Right Lane
Neither soldier may cross into the other's lane unless the challenge specifically requires it.
Their relative position must remain consistent with the camera perspective.

10. EQUIPMENT LOCK
Any equipment introduced at the beginning must remain consistent throughout the video.
Examples:
- Dumbbells
- Kettlebells
- Sleds
- Weight plates
- Training boxes
- Hurdles
- Ropes
- Sandbags
- Military training equipment
Equipment must not change weight, size, shape, color, or position without a visible physical reason.
If two soldiers are using the same equipment:
Both pieces must be identical unless the challenge specifically requires different weights.

11. REALISTIC HUMAN PHYSICS
All physical movements must respect real human biomechanics.
Include realistic:
- Body weight
- Momentum
- Balance
- Muscle effort
- Gravity
- Friction
- Acceleration
- Deceleration
- Foot pressure
- Grip
- Weight transfer
Do not give the soldiers:
- Superhuman strength
- Impossible acceleration
- Impossible jumping ability
- Instant directional changes
- Unrealistic balance
- Unlimited endurance
If a soldier is tired, fatigue should develop gradually.

12. CAMERA REALISM
The camera must behave like a real person filming the Army training session.
Camera requirements:
- Realistic handheld movement
- Subtle natural stabilization
- Consistent perspective
- Realistic camera height
- Natural tracking
- Stable focal length
- No impossible movement
The camera must not:
- Pass through people
- Pass through objects
- Teleport
- Suddenly switch sides
- Jump from one location to another
- Perform impossible aerial movements
- Dramatically zoom without reason
The camera should prioritize keeping the physical action visible.

13. LIGHTING AND ENVIRONMENT CONTINUITY
Use natural morning or daylight lighting.
Once the sun direction is established, it must remain consistent.
Maintain:
- Same sunlight direction
- Same shadow direction
- Same shadow length
- Same weather
- Same sky
- Same ground appearance
- Same background
- Same environmental conditions
No sudden weather change.
No changing shadows.
No artificial glowing light.
No cinematic lighting transformation.

14. BACKGROUND REALISM
Background soldiers and instructors should behave naturally.
They should not all react simultaneously.
Use subtle reactions such as:
- Watching
- Turning their heads
- Speaking quietly
- Standing naturally
- Walking naturally in the background
Do not create staged viral reactions.
Avoid:
- Everyone cheering simultaneously
- Everyone pointing
- Everyone looking directly at the camera
- Exaggerated celebration
The background should feel like a real Army training session.

15. INSTRUCTOR
A uniformed Army instructor may supervise the challenge.
The instructor must remain physically consistent.
The instructor should stand safely outside the exercise area.
Dialogue must be short, natural, and synchronized with the action.
Example:
“Ready… go!”
“Keep moving!”
“Stay controlled!”
“Five seconds!”
“Time!”
The instructor must not magically appear in a new location.

16. AUDIO REALISM
Use natural environmental audio.
Include appropriate sounds such as:
- Breathing
- Footsteps
- Boot contact
- Equipment movement
- Fabric movement
- Ground contact
- Instructor voice
- Outdoor training ambience
Every sound must correspond to the visible physical action.
If equipment hits the ground, the sound must occur when it visibly hits.
Avoid:
- Loud cinematic impacts
- Fake crowd sounds
- Dramatic music
- Explosions
- Artificial bass drops
- Excessive grunting
The audio should feel like genuine Army training footage.

17. WINNER / COMPETITION LOGIC
The challenge should have a clear but believable outcome.
Johnson can win through:
- More valid repetitions
- Faster controlled movement
- Better endurance
- Better consistency
- Better obstacle completion
- Maintaining form longer
Do not make her win through impossible physical abilities.
Ryan must remain competitive and physically capable.
The final result should emerge naturally from the challenge.

18. FINAL MOMENT
The final 2–3 seconds should show the natural conclusion.
Examples:
- Johnson reaches the finish first.
- Instructor calls time.
- Both soldiers safely put equipment down.
- Both soldiers recover naturally.
- Ryan acknowledges Johnson respectfully.
Avoid:
- Excessive celebration
- Jumping
- Dancing
- Dramatic slow motion
- Cinematic victory pose
- Flashing graphics
End naturally.
The video must end exactly at 30 seconds.

19. REQUIRED NEGATIVE PROMPT
Every video must contain a detailed negative prompt.
At minimum include:
Avoid CGI, cartoon visuals, video-game rendering, plastic skin, artificial faces, changing identity, changing skin tone, changing hairstyle, changing body proportions, changing uniforms, inconsistent OCP camouflage, extra arms, extra legs, extra fingers, missing fingers, malformed hands, distorted joints, twisted knees, broken wrists, impossible anatomy, floating feet, sliding feet, floating equipment, disappearing equipment, duplicated equipment, changing equipment dimensions, teleportation, impossible acceleration, superhuman strength, impossible balance, objects moving without force, character merging, lane switching, inconsistent lighting, changing sunlight, inconsistent shadows, warped backgrounds, unstable perspective, fisheye distortion, camera teleportation, jump cuts, scene transitions, time skips, slow motion, speed ramps, cinematic effects, artificial cheering, excessive grunting, subtitles, text overlays, digital counters, scoreboards, logos, watermarks, and any visual artifact that makes the footage look AI-generated.
Add challenge-specific negative prompts whenever necessary.

20. FINAL GENERATION INSTRUCTIONS
Every final generation instruction must reinforce:
- Exactly 30 seconds
- Vertical 9:16
- U.S. Army setting
- Sergeant Johnson identity lock
- Ryan Mitchell identity lock
- Authentic OCP uniforms
- Realistic Army equipment
- Realistic human anatomy
- Realistic physics
- Natural lighting
- Stable shadows
- Natural audio
- One continuous shot
- No cuts
- No teleportation
- No AI artifacts
- No cinematic exaggeration
The final video must look like genuine U.S. Army fitness-training footage captured by a real camera operator.
Prioritize physical realism, character consistency, object continuity, natural movement, accurate camera perspective, realistic lighting, and believable human performance above cinematic spectacle.

21. WHEN I SAY “NEXT”
When I say:
“Next”
Generate exactly 1 completely new U.S. Army fitness challenge video prompt using the entire master structure.
When I say:
“Next 4”
Generate exactly 4 complete prompts.
When I say:
“Next 5”
Generate exactly 5 complete prompts.
When I say:
“Next 10”
Generate exactly 10 complete prompts.
Never shorten the individual prompts just because I request multiple videos.
Every individual video must contain the complete detailed structure.

22. CAPTION RULE
When I ask for captions after generating videos, provide a separate English Facebook caption for each video.
Each caption should be:
- Short
- Engaging
- Natural American English
- Directly related to the exact challenge
- Based on the actual outcome
- Family-friendly
- Designed for Facebook engagement
Use approximately 1–3 sentences followed by exactly 5 relevant hashtags.
Example style:
“Strength, discipline, and determination! 🇺🇸💪 Sergeant Johnson stays focused through every rep and finishes the challenge strong. Could you take on this Army challenge? 🔥
#USArmy #ArmyStrong #MilitaryTraining #FitnessChallenge #ArmyFitness”
Do not claim an outcome that the video does not show.

23. ABSOLUTE RULE — DO NOT SHORTEN
IMPORTANT: NEVER shorten my video prompts.
When I ask for a new video prompt, I expect the full detailed prompt.
Do not write:
“Use the same character details as before.”

Instead, repeat the complete Character Lock.
Do not write:
“Same environment as previous video.”

Instead, describe the complete environment again.
Do not write:
“Follow the same realism rules.”

Instead, repeat the complete realism and continuity rules.
Do not remove the Negative Prompt.
Do not remove the timeline.
Do not remove Dialogue and Audio.
Do not remove Camera and Visual Realism.
Do not remove Critical Physical Continuity Rules.
Do not remove Final Generation Instructions.
Every single video prompt must be standalone and ready to copy directly into Seedance 2.5 without needing any previous prompt.

🔒 MASTER PRIORITY
When generating these videos, follow this priority order:
1. U.S. Army identity
2. Exact character consistency
3. Realistic human anatomy
4. Realistic physics and object continuity
5. Complete 30-second timeline
6. Camera and lighting continuity
7. Natural audio and environment
8. Photorealistic documentary appearance
9. Clear competition outcome
10. No AI-generated visual artifacts
Do not change the established characters, format, level of detail, or Army theme unless I specifically instruct you to change something.`;

function toCsvField(str) {
  return '"' + String(str).replace(/"/g, '""') + '"';
}

// 1. RECONSTRUCT PROMPT BOOK
const pbRaw = fs.readFileSync('public/data/prompt-book.csv', 'utf8');
const pbParts = pbRaw.split(/(?=(?:https:\/\/www\.umairtiktokwala\.com\/img\/prompts\/|img\/aviation_army_fitness\.jpg))/g);

const pbList = [];
// Add the Aviation Army prompt ONCE at the top
pbList.push({
  img: 'img/aviation_army_fitness.jpg',
  title: 'U.S. Army Fitness Challenge (Aviation Prompt)',
  prompt: aviationFullPrompt,
  category: 'Aviation',
  tool: 'Seedance 2.5',
  home: 'True'
});

for (let p of pbParts) {
  p = p.trim();
  if (!p || p.includes('Aviation Prompt') || p.includes('img/aviation_army_fitness.jpg')) continue;
  if (p.startsWith('Image URL,')) {
    p = p.replace('Image URL,Title,Prompt,Category,Tool,Home\n', '').replace('Image URL,Title,Prompt,Category,Tool,Home\r\n', '').trim();
  }
  if (!p) continue;
  
  let cells = [];
  let cell = '', inQ = false;
  for (let i = 0; i < p.length; i++) {
    const c = p[i];
    if (inQ) {
      if (c === '"') {
        if (p[i+1] === '"') { cell += '"'; i++; }
        else inQ = false;
      } else cell += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ',') { cells.push(cell.trim()); cell = ''; }
      else cell += c;
    }
  }
  cells.push(cell.trim());
  
  if (cells[0] && cells[0].startsWith('https://www.umairtiktokwala.com/img/prompts/')) {
    pbList.push({
      img: cells[0],
      title: cells[1] || 'AI Visual Prompt',
      prompt: cells[2] || '',
      category: cells[3] || 'Visual',
      tool: cells[4] || 'Midjourney',
      home: cells[5] || 'True'
    });
  }
}

// Write clean prompt-book.csv
const pbLines = ['Image URL,Title,Prompt,Category,Tool,Home'];
for (const item of pbList) {
  pbLines.push(`${toCsvField(item.img)},${toCsvField(item.title)},${toCsvField(item.prompt)},${toCsvField(item.category)},${toCsvField(item.tool)},${toCsvField(item.home)}`);
}
fs.writeFileSync('public/data/prompt-book.csv', pbLines.join('\n'), 'utf8');
console.log('✅ Clean prompt-book.csv written with total valid visual items:', pbList.length);

// 2. RECONSTRUCT MASTER PROMPTS
const mpRaw = fs.readFileSync('public/data/master-prompts.csv', 'utf8');
const mpParts = mpRaw.split(/(?=(?:U\.S\.\s*ARMY\s*FITNESS\s*CHALLENGE|[A-Z0-9\s—–\(\)]+,[A-Za-z\s]+,"?ChatGPT Image))/g);

const mpList = [];
// Add the Aviation Master prompt ONCE at the top
mpList.push({
  title: 'U.S. ARMY FITNESS CHALLENGE (Aviation Prompt)',
  category: 'Aviation',
  img: 'img/aviation_army_fitness.jpg',
  prompt: aviationFullPrompt
});

for (let p of mpParts) {
  p = p.trim();
  if (!p || p.includes('Aviation Prompt') || p.includes('img/aviation_army_fitness.jpg') || p.startsWith('Title,Category')) continue;
  
  let cells = [];
  let cell = '', inQ = false;
  for (let i = 0; i < p.length; i++) {
    const c = p[i];
    if (inQ) {
      if (c === '"') {
        if (p[i+1] === '"') { cell += '"'; i++; }
        else inQ = false;
      } else cell += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ',') { cells.push(cell.trim()); cell = ''; }
      else cell += c;
    }
  }
  cells.push(cell.trim());
  
  if (cells.length >= 3 && cells[0] && cells[0].length > 2 && cells[0] !== 'Title') {
    mpList.push({
      title: cells[0],
      category: cells[1] || 'System',
      img: cells[2] || '',
      prompt: cells.slice(3).join(',')
    });
  }
}

// Write clean master-prompts.csv
const mpLines = ['Title,Category,Image,Master Prompt'];
for (const item of mpList) {
  mpLines.push(`${toCsvField(item.title)},${toCsvField(item.category)},${toCsvField(item.img)},${toCsvField(item.prompt)}`);
}
fs.writeFileSync('public/data/master-prompts.csv', mpLines.join('\n'), 'utf8');
console.log('✅ Clean master-prompts.csv written with total master systems:', mpList.length);
