import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ExtraService } from '../shared/services/extra.service';
import { Extra } from '../shared/services/model/Extra';
import { AddCarComponent } from '../add-car/add-car.component';
import { AddExtraComponent } from '../add-extra/add-car/add-extra.component';

@Component({
  selector: 'app-extra-manager',
  imports: [MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './extra-manager.component.html',
  styleUrl: './extra-manager.component.scss'
})
export class ExtraManagerComponent {
    extras:Extra[]=[];
    dialog = inject(MatDialog);
    displayedColumns: string[] = ['name','price', 'details','actions'];
    constructor(private extraservices:ExtraService){};
    ngOnInit(){
      this.loadData();
    }
    deleteextra(extra:Extra){
      this.extraservices.deleteExtra(extra._id).subscribe({
      next: (response) => this.loadData(),
      error: (err) => console.error('Hiba a mentés során:', err)
    });
    }
    editextra(extra:Extra){
        const dialogRef = this.dialog.open(AddExtraComponent, {
          data: extra,
          height: '600px',
          width: '1000px',
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result !== undefined) {
            this.loadData();
          }
        });
    }
    openAddExtraDialoge():void {
        const dialogRef = this.dialog.open(AddExtraComponent, {
          height: '600px',
          width: '1000px',
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result !== undefined) {
            this.loadData();
          }
        });
    }
    loadData(){
      this.extraservices.getAll().subscribe({
      next:(data)=>{
        this.extras=data;
      },error:(err)=>{
        console.log(err);
      }
    });
    }
}
