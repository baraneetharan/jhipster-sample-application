import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { INotice, Notice } from 'app/shared/model/notice.model';
import { NoticeService } from './notice.service';
import { IAuthor } from 'app/shared/model/author.model';
import { AuthorService } from 'app/entities/author/author.service';
import { IBoard } from 'app/shared/model/board.model';
import { BoardService } from 'app/entities/board/board.service';

type SelectableEntity = IAuthor | IBoard;

@Component({
  selector: 'jhi-notice-update',
  templateUrl: './notice-update.component.html',
})
export class NoticeUpdateComponent implements OnInit {
  isSaving = false;
  authors: IAuthor[] = [];
  boards: IBoard[] = [];

  editForm = this.fb.group({
    id: [],
    title: [],
    description: [],
    author: [],
    board: [],
  });

  constructor(
    protected noticeService: NoticeService,
    protected authorService: AuthorService,
    protected boardService: BoardService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ notice }) => {
      this.updateForm(notice);

      this.authorService.query().subscribe((res: HttpResponse<IAuthor[]>) => (this.authors = res.body || []));

      this.boardService.query().subscribe((res: HttpResponse<IBoard[]>) => (this.boards = res.body || []));
    });
  }

  updateForm(notice: INotice): void {
    this.editForm.patchValue({
      id: notice.id,
      title: notice.title,
      description: notice.description,
      author: notice.author,
      board: notice.board,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const notice = this.createFromForm();
    if (notice.id !== undefined) {
      this.subscribeToSaveResponse(this.noticeService.update(notice));
    } else {
      this.subscribeToSaveResponse(this.noticeService.create(notice));
    }
  }

  private createFromForm(): INotice {
    return {
      ...new Notice(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
      author: this.editForm.get(['author'])!.value,
      board: this.editForm.get(['board'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INotice>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
