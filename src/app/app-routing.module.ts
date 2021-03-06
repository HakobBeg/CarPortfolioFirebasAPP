import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MarksListTreeComponent} from './marks-list-tree/marks-list-tree.component';
import {ModelManagerComponent} from './model-manager/model-manager.component';


const routes: Routes = [
  {path: '', component: MarksListTreeComponent},
  {path: 'modelManage', component: ModelManagerComponent},
  {path: 'modelManage/:markId/:modelId', component: ModelManagerComponent},
  {path: 'modelManage/:markId', component: ModelManagerComponent},
  {path: '**', component: MarksListTreeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

