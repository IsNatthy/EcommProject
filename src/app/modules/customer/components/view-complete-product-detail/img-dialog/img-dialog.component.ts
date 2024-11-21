import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-img-dialog',
  templateUrl: './img-dialog.component.html',
  styleUrls: ['./img-dialog.component.scss']
})
export class ImgDialogComponent {
[x: string]: any;
constructor(
  @Inject(MAT_DIALOG_DATA) public data: {imageUrl: string},
  public dialogRef: MatDialogRef<ImgDialogComponent>
) {}}
