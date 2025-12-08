import { Injectable } from '@angular/core';
import { GoogleGenAI, Chat, GenerateContentResponse } from '@google/genai';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: GoogleGenAI;
  private chat: Chat | null = null; // Store the chat session

  constructor() {
    // IMPORTANT: API Key is handled by the environment. Do not expose it here.
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error('API_KEY environment variable not set.');
      // Disable the service if no API key
      this.ai = null!;
      return;
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  private startChatSession() {
    if (this.ai) {
        this.chat = this.ai.chats.create({
            model: 'gemini-2.5-flash',
            // The config is the same as the models.generateContent config.
            config: {
                systemInstruction: "You are a helpful assistant for navigating bureaucracy in Bosnia and Herzegovina. Your name is 'Navigator Birokratije'. Answer in Bosnian. Be concise and friendly. If you don't know the answer, suggest browsing the list of procedures.",
            }
        });
    }
  }

  async sendMessage(prompt: string): Promise<string> {
    if (!this.ai) {
      return "AI service is not configured. Please check API key setup.";
    }
    
    // Start a new chat session if one doesn't exist
    if (!this.chat) {
        this.startChatSession();
    }

    if (!this.chat) { // Check again in case startChatSession failed
        return "Failed to initialize AI chat session.";
    }

    try {
        let response: GenerateContentResponse = await this.chat.sendMessage({ message: prompt });
        return response.text;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return 'Došlo je do greške prilikom komunikacije sa AI asistentom. Molimo pokušajte ponovo kasnije.';
    }
  }
}
