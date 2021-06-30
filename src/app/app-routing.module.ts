import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'native', 
    loadChildren: () => import('./maps/native/native.module').then(m => m.NativeModule)
  },
  {
    path: 'library', 
    loadChildren: () => import('./maps/library/library.module').then(m => m.LibraryModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
