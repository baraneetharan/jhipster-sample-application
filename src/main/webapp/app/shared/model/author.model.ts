import { INotice } from 'app/shared/model/notice.model';

export interface IAuthor {
  id?: number;
  firstName?: string;
  lastName?: string;
  notice?: INotice;
}

export class Author implements IAuthor {
  constructor(public id?: number, public firstName?: string, public lastName?: string, public notice?: INotice) {}
}
