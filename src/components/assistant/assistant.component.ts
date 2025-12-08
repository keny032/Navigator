import { Component, ChangeDetectionStrategy, inject, signal, ViewChild, ElementRef, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';
import { LoaderComponent } from '../shared/loader/loader.component';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, LoaderComponent],
})
export class AssistantComponent {
  geminiService = inject(GeminiService);

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  messages = signal<Message[]>([
    { sender: 'ai', text: 'Zdravo! Ja sam Navigator, vaš AI asistent. Kako vam mogu pomoći danas?' }
  ]);
  userInput = signal('');
  isLoading = signal(false);

  constructor() {
    afterNextRender(() => {
      this.scrollToBottom();
    });
  }
  
  async sendMessage() {
    const prompt = this.userInput().trim();
    if (!prompt || this.isLoading()) return;

    // Add user message
    this.messages.update(m => [...m, { sender: 'user', text: prompt }]);
    this.userInput.set('');
    this.isLoading.set(true);
    this.scrollToBottom();

    // Get AI response
    try {
      const aiResponse = await this.geminiService.sendMessage(prompt);
      this.messages.update(m => [...m, { sender: 'ai', text: aiResponse }]);
    } catch (error) {
        this.messages.update(m => [...m, { sender: 'ai', text: 'Izvinjavam se, došlo je do greške. Pokušajte ponovo.' }]);
    } finally {
        this.isLoading.set(false);
        this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    } catch (err) { }
  }
}
