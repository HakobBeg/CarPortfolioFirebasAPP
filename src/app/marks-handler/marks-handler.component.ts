import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-marks-handler',
  templateUrl: './marks-handler.component.html',
  styleUrls: ['./marks-handler.component.css']
})
export class MarksHandlerComponent {

  newMark = '';

  constructor(public dialogRef: MatDialogRef<MarksHandlerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
