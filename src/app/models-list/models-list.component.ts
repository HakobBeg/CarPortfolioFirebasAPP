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
  selectedModel: Model = {name: '', motor: -1, maxSpeed: -1, id: -1, markId: -1, carInfo: ''};

  constructor(private ms: MarkService) {
    this.dataSource = new MatTableDataSource<Model>();
  }

  deleteModel() {
    this.ms.deleteModel(this.selectedModel.markId, this.selectedModel.id);
  }

  ngOnInit(): void {
    this.ms.getModelsByMarkId(this.modelsID).subscribe(models => this.dataSource.data = models);
  }
}
