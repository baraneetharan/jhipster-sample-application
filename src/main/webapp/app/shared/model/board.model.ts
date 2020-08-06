import { INotice } from 'app/shared/model/notice.model';

export interface IBoard {
  id?: number;
  title?: string;
  noticeList?: INotice;
}

export class Board implements IBoard {
  constructor(public id?: number, public title?: string, public noticeList?: INotice) {}
}
