import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-fordelete',
  templateUrl: './fordelete.component.html',
  styleUrls: ['./fordelete.component.css'],
})
export class FordeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<FordeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _service: ApiService
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onDelete(userObj: any) {
    userObj.isDeleted = true;
    this._service.updateuser(userObj).subscribe((res) => {
      console.log(res);

      this.dialogRef.close();
    });
  }
}
