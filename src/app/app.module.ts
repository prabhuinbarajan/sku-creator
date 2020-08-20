import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyModule } from "@ngx-formly/core/";
import { FormlyBootstrapModule } from "@ngx-formly/bootstrap/";
import { AgGridModule } from "ag-grid-angular";
import { PanelWrapperComponent } from "./panel.component";
import { AppComponent } from "./app.component";
import { GridTypeComponent } from "./grid.type";
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { AceEditorModule } from 'ng2-ace-editor';
import { GridFormlyCellComponent } from "./grid-formly-cell.component";
import { AngularSplitModule } from 'angular-split';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    NgxJsonViewerModule,
    AceEditorModule,
    AngularSplitModule.forRoot(),
    AgGridModule.withComponents([GridFormlyCellComponent]),
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      wrappers: [{ name: "panel", component: PanelWrapperComponent }]
    }),
    FormlyModule.forRoot({
      types: [
        {
          name: "grid",
          component: GridTypeComponent,
          defaultOptions: {
            templateOptions: {
              width: "100%",
              height: "400px"
            }
          }
        }
      ]
    })
  ],
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    GridTypeComponent,
    GridFormlyCellComponent,
    PanelWrapperComponent
  ]
})
export class AppModule {}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
