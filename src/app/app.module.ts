import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CodemirrorModule } from 'ng2-codemirror';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

// PAGES
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';

// PIPES
import { KeysPipe } from './pipes/keys.pipe';
import { SortPipe } from './pipes/sort.pipe';

// COMPONENTS
import { ToastComponent } from './components/toast/toast.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tab/tab.component';
import { SidebarPaneComponent } from './components/sidebar-pane/sidebar-pane.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { AccordianComponent } from './components/accordian/accordian.component';
import { DatabasesComponent } from './pages/databases/databases.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    ToastComponent,
    ProjectListComponent,
    CodeEditorComponent,
    TabsComponent,
    TabComponent,
    SidebarPaneComponent,
    InputComponent,
    ButtonComponent,
    AccordianComponent,
    DatabasesComponent,
    KeysPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    CodemirrorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
