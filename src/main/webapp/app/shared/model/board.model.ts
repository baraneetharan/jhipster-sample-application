import { INotice } from 'app/shared/model/notice.model';

export interface IBoard {
  id?: number;
  title?: string;
  noticeLists?: INotice[];
}

export class Board implements IBoard {
  constructor(public id?: number, public title?: string, public noticeLists?: INotice[]) {}
}
