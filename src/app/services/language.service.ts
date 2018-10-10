import { Injectable } from '@angular/core';
import { PlatformLocation } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LanguageService 
{
  constructor(private platformLocation: PlatformLocation) 
  { 

  }

  getLanguage(): string
  {
    return (this.platformLocation.getBaseHrefFromDOM() != '/') ? this.platformLocation.getBaseHrefFromDOM().substring(1) : 'zh-TW';;
  }

  getBaseHref(): string
  {
    return this.platformLocation.getBaseHrefFromDOM();
  }
}
