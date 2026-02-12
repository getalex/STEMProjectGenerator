import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Groq API configuration
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// System prompt for project generation
const SYSTEM_PROMPT = `You are a creative STEM project idea generator for kids. Generate fun, educational STEM (Science, Technology, Engineering, Mathematics) projects that are:
- Age-appropriate for the specified age group
- Use commonly available materials (household items, craft supplies, basic tools)
- Engaging and hands-on
- Completed in 1-4 hours
- Educational and teach real STEM concepts

Format your response as JSON with exactly this structure:
{
  "projectName": "Project Name Here",
  "ageRange": "Ages X-Y",
  "difficulty": "Easy/Medium/Hard",
  "timeRequired": "X minutes",
  "materials": ["Material 1", "Material 2", "Material 3"],
  "instructions": ["Step 1", "Step 2", "Step 3"],
  "learningConcepts": "What STEM concepts are learned",
  "funFact": "An interesting fact related to the project"
}`;

// Generate project endpoint
app.post('/api/generate-project', async (req, res) => {
  try {
    if (!GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not set in environment variables');
    }

    const { feedback, previousProject, ageRange } = req.body;

    // Map age range to difficulty levels
    const ageRangeMappings = {
      'any': 'any (suitable for all ages 6-17)',
      '6-8': 'Easy (suitable for ages 6-8)',
      '9-11': 'Easy to Medium (suitable for ages 9-11)',
      '12-14': 'Medium (suitable for ages 12-14)',
      '15-17': 'Medium to Hard (suitable for ages 15-17)',
    };

    const ageDescription = ageRangeMappings[ageRange] || 'appropriate for all ages';

    let userPrompt;
    if (feedback && previousProject) {
      userPrompt = `The user gave this feedback: "${feedback}" about a ${previousProject.difficulty} difficulty project for ${ageDescription}. Generate a ${feedback === 'similar' ? 'similar but different' : 'completely different'} STEM project that is ${ageDescription}.`;
    } else {
      userPrompt = `Generate a random STEM project idea that is ${ageDescription}.`;
    }

    const groqResponse = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 1000,
      }),
    });

    if (!groqResponse.ok) {
      const error = await groqResponse.json();
      throw new Error(`Groq API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await groqResponse.json();
    const content = data.choices[0].message.content;
    
    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse project data from Groq response');
    }

    const project = JSON.parse(jsonMatch[0]);
    res.json({ success: true, project });
  } catch (error) {
    console.error('Error generating project:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate project',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'STEM Project Generator Backend is running' });
});

// Favicon route (prevents 404 errors)
app.get('/favicon.ico', (req, res) => {
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`STEM Project Generator Backend running on http://localhost:${PORT}`);
  if (!GROQ_API_KEY) {
    console.error('❌ ERROR: GROQ_API_KEY is not set in your .env file');
  } else {
    console.log('✓ Groq API key detected');
  }
});
