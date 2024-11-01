import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  standalone: true,
  selector: 'app-modal-crop',
  templateUrl: './modal-crop.component.html',
  imports: [ImageCropperComponent]
})
export class ModalCropComponent {
  private ngbActiveModal = inject(NgbActiveModal);

  @Input() imageBase64 = '';
  @Input() imageFile: File;
  @Input() aspectRatio: number = 16 / 9;

  croppedImage = '';

  onImageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  dismiss() {
    this.ngbActiveModal.close(null);
  }

  close() {
    this.ngbActiveModal.close(this.croppedImage);
  }
}
