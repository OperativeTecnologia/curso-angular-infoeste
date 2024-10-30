import { Pipe, PipeTransform } from '@angular/core';
import { abbreviateLastName } from '@burand/angular';

import { environment } from '@environment';

@Pipe({
  standalone: true,
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {
  transform(url: string, userName?: string): string {
    if (!url) {
      if (userName) {
        return `https://ui-avatars.com/api/?name=${abbreviateLastName(userName)}&background=3c405f&color=fff`;
      }

      return null;
    }

    if (url.startsWith('data:image/')) {
      return url;
    }

    if (url.startsWith('https')) {
      return url;
    }

    return `${environment.storageURL}/avatars/${url}`;
  }
}
