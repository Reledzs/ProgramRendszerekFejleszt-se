import { Component, inject, model } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { Extra } from "../../shared/services/model/Extra";
import { ExtraService } from "../../shared/services/extra.service";
@Component({
  selector: 'add-extra-dialog',
  standalone: true,
  templateUrl: './add-extra.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
})
export class AddExtraComponent {
  title="";
  editmode=false;
  selectedFile: File | null = null;
  extraService = inject(ExtraService); 
  extra:Extra = inject<Extra>(MAT_DIALOG_DATA)?? {
    name: '',
    price: '',
    details: ''
  };
  ngOnInit(){
    if(this.extra.name==''){
      this.title="Új extra hozzáadása"
      this.editmode=false;
    }
    else{
      this.title="Extra szerkesztése"
      this.editmode=true;
    }
  }
  readonly dialogRef = inject(MatDialogRef<AddExtraComponent>);
  onSave() {
    if(this.editmode==true){
      this.extraService.updateExtra(this.extra).subscribe({
      next: () => this.dialogRef.close('referesh'),
      error: (err: any) => console.error('Hiba mentés közben:', err)
    });
    }
    else{
    this.extraService.addExtra(this.extra).subscribe({
    next: () => this.dialogRef.close('referesh'),
    error: (err: any) => console.error('Hiba mentés közben:', err)
    });
    }
  }
  onCancel() {
    this.dialogRef.close();
  }
}

