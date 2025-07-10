# ai-chatbot-gpt-langchain
Created By Rupesh Rajhans
support email - rupesh.rajhans92@gmail.com


# Project Structure
ai-chatbot-gpt-langchain/
│
├── frontend/   # React + Next.js chat UI
└── server/     # Node.js + TypeScript + LangChain-based API


# Clone the Repository

git clone https://github.com/rajhans92/ai-chatbot-gpt-langchain.git
cd ai-chatbot-gpt-langchain/

# Frontend Setup (React + Next.js)
cd frontend

# Install Dependencies
npm install

npm run dev

Visit http://localhost:3000

# Backend Setup (Node.js + TypeScript + LangChain + GPT)
cd ../server
npm install

# Environment Variables
touch .env

Add your environment variables (example):
PORT=4000
OPENAI_API_KEY=your-openai-api-key

npm run dev

Visit http://localhost:4000