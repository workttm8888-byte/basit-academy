const fs = require('fs');
const path = require('path');

const fullMasterPrompt = `# BASIT ACADEMY
## 🇺🇸 MASTER PROMPT — U.S. ARMY FITNESS CHALLENGE (Aviation Prompt)

Use this master prompt whenever I ask for new U.S. Army fitness challenge videos. Do not shorten the prompts. Do not remove sections. Do not simplify details. Do not add your own changes to the established format. Every new video prompt must follow the complete structure below.

### 1. CORE CONTENT IDENTITY
Create realistic U.S. Army fitness challenge / physical training videos featuring two recurring Army soldiers competing in realistic fitness challenges.
- Platform: Facebook
- Target Audience: United States
- Language: English (US)
- Video Generator: Seedance 2.5
- Video Duration: Exactly 30 seconds
- Format: Vertical 9:16
- Visual Style: Ultra-photorealistic documentary-style military training footage
- Main Goal: Make the footage look like genuine real-world U.S. Army training recorded by a real camera operator.
The videos must never look like CGI, cartoons, video games, AI animation, cinematic action movies, or unrealistic fitness commercials.

### 2. CHARACTER LOCK — SERGEANT JOHNSON
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
- Focused, Determined, Confident, Physically engaged, Natural fatigue when appropriate.
Do not give her exaggerated facial expressions. Do not change her ethnicity, face, skin tone, hairstyle, body shape, height, uniform, or age during the video.
IDENTITY LOCK: Sergeant Johnson must remain the exact same person from the first frame to the final frame.

### 3. OPPONENT LOCK — RYAN MITCHELL
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
- Heavier breathing, slightly slower repetitions, shorter pauses, realistic muscular effort.
Never show dramatic collapse, injury, exaggerated shaking, or cartoon-like exhaustion.
IDENTITY LOCK: Ryan Mitchell must remain the exact same person throughout the entire video.

### 4. MILITARY ENVIRONMENT LOCK
Believable U.S. Army training environment:
- Outdoor Army physical-training field / Military obstacle course / Training ground / Compact dirt or gravel training area.
The environment must contain realistic military training equipment appropriate to the challenge.
Do not randomly convert the scene into civilian gym, commercial fitness studio, Hollywood action set, or playground.

### 5. CHALLENGE DESIGN RULE
Every new video must feature a specific physical fitness challenge:
- Physically plausible, safe-looking, easy to understand visually, appropriate for Army PT, possible for a real human, based on realistic body mechanics.
Select fresh Army fitness concepts (Log Carry Sprint, Tire Drag & Rope Climb, Sandbag Carry, Obstacle Hurdles).

### 6. EXACT VIDEO FORMAT
- Duration: Exactly 30 seconds
- Aspect Ratio: 9:16 vertical
- Structure: One continuous shot
- Camera: Realistic handheld/documentary camera
- Style: Photorealistic, natural daylight lighting, no cuts, no teleportation.

### 7. REQUIRED PROMPT STRUCTURE
1. Character Lock — Sergeant Johnson
2. Opponent Lock — Ryan Mitchell
3. Environment and Challenge Setup
4. Detailed Continuous Timeline (00:00–00:30)
5. Dialogue / Audio (Realistic)
6. Camera Style
7. Physical Continuity Rules
8. Negative Prompt (Must Avoid)
9. Final Generation Instructions (Seedance 2.5)
10. Facebook Caption & Hashtags

### 8. REQUIRED NEGATIVE PROMPT
Avoid CGI, cartoon visuals, video-game rendering, plastic skin, artificial faces, changing identity, changing skin tone, changing hairstyle, changing body proportions, changing uniforms, inconsistent OCP camouflage, extra arms, extra legs, extra fingers, missing fingers, malformed hands, distorted joints, twisted knees, broken wrists, impossible anatomy, floating feet, sliding feet, floating equipment, disappearing equipment, duplicated equipment, changing equipment dimensions, teleportation, impossible acceleration, superhuman strength, impossible balance, objects moving without force, character merging, lane switching, inconsistent lighting, changing sunlight, inconsistent shadows, warped backgrounds, unstable perspective, fisheye distortion, camera teleportation, jump cuts, scene transitions, time skips, slow motion, speed ramps, cinematic effects, artificial cheering, excessive grunting, subtitles, text overlays, digital counters, scoreboards, logos, watermarks, and any visual artifact that makes the footage look AI-generated.`;

// Escape CSV field properly
function toCsvField(str) {
  return '"' + str.replace(/"/g, '""') + '"';
}

// 1. Update master-prompts.csv
const mpPath = path.join(__dirname, 'public', 'data', 'master-prompts.csv');
const mpContent = fs.readFileSync(mpPath, 'utf8');
const mpLines = mpContent.split('\n');
const mpHeader = mpLines[0];
const mpBody = mpLines.slice(1).join('\n');

const newMpLine = `U.S. ARMY FITNESS CHALLENGE (Aviation Prompt),Aviation,img/aviation_army_fitness.jpg,${toCsvField(fullMasterPrompt)}`;
fs.writeFileSync(mpPath, `${mpHeader}\n${newMpLine}\n${mpBody}`, 'utf8');
console.log('✅ Added to master-prompts.csv');

// 2. Update prompt-book.csv
const pbPath = path.join(__dirname, 'public', 'data', 'prompt-book.csv');
const pbContent = fs.readFileSync(pbPath, 'utf8');
const pbLines = pbContent.split('\n');
const pbHeader = pbLines[0];
const pbBody = pbLines.slice(1).join('\n');

const newPbLine = `img/aviation_army_fitness.jpg,U.S. Army Fitness Challenge (Aviation Prompt),${toCsvField(fullMasterPrompt)},Aviation,Seedance 2.5,True`;
fs.writeFileSync(pbPath, `${pbHeader}\n${newPbLine}\n${pbBody}`, 'utf8');
console.log('✅ Added to prompt-book.csv');
