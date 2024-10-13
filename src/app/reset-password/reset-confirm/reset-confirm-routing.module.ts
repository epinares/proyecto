import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetConfirmPage } from './reset-confirm.page';  // Importa tu página de confirmación

const routes: Routes = [
  {
    path: '',
    component: ResetConfirmPage  // Configura tu página como componente principal
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetConfirmPageRoutingModule {}
