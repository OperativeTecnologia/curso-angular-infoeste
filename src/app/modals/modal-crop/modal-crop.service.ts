import { inject, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalCropComponent } from './modal-crop.component';

@Injectable({
  providedIn: 'root'
})
export class ModalCropService {
  private ngbModal = inject(NgbModal);

  /**
   * Open modal for image cropping.
   *
   * Return base64 from encoded image
   *
   * Example in component
   *
   * ```ts
   * private modalCropService = inject(ModalCropService);
   *
   * async handleImage(event: Event) {
   *   const input = event.target as HTMLInputElement;
   *   const baseUrl = await this._crop.crop(input.files[0]);
   *   this.profilePicture = baseUrl;
   * }
   * ```
   */
  crop(file: File, aspectRatio?: number): Promise<string> {
    const modalRef = this.ngbModal.open(ModalCropComponent, {
      backdrop: 'static',
      centered: true,
      keyboard: false
    });

    modalRef.componentInstance.aspectRatio = aspectRatio || 1;
    modalRef.componentInstance.imageFile = file;

    return modalRef.result;
  }
}
