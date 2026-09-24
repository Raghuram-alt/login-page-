// Text-to-speech helper with fallback support

class SpeechService {
  private isMuted: boolean = false;
  private currentLanguage: string = 'en-US';

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setLanguage(lang: 'en' | 'te' | 'hi') {
    if (lang === 'te') this.currentLanguage = 'te-IN';
    else if (lang === 'hi') this.currentLanguage = 'hi-IN';
    else this.currentLanguage = 'en-US';
  }

  public speak(text: string) {
    if (this.isMuted) return;
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser environment');
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = this.currentLanguage;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('Speech synthesis error:', e);
    }
  }

  public stop() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const speechService = new SpeechService();
