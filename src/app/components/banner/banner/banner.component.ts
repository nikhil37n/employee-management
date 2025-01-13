import { Component } from '@angular/core';
import { BannerService } from 'src/app/service/banner.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent {
  constructor(public bannerService: BannerService) {}

  getIcon(type: string): string {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'warning':
        return 'exclamation-triangle';
      case 'danger':
        return 'times-circle';
      case 'info':
      default:
        return 'info-circle';
    }
  }
}
