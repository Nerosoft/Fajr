import { Component, TemplateRef,OnInit } from '@angular/core';
import {ToastService} from './toast-service';
@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  host: {'[class.ngb-toasts]': 'true'},
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent implements OnInit {

  constructor(public toastService: ToastService) {}

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }

  ngOnInit() {
  }

}
