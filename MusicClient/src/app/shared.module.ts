import { NgModule } from '@angular/core';

import {MatCommonModule} from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';


import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [
        MatCommonModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        HttpClientModule,
        MatListModule,
        MatSelectModule
    ],
    providers: [],
    bootstrap: [],
    exports: [
        MatCommonModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        HttpClientModule,
        MatListModule,
        MatSelectModule
    ]
  })
  export class SharedModule { }
  