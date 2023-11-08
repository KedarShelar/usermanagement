import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './service/api.service';
import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecycleBinComponent } from './recycle-bin/recycle-bin.component';

import { FordeleteComponent } from './dialoguebox/fordelete/fordelete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ForeditComponent } from './dialoguebox/foredit/foredit.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserprofilepageComponent } from './userprofilepage/userprofilepage.component';

@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
    RecycleBinComponent,
    FordeleteComponent,
    ForeditComponent,
    SignInComponent,
    SignUpComponent,
    UserprofilepageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgIf,
    NgFor,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
    MatTabsModule,
    NgbModule,
    NgClass,
    MatCardModule,
    MatDialogModule,
    RouterModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    JsonPipe,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
