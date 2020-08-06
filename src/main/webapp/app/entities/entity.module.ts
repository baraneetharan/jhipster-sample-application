import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.JhipdemoProductModule),
      },
      {
        path: 'author',
        loadChildren: () => import('./author/author.module').then(m => m.JhipdemoAuthorModule),
      },
      {
        path: 'notice',
        loadChildren: () => import('./notice/notice.module').then(m => m.JhipdemoNoticeModule),
      },
      {
        path: 'owner',
        loadChildren: () => import('./owner/owner.module').then(m => m.JhipdemoOwnerModule),
      },
      {
        path: 'pet',
        loadChildren: () => import('./pet/pet.module').then(m => m.JhipdemoPetModule),
      },
      {
        path: 'board',
        loadChildren: () => import('./board/board.module').then(m => m.JhipdemoBoardModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class JhipdemoEntityModule {}
