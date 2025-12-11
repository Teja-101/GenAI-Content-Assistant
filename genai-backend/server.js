const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// --- MOCK DATA GENERATOR (Simulates AI) ---
const generateMockResponse = (topic, type) => {
    if (type === 'LinkedIn Post') {
        return `🚀 Excited to share my thoughts on ${topic}!\n\nIt's clear that this trend is reshaping our industry. The opportunities for innovation are endless. #Tech #Growth #${topic.replace(/\s/g, '')}`;
    } else if (type === 'Blog Post') {
        return `Title: The Future of ${topic}\n\nIn recent years, ${topic} has emerged as a critical driver of change. From efficiency gains to new business models, the impact is undeniable.\n\nKey Takeaways:\n1. Innovation is accelerating.\n2. Adoption is key.\n3. The future looks bright.`;
    } else {
        return `Here is a summary of ${topic}: It is a rapidly evolving field with significant potential for impact in the coming years.`;
    }
};

app.post('/generate', (req, res) => {
    console.log("Request received from Frontend!"); // This prints to your terminal
    const { topic, type } = req.body;
    
    // Simulate a 1.5 second delay to look like AI is thinking
    setTimeout(() => {
        const fakeAIResponse = generateMockResponse(topic, type);
        res.json({ content: fakeAIResponse });
    }, 1500);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));