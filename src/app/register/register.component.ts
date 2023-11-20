import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';

export interface Visitor {
  name: string,
  company: string,
  phone: string,
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(public dialog: MatDialog) { };

  openContact(): void {
    const dialogRef = this.dialog.open(ContactDialogComponent);
  }
}
