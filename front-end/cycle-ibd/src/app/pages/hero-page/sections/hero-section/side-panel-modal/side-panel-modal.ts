import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-side-panel-modal',
  imports: [],
  templateUrl: './side-panel-modal.html',
  styleUrl: './side-panel-modal.scss',
})
export class SidePanelModal {
  private dialogRef = inject(DialogRef,
    {
      optional: true,
    });
  protected closeModal() {
    this.dialogRef?.close();
  }
}
