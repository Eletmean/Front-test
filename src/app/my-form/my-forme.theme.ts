import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'user-theme';
  private readonly DARK_THEME = 'dark-theme';
  private readonly LIGHT_THEME = 'light-theme';
  private themeSubject = new BehaviorSubject<string>(this.LIGHT_THEME);
  private systemThemeMediaQuery: MediaQueryList;

  public theme$ = this.themeSubject.asObservable();

  constructor() {
    this.systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.initializeTheme();
    this.systemThemeMediaQuery.addEventListener('change', () => this.handleSystemThemeChange());
  }

  private initializeTheme(): void {
    if (this.isLocalStorageAvailable()) {
      const savedTheme = localStorage.getItem(this.THEME_KEY);
      if (savedTheme) {
        this.setTheme(savedTheme);
        return;
      }
    }
    this.setSystemTheme();
  }

  private setSystemTheme(): void {
    const isDarkMode = this.systemThemeMediaQuery.matches;
    this.setTheme(isDarkMode ? this.DARK_THEME : this.LIGHT_THEME);
  }

  private handleSystemThemeChange(): void {
    if (!this.isLocalStorageAvailable() || !localStorage.getItem(this.THEME_KEY)) {
      this.setSystemTheme();
    }
  }

  public toggleTheme(): void {
    const currentTheme = document.body.classList.contains(this.DARK_THEME)
      ? this.LIGHT_THEME
      : this.DARK_THEME;
    this.setTheme(currentTheme);
  }

  private setTheme(theme: string): void {
    document.body.classList.remove(this.DARK_THEME, this.LIGHT_THEME);
    document.body.classList.add(theme);
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.THEME_KEY, theme);
    }
    this.themeSubject.next(theme);
  }

  public isDarkTheme(): boolean {
    return document.body.classList.contains(this.DARK_THEME);
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}