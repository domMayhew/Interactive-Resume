import { Component } from '@angular/core';
import { Visitor } from '../register.component';
import { MatDialogRef } from '@angular/material/dialog';
import { VisitorService } from 'src/app/services/visitor/visitor.service';
@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent {
  public visitor: Visitor = {
    name: "",
    company: "",
    phone: ""
  }

  previousVisitorsString(): string {
    return `Thanks for reaching out, ${this.visitor.name}! You might have to get in line: ` +
      `there are already a few visitors and some of them look important!`;
  }
  public submitted = false;
  public visitors: Visitor[] = [];

  constructor(public dialogRef: MatDialogRef<ContactDialogComponent>, private readonly visitorService: VisitorService) {
    visitorService.getVisitors().subscribe((resp) => this.visitors = resp);
  };

  noClick(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.visitorService.submitVisitor(this.visitor);
    this.submitted = true;
  }
}
