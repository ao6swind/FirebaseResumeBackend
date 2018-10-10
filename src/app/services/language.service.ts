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
    return (this.platformLocation.getBaseHrefFromDOM() != '/') ? this.platformLocation.getBaseHrefFromDOM().replace(/\//g,'') : 'zh-TW';;
  }

  getBaseHref(): string
  {
    return this.platformLocation.getBaseHrefFromDOM();
  }
}
