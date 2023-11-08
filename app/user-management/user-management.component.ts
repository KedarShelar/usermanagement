import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { auto } from '@popperjs/core';

import { ForeditComponent } from '../dialoguebox/foredit/foredit.component';
import { FordeleteComponent } from '../dialoguebox/fordelete/fordelete.component';
import { Router } from '@angular/router';
import { usermodel } from '../user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  userdata: any[] = [];
  oldUserObj: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _service: ApiService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.Loaddata();
  }

  Loaddata() {
    this._service.getuser().subscribe((res) => {
      this.userdata = res.filter((data: any) => data.isDeleted === false);
      this.dataSource = new MatTableDataSource(this.userdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  displayedColumns: string[] = [
    'id',
    'name',
    'Designation',
    'Salary',
    'Action',
  ];

  ngOnInit() {
    this.usertable();
    this._service.subscribeOnUserRestore().subscribe((data) => {
      this.usertable();

      console.log(data);
    });
  }

  usertable() {
    this._service.getuser().subscribe((res: any) => {
      this.userdata = res.filter((data: any) => data.isDeleted === false);
    });
  }

  isEditing: boolean = false;

  toggleEditMode() {
    this.isEditing = !this.isEditing;
  }

  onEdit(userObj: any) {
    const dialogRef = this.dialog.open(ForeditComponent, {
      width: auto,
      height: auto,
      data: { ...userObj, action: 'edit' },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        console.log(res);
        this._service.updateuser(res).subscribe(() => {
          this.usertable();
        });
      }
    });
  }

  onCancel(obj: any) {
    obj.isEdit = false;
    obj = this.oldUserObj;
  }

  deleteddata: any;

  onDelete(obj: any) {
    const dialogRef = this.dialog.open(FordeleteComponent, {
      width: auto,
      height: auto,
      data: { ...obj },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this._service.updateuser(res).subscribe(() => {
          this.usertable();
        });
      }
    });
  }

  add() {
    this.OpenDialog();
  }

  OpenDialog() {
    const uModelObj: usermodel = new usermodel();
    const dialogRef = this.dialog.open(ForeditComponent, {
      width: auto,
      height: auto,
      data: { ...uModelObj, action: 'add' },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        console.log(res);
        this._service.adduser(res).subscribe(() => {
          this.usertable();
        });
      }
    });
  }
}
