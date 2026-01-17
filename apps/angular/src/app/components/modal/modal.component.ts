import { Component } from '@angular/core';

@Component({
    selector: 'fsc-modal',
    standalone: false,
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
    title = 'modal title';
}
