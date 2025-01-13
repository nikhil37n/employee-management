import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private bannerSubject = new BehaviorSubject<Banner | null>(null);

  get banner$(): Observable<Banner | null> {
    return this.bannerSubject.asObservable();
  }

  showBanner(
    message: string,
    type: 'success' | 'warning' | 'danger' | 'info',
    duration: number = 5000
  ) {
    const banner: Banner = { message, type };
    this.bannerSubject.next(banner);

    // Auto-hide the banner after the specified duration
    if (duration > 0) {
      setTimeout(() => this.hideBanner(), duration);
    }
  }

  hideBanner() {
    this.bannerSubject.next(null);
  }
}

export interface Banner {
  message: string;
  type: 'success' | 'warning' | 'danger' | 'info';
}
