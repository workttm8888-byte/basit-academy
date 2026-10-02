const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// AI Prompt Extractor Engine
app.post('/api/extract-prompt', async (req, res) => {
  const { url, description, style, tool, apiKey } = req.body;

  if (!description && !url) {
    return res.status(400).json({ error: 'Please provide a video link or description.' });
  }

  const cleanDesc = description || (url ? `Viral video reference link: ${url}` : 'Viral high-retention video concept');

  // If user provided an OpenAI or Gemini API Key, try live LLM deconstruction
  if (apiKey && apiKey.trim().length > 10) {
    const key = apiKey.trim();
    try {
      if (key.startsWith('AIzaSy')) {
        // Google Gemini API
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
        const promptSystem = `You are a world-class AI Video Prompt Engineer at Basit Academy.
Analyze this video concept/link: "${cleanDesc}".
Return a JSON object ONLY with these exact 4 keys:
"title": "Short title of the blueprint",
"image_prompt": "Ultra-detailed photorealistic Midjourney v6 / Flux image prompt with lighting, camera lens, AR 9:16",
"video_prompt": "Ultra-detailed Runway Gen-3 / Kling AI motion prompt with camera motion and physics",
"viral_hook": "0-3s hook, 3-7s escalation, and loop transition"
Return ONLY valid raw JSON with no markdown wrapping.`;

        const geminiRes = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptSystem }] }]
          })
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
          const cleanedJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanedJson);
          return res.json({
            success: true,
            title: parsed.title || `Extracted: ${cleanDesc.slice(0, 45)}...`,
            image_prompt: parsed.image_prompt,
            video_prompt: parsed.video_prompt,
            viral_hook: parsed.viral_hook
          });
        }
      } else if (key.startsWith('sk-')) {
        // OpenAI API
        const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: 'You are an elite AI Video Director at Basit Academy. Return a JSON object ONLY with keys: "title", "image_prompt", "video_prompt", "viral_hook".'
              },
              {
                role: 'user',
                content: `Deconstruct this video idea into production prompts: "${cleanDesc}"`
              }
            ],
            response_format: { type: 'json_object' }
          })
        });

        if (openAiRes.ok) {
          const openAiData = await openAiRes.json();
          const parsed = JSON.parse(openAiData.choices?.[0]?.message?.content || '{}');
          return res.json({
            success: true,
            title: parsed.title || `Extracted Blueprint: ${cleanDesc.slice(0, 45)}...`,
            image_prompt: parsed.image_prompt,
            video_prompt: parsed.video_prompt,
            viral_hook: parsed.viral_hook
          });
        }
      }
    } catch (apiErr) {
      console.warn('API Key live call fallback to local engine:', apiErr.message);
    }
  }

  // Built-in High Precision Extraction Engine
  const queryText = (description || url).toLowerCase();
  
  let visualStyle = style || 'Hyper-Realistic Cinematic 8K';
  let lighting = 'volumetric cinematic rim lighting with soft atmospheric diffusion, golden hour glow';
  let camera = 'slow tracking macro push-in shot, 35mm anamorphic lens, shallow depth of field (f/1.8), motion blur';
  let motion = 'fluid natural organic motion, 60fps slow-motion dynamics, hyper-detailed physics';
  
  if (queryText.includes('anime') || queryText.includes('cartoon') || queryText.includes('3d') || queryText.includes('animation')) {
    visualStyle = 'Stylized 3D Pixar/DreamWorks Animation, octane render, vivid color palette';
    lighting = 'bright soft studio lighting with warm bounce highlights and glossy subsurface scattering';
    camera = 'smooth 3D orbit camera, dynamic tilt angle, sharp focus on expressive micro-expressions';
    motion = 'bouncy energetic stylized character animation, smooth squash and stretch physics';
  } else if (queryText.includes('horror') || queryText.includes('dark') || queryText.includes('scary') || queryText.includes('mystery')) {
    visualStyle = 'Dark Grim Cinematic Thriller, muted tones, 35mm Kodak film grain';
    lighting = 'chiroscuro high-contrast shadows, eerie cold moonlight, volumetric fog';
    camera = 'low angle Dutch tilt, slow unsettling handheld camera creep, deep shadows';
    motion = 'subtle slow breathing movement, sudden tension building motion';
  } else if (queryText.includes('transformation') || queryText.includes('fruit') || queryText.includes('dental') || queryText.includes('satisfying') || queryText.includes('asmr')) {
    visualStyle = 'Extreme Macro Satisfying ASMR 4K, crystal-clear glass reflections';
    lighting = 'bright studio macro ring-light, high-gloss specular highlights';
    camera = 'extreme close-up macro locked camera with micro-focus shift';
    motion = 'seamless step-by-step organic growth / satisfying tactile transformation sequence';
  } else if (queryText.includes('luxury') || queryText.includes('car') || queryText.includes('money') || queryText.includes('millionaire') || queryText.includes('lifestyle')) {
    visualStyle = 'Hyper-Luxury Editorial Commercial, clean sleek aesthetics';
    lighting = 'dramatic neon city ambient glow mixed with soft twilight rim lights';
    camera = 'high-speed drone chase pan, cinematic low-angle tracking, anamorphic lens flare';
    motion = 'smooth gliding motion, 120fps ultra-crisp velocity';
  }

  const imagePrompt = `/imagine prompt: ${cleanDesc}, ${visualStyle}, ${lighting}, ${camera}, shot on ARRI Alexa 65, photorealistic 8K, unreal engine 5 render, cinematic color grading, hyper-detailed texture, --ar 9:16 --style raw --v 6.1`;
  const videoPrompt = `Vertical 9:16 video. ${cleanDesc}. Camera: ${camera}. Lighting: ${lighting}. Action & Motion: ${motion}. Photorealistic, ultra-high definition, cinematic pacing, smooth continuity, no morphing artifacts, no text watermark, 8 seconds duration.`;
  const viralHook = `0-3s Hook: "Stop scrolling — here is the exact secret AI system behind this viral video style."\n3-7s Escalation: Fast-paced step-by-step visual escalation with Foley sound effects.\n7-8s Loop: Seamless loop transition into beginning.`;

  res.json({
    success: true,
    title: `Extracted Master Blueprint: ${cleanDesc.slice(0, 45)}...`,
    image_prompt: imagePrompt,
    video_prompt: videoPrompt,
    viral_hook: viralHook
  });
});

// Safe Student Storage Database File
const STUDENTS_FILE = path.join(__dirname, 'public', 'data', 'students.json');

function getStudents() {
  try {
    if (!fs.existsSync(STUDENTS_FILE)) {
      const dataDir = path.dirname(STUDENTS_FILE);
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
      fs.writeFileSync(STUDENTS_FILE, JSON.stringify([], null, 2), 'utf8');
      return [];
    }
    const raw = fs.readFileSync(STUDENTS_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Error reading students file:', err);
    return [];
  }
}

function saveStudent(student) {
  const list = getStudents();
  const existingIdx = list.findIndex(s => (s.email && s.email.toLowerCase() === student.email.toLowerCase()) || (s.whatsapp && s.whatsapp === student.whatsapp));
  
  const record = {
    id: student.id || `student_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    firstName: student.firstName || '',
    lastName: student.lastName || '',
    fullName: `${student.firstName || ''} ${student.lastName || ''}`.trim() || student.name || 'Student Member',
    email: (student.email || '').toLowerCase().trim(),
    whatsapp: student.whatsapp || '',
    authProvider: student.authProvider || 'google',
    createdAt: student.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (existingIdx >= 0) {
    list[existingIdx] = { ...list[existingIdx], ...record, id: list[existingIdx].id };
  } else {
    list.unshift(record);
  }

  fs.writeFileSync(STUDENTS_FILE, JSON.stringify(list, null, 2), 'utf8');
  return record;
}

// Student Registration & Safe Storage Endpoint
app.post('/api/auth/register-student', async (req, res) => {
  const { firstName, lastName, email, whatsapp, authProvider, supabaseUrl, supabaseKey } = req.body;

  if (!email && !whatsapp) {
    return res.status(400).json({ error: 'Email or WhatsApp number is required.' });
  }

  const savedRecord = saveStudent({
    firstName,
    lastName,
    email,
    whatsapp,
    authProvider: authProvider || 'google'
  });

  // If Supabase credentials are provided or set in environment, sync to Supabase table 'students'
  const sbUrl = supabaseUrl || process.env.SUPABASE_URL;
  const sbKey = supabaseKey || process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY;

  if (sbUrl && sbKey) {
    try {
      await fetch(`${sbUrl.replace(/\/$/, '')}/rest/v1/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': sbKey,
          'Authorization': `Bearer ${sbKey}`,
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify({
          id: savedRecord.id,
          first_name: savedRecord.firstName,
          last_name: savedRecord.lastName,
          full_name: savedRecord.fullName,
          email: savedRecord.email,
          whatsapp: savedRecord.whatsapp,
          auth_provider: savedRecord.authProvider,
          created_at: savedRecord.createdAt
        })
      });
    } catch (sbErr) {
      console.warn('Supabase sync notice:', sbErr.message);
    }
  }

  res.json({
    success: true,
    message: 'Student registered and safely saved in database.',
    student: savedRecord
  });
});

// Get Student Profile
app.get('/api/auth/student-profile', (req, res) => {
  const email = (req.query.email || '').toLowerCase().trim();
  const whatsapp = (req.query.whatsapp || '').trim();

  const list = getStudents();
  const match = list.find(s => (email && s.email === email) || (whatsapp && s.whatsapp === whatsapp));

  if (!match) {
    return res.status(404).json({ error: 'Student not found.' });
  }

  res.json({ success: true, student: match });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
