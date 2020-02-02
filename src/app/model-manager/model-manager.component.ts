import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Model} from '../../definitions';
import {MarkService} from '../../Services/mark.service';

@Component({
  selector: 'app-model-manager',
  templateUrl: './model-manager.component.html',
  styleUrls: ['./model-manager.component.css']
})
export class ModelManagerComponent implements OnInit {

  action: string;
  modelId: number;
  markId: number;
  model: Model = {name: '', motor: null, maxSpeed: null, carInfo: '', id: null, markId: null};


  constructor(private activeRout: ActivatedRoute, private router: Router, private ms: MarkService) {
  }

  onCancel() {
    this.router.navigate(['']);
  }

  onSave() {
    if (this.action === 'Edit') {
      this.ms.updateModel(this.model).then(() => this.onCancel());
    } else {
      this.ms.getModelsByMarkIdOnce(this.model.markId).then((snapshot) => {
        if (snapshot.val() !== null) {
          this.model.id = snapshot.val().slice(-1)[0].id + 1;
        } else {
          this.model.id = 0;
        }

        this.ms.addModel(this.model).then(() => this.onCancel());
      });


    }
  }

  ngOnInit() {
    if (this.activeRout.snapshot.params.markId && this.activeRout.snapshot.params.modelId) {
      this.action = 'Edit';
      this.markId = this.activeRout.snapshot.params.markId;
      this.modelId = this.activeRout.snapshot.params.modelId;
      this.ms.getModelFromMark(this.markId, this.modelId).then((snapshot) => {
        this.model = snapshot.val().models[this.markId];
      });
    } else {
      this.action = 'Add New';
      this.markId = this.activeRout.snapshot.params.markId;
      this.model.markId = this.markId;
    }

  }

}
