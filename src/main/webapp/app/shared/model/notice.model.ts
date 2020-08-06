import { IAuthor } from 'app/shared/model/author.model';
import { IBoard } from 'app/shared/model/board.model';

export interface INotice {
  id?: number;
  title?: string;
  description?: string;
  author?: IAuthor;
  board?: IBoard;
}

export class Notice implements INotice {
  constructor(public id?: number, public title?: string, public description?: string, public author?: IAuthor, public board?: IBoard) {}
}
