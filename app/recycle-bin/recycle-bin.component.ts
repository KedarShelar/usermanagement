import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-recycle-bin',
  templateUrl: './recycle-bin.component.html',
  styleUrls: ['./recycle-bin.component.css'],
})
export class RecycleBinComponent implements OnInit {
  userdata: any[] = [];
  oldUserObj: any;
  constructor(private _service: ApiService) {}

  ngOnInit() {
    this.usertable();
  }

  usertable() {
    this._service.getuser().subscribe((res: any) => {
      this.userdata = res.filter((data: any) => data.isDeleted === true);
      console.log(res);
    });
  }

  onRestore(obj: any, position: any) {
    obj.isDeleted = false;
    this._service.updateuser(obj).subscribe((res) => {
      console.log(res);
      this.userdata.splice(position, 1);
      this._service.restoreUser(obj);
    });
  }

  onCancel(data: any) {}

  deleteuser(obj: any): void {
    this._service.Permanentdeleteuser(obj).subscribe((res) => console.log(res));
  }
}
