import {Component, OnInit} from '@angular/core';
import {MarkService} from '../Services/mark.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private ms: MarkService) {

  }


  ngOnInit(): void {


    // this.ms.getMarks().subscribe(x => console.log(x));

  }

}
