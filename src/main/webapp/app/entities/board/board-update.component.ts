import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBoard, Board } from 'app/shared/model/board.model';
import { BoardService } from './board.service';
import { INotice } from 'app/shared/model/notice.model';
import { NoticeService } from 'app/entities/notice/notice.service';

@Component({
  selector: 'jhi-board-update',
  templateUrl: './board-update.component.html',
})
export class BoardUpdateComponent implements OnInit {
  isSaving = false;
  notices: INotice[] = [];

  editForm = this.fb.group({
    id: [],
    title: [],
    noticeList: [],
  });

  constructor(
    protected boardService: BoardService,
    protected noticeService: NoticeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ board }) => {
      this.updateForm(board);

      this.noticeService.query().subscribe((res: HttpResponse<INotice[]>) => (this.notices = res.body || []));
    });
  }

  updateForm(board: IBoard): void {
    this.editForm.patchValue({
      id: board.id,
      title: board.title,
      noticeList: board.noticeList,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const board = this.createFromForm();
    if (board.id !== undefined) {
      this.subscribeToSaveResponse(this.boardService.update(board));
    } else {
      this.subscribeToSaveResponse(this.boardService.create(board));
    }
  }

  private createFromForm(): IBoard {
    return {
      ...new Board(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      noticeList: this.editForm.get(['noticeList'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBoard>>): void {
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

  trackById(index: number, item: INotice): any {
    return item.id;
  }
}
