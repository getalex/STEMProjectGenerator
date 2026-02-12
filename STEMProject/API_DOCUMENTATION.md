# API Documentation

## Base URL
```
http://localhost:3001/api
```

## Endpoints

### 1. Generate Project
Generate a new STEM project idea for kids.

**Endpoint:** `POST /api/generate-project`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**

Option A - Generate a random project:
```json
{}
```

Option B - Generate based on feedback:
```json
{
  "feedback": "similar" | "new",
  "previousProject": {
    "projectName": "String",
    "ageRange": "Ages X-Y",
    "difficulty": "Easy" | "Medium" | "Hard",
    "timeRequired": "X minutes",
    "materials": ["material1", "material2", "..."],
    "instructions": ["step1", "step2", "..."],
    "learningConcepts": "String",
    "funFact": "String"
  }
}
```

**Response - Success (200 OK):**
```json
{
  "success": true,
  "project": {
    "projectName": "Build a Simple Slime",
    "ageRange": "Ages 6-12",
    "difficulty": "Easy",
    "timeRequired": "20 minutes",
    "materials": [
      "White school glue",
      "Borax powder",
      "Water",
      "Food coloring (optional)",
      "Bowl",
      "Spoon"
    ],
    "instructions": [
      "Pour 4 oz of white glue into a bowl",
      "Add a few drops of food coloring if desired",
      "Mix 1 teaspoon of borax with 1 cup of water",
      "Pour the borax solution into the glue and stir",
      "As the mixture thickens, use your hands to knead it",
      "Your slime is ready to play with!"
    ],
    "learningConcepts": "Polymers, chemical reactions, and non-Newtonian fluids",
    "funFact": "Slime is a non-Newtonian fluid, meaning it acts as both a liquid and a solid depending on how much force is applied to it!"
  }
}
```

**Response - Error (500 Internal Server Error):**
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### 2. Health Check
Check if the backend server is running.

**Endpoint:** `GET /api/health`

**Response (200 OK):**
```json
{
  "status": "ok",
  "message": "STEM Project Generator Backend is running"
}
```

## Error Handling

### Common Errors

**Missing API Key:**
- Check that `OPENAI_API_KEY` is set in your `.env` file
- Response: `404` or `500` with "Failed to generate project"

**Invalid API Key:**
- Response: `500` with OpenAI authentication error

**Rate Limiting:**
- If you exceed OpenAI API rate limits
- Response: `500` with rate limit message

**Network Issues:**
- Connection timeout or refused
- Check that backend is running and accessible

## Example Usage

### JavaScript/Fetch
```javascript
// Generate a random project
const response = await fetch('http://localhost:3001/api/generate-project', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({})
});

const data = await response.json();
console.log(data.project);
```

### Python/Requests
```python
import requests

url = "http://localhost:3001/api/generate-project"
response = requests.post(url, json={})
data = response.json()
print(data['project'])
```

### cURL
```bash
curl -X POST http://localhost:3001/api/generate-project \
  -H "Content-Type: application/json" \
  -d '{}'
```

## Rate Limiting Best Practices

To avoid hitting OpenAI API limits:

1. **Cache Results**: Store previously generated projects to reuse them
2. **Implement Delays**: Add a small delay between consecutive requests
3. **Monitor Usage**: Keep track of API calls in your `.env` configuration
4. **User Feedback**: Inform users about rate limit responses

## Customization

### Change the AI Model
Edit `backend/server.js` line with model selection:
```javascript
model: 'gpt-3.5-turbo',  // Options: gpt-4, gpt-4-turbo-preview, etc.
```

### Modify Project Parameters
Edit the `SYSTEM_PROMPT` in `backend/server.js` to:
- Target different age groups
- Adjust difficulty levels
- Change subject focus
- Modify project duration

### Adjust Response Format
The response format is defined in the `SYSTEM_PROMPT`. Modify the JSON structure template there to change what information is returned.

## Troubleshooting

### Projects are too complex
- Reduce target age range in `SYSTEM_PROMPT`
- Change difficulty requirements

### Projects take too long
- Modify `timeRequired` requirements

### Unexpected format in responses
- Ensure OpenAI API is responding correctly
- Check that model supports the requested features
- Review error messages in server console

## Performance Notes

- **Response Time**: Typically 2-5 seconds depending on OpenAI API load
- **Token Usage**: Each request uses approximately 150-300 tokens
- **Cost**: Depends on OpenAI pricing for your chosen model

Monitor your OpenAI usage at: https://platform.openai.com/usage

---

For more information on OpenAI API, visit: https://platform.openai.com/docs/api-reference
