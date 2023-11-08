import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-foredit',
  templateUrl: './foredit.component.html',
  styleUrls: ['./foredit.component.css'],
})
export class ForeditComponent {
  constructor(
    public dialogRef: MatDialogRef<ForeditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public isedit = this.data.action === 'edit';

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
