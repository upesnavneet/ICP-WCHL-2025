# SmartScan.AI

SmartScan.AI is an intelligent crypto-focused assistant that helps users understand blockchain concepts, smart contracts, DeFi protocols, tokenomics, and market trends — all in plain, simple terms. The goal is to make crypto education more accessible through AI-powered explanations.

---

## Features

- Ask questions about any crypto token or blockchain project
- AI-generated responses using OpenRouter’s GPT-3.5-turbo model
- Designed to be clear, concise, and beginner-friendly
- Animated typewriter-style response display
- Fully responsive split layout interface
- Secure use of environment variables for API key management

---

## Technologies Used

- React (Vite)
- Axios (for API requests)
- OpenRouter API (GPT-3.5-turbo)
- Custom CSS
- Local state management with React Hooks
- Typing animation with a reusable `TextType` component

---

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/upesnavneet/ICP-WCHL-2025.git
   cd smartscan-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root of the project and add your OpenRouter API key:

   ```
   VITE_OPENROUTER_KEY=your_openrouter_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

---

## File Structure

```
src/
├── OpenAIQuery/         # Main chat interface
├── assets/              # Images and static assets
├── App.jsx              # Entry point
├── main.jsx             # Vite bootstrap
```

---

## Usage Notes

- The AI is configured with a system prompt to behave like a helpful crypto analyst.
- Only the latest response uses animated typing; previous responses are rendered normally.

---

## License

This project is licensed under the MIT License.

---

## Author

Created by Navneet and team for the ICP WCHL Hackathon 2025.
