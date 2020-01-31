import {Component, Input, OnInit} from '@angular/core';
import {Model} from '../../definitions';
import {MarkService} from '../../Services/mark.service';
import {MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.css']
})
export class ModelsListComponent implements OnInit {

  @Input() modelsID: number;
  displayedColumns: string[] = ['id', 'name', 'Max Speed', 'Motor', 'Car Info'];
  dataSource: MatTableDataSource<Model>;


  constructor(private ms: MarkService) {
    this.dataSource = new MatTableDataSource<Model>();
  }

  ngOnInit(): void {
    this.ms.getModelsByMarkId(this.modelsID).subscribe(models => this.dataSource.data = models);
  }
}
