import { Component, ViewChild, OnInit, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Core, WebViewerInstance } from '@pdftron/webviewer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('viewer') viewer: Element;
  wvInstance: WebViewerInstance;
  @Output() coreControlsEvent: EventEmitter<string> = new EventEmitter();

  private documentLoaded$: Subject<void>;

  constructor() {
    this.documentLoaded$ = new Subject<void>();
  }

  ngAfterViewInit(): void {

    Core.setWorkerPath('../lib/core');
    let documentViewer: Core.DocumentViewer;
    documentViewer = new Core.DocumentViewer();
    documentViewer.setScrollViewElement(document.getElementById('scrollView'));
    documentViewer.setViewerElement(document.getElementById('viewer'));
    documentViewer.setOptions({ enableAnnotations: false });
    documentViewer.loadDocument('/files/webview-demo-annotated.pdf');
    documentViewer.addEventListener('documentLoaded', () => {
      this.documentLoaded$.next();
    });

    // WebViewer({
    //   path: '../lib',
    //   initialDoc: '../files/webviewer-demo-annotated.pdf'
    // }, this.viewer.nativeElement).then(instance => {
    //   this.wvInstance = instance;
    //
    //
    //   // this.coreControlsEvent.emit(instance.UI.LayoutMode.Single);
    //   const { documentViewer } = instance.Core;
    //
    //   // instance.UI.openElements(['notesPanel']);

    // });
  }

  ngOnInit() {
  }

  getDocumentLoadedObservable() {
    return this.documentLoaded$.asObservable();
  }
}
