import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {of as observableOf} from 'rxjs';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MarkService} from '../../Services/mark.service';
import {MatDialog} from '@angular/material';
import {MarksHandlerComponent} from '../marks-handler/marks-handler.component';

/** File node data with possible child nodes. */
export interface FileNode {
  id?: number;
  name?: string;
  type: string;
  children?: FileNode[];
}

/**
 * Flattened tree node that has been created from a FileNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */
export interface FlatTreeNode {
  id: number;
  name: string;
  type: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'app-marks-list-tree',
  templateUrl: './marks-list-tree.component.html',
  styleUrls: ['./marks-list-tree.component.css'],
})
export class MarksListTreeComponent implements OnInit {

  showSpinner = true;

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<FileNode, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<FileNode, FlatTreeNode>;

  constructor(private ms: MarkService, private dialog: MatDialog) {

    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }


  openDialog(node?: FileNode): void {
    let dialogRef;
    if (node === undefined) {
      dialogRef = this.dialog.open(MarksHandlerComponent, {
        width: '25%',
        data: {action: 'Add new mark'}
      });
    } else {
      dialogRef = this.dialog.open(MarksHandlerComponent, {
        width: '25%',
        data: {action: 'Edit Mark', editable: node}
      });
    }

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      const newMarkNode = {
        id: (node) ? node.id : this.dataSource.data.slice(-1)[0].id + 1,
        type: 'folder',
        name: result,
        children: [{type: 'file', id: this.dataSource.data.slice(-1)[0].id + 1}]
      };
      if (!node) {
        this.ms.setMark({id: newMarkNode.id, name: newMarkNode.name, models: []});
      } else {
        this.ms.updateMarkName(node.id, result);
      }
    });
  }


  onMarkDelete(id: number) {
    this.ms.deleteMark(id);
  }

  /** Transform the data to something the tree can read. */
  transformer(node: FileNode, level: number) {
    return {
      name: node.name,
      type: node.type,
      level: level,
      expandable: !!node.children,
      id: node.id
    };
  }

  /** Get the level of the node */
  getLevel(node: FlatTreeNode) {
    return node.level;
  }

  /** Get whether the node is expanded or not. */
  isExpandable(node: FlatTreeNode) {
    return node.expandable;
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: FlatTreeNode) {
    return node.expandable;
  }

  /** Get the children for the node. */
  getChildren(node: FileNode) {
    return observableOf(node.children);
  }


  ngOnInit(): void {


    this.ms.getMarks().subscribe((marks) => {

      this.dataSource.data = marks.map((mark) => {
        return {
          id: mark.id,
          type: 'folder',
          name: mark.name,
          children: [{type: 'file', name: mark.id.toString()}]
        };
      });

      this.showSpinner = false;
    });

  }

}
