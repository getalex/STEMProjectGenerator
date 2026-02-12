# 🚀 STEM Project Generator

A web application that generates creative STEM project ideas for kids using OpenAI's API. Users can get project ideas, view materials and instructions, and request similar or completely new ideas.

## Features

✨ **User-Friendly Interface**
- Clean, modern landing page with "Give me a project idea" button
- Beautiful project display with all details
- Responsive design that works on desktop and mobile

📚 **Rich Project Information**
- Project name and difficulty level
- Age range and time required
- Complete materials list (easy-to-find items)
- Step-by-step instructions
- Learning concepts explained
- Fun facts related to the project

🔄 **Feedback Options**
- Generate similar projects
- Generate completely new ideas
- Seamless navigation back to landing page

## Project Structure

```
STEMProject/
├── frontend/
│   ├── index.html          # Main HTML page
│   ├── styles.css          # Styling
│   └── script.js           # Frontend logic
└── backend/
    ├── server.js           # Express server
    ├── package.json        # Dependencies
    └── .env.example        # Environment setup example
```

## Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Groq API Key** (Free) - [Get one here](https://console.groq.com)

## Getting Started

### 1. Backend Setup

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Edit `backend/.env` and add your Groq API key:

```
GROQ_API_KEY=your_actual_key_here
PORT=3001
```

Start the backend server:

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

You should see: `✓ Groq API key detected` and `STEM Project Generator Backend running on http://localhost:3001`

### 2. Frontend Setup

In a new terminal, navigate to the frontend folder:

```bash
cd frontend
```

Start a simple HTTP server. You can use Python:

```bash
# Python 3
python -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000
```

Or if you have Node.js HTTP Server installed:

```bash
npx http-server -p 3000
```

Open your browser and go to: `http://localhost:3000`

## How to Use

1. **Landing Page**: Click the "💡 Give me a project idea" button
2. **Project Display**: View the generated project with:
   - Materials list
   - Detailed instructions
   - Learning concepts
   - Fun facts
3. **Get More Ideas**:
   - Click "🔄 Similar Idea" for a similar project
   - Click "✨ Brand New Idea" for something completely different
4. **Go Back**: Use the back arrow to return to the landing page

## Configuration

### OpenAI Model

You can change which OpenAI model is used in [backend/server.js](backend/server.js):

```javascript
model: 'gpt-3.5-turbo',  // or 'gpt-4', 'gpt-4-turbo-preview', etc.
```

### Project Parameters

Modify the `SYSTEM_PROMPT` in [backend/server.js](backend/server.js) to:
- Change age groups
- Adjust project complexity
- Modify time constraints
- Customize learning focus areas

## Deployment

### Deploy Backend

Options for deploying the Express backend:
- [Render](https://render.com)
- [Railway](https://railway.app)
- [Heroku](https://www.heroku.com)
- [Azure App Service](https://azure.microsoft.com/services/app-service/)
- [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/)

### Deploy Frontend

Options for hosting the static frontend:
- [Vercel](https://vercel.com)
- [Netlify](https://www.netlify.com)
- [GitHub Pages](https://pages.github.com)
- [Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/)

**Important**: When deploying, update the `API_BASE_URL` in [frontend/script.js](frontend/script.js) to point to your deployed backend.

## Troubleshooting

### Backend won't start
- Verify Node.js is installed: `node --version`
- Check that port 3001 is not in use
- Ensure `.env` file exists with your OpenAI API key

### Frontend shows "Cannot connect to backend"
- Make sure backend is running on `http://localhost:3001`
- Check browser console for error messages
- Verify CORS is enabled (it should be by default)

### OpenAI API errors
- Check your API key is valid and has available credits
- Verify your OpenAI account has API access enabled
- Check OpenAI's status page for service issues

## Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **AI**: OpenAI API
- **Styling**: Custom CSS with responsive design

## Future Enhancements

- [ ] User accounts and saved projects
- [ ] Project difficulty filters
- [ ] Export projects as PDF
- [ ] Multi-language support
- [ ] Teacher dashboard
- [ ] Project completion tracker
- [ ] Community project sharing

## License

MIT License - Feel free to use this project for personal and commercial purposes.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review OpenAI API documentation
3. Check Node.js and Express documentation

---

Happy STEM project generating! 🎉
