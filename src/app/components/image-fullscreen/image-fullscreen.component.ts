import { Component, Inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  imageUrl: string;
}

@Component({
  selector: 'app-image-fullscreen',
  standalone: true,
  imports: [
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './image-fullscreen.component.html',
  styleUrl: './image-fullscreen.component.scss',
})
export class ImageFullscreenComponent {
  imageUrl?: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { imageUrl: any },
    private dialogRef: MatDialogRef<ImageFullscreenComponent>
  ) {
    this.imageUrl = data.imageUrl;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
