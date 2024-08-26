import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";

import {QRCodeModule} from "angularx-qrcode";

import {RxStompService} from "../service/stomp/rx-stomp.service";

import {RegisterAction} from "../model/registerAction";


@Component({
  selector: 'app-instances-actions',
  standalone: true,
    imports: [
        NgIf,
        QRCodeModule
    ],
  templateUrl: './instances-actions.component.html',
  styleUrl: './instances-actions.component.scss'
})
export class InstancesActionsComponent implements OnInit {
  controlNumber = 900023;
  qrCode: string | undefined = undefined;

  constructor(private rxStompService: RxStompService) {
    this.rxStompService.watch(`/user/${this.controlNumber}/register`)
      .subscribe((event) => {
        const res: RegisterAction = JSON.parse(event.body)
        this.filterEvents(res)
      });
  }

  ngOnInit(): void {
    this.sendPing();
  }

  private sendPing() {
    setTimeout(() => {
      const registerAction: RegisterAction = {
        action: 'PING',
        controlNumber: this.controlNumber
      }

      this.rxStompService.publish({
        destination: '/wip/vip-register',
        body: JSON.stringify(registerAction)
      });
      this.sendPing();
    }, 30000);
  }

  filterEvents(event: RegisterAction) {
    switch (event.action) {
      case 'PONG':
        console.log("<<< PONG");
        break;
      case 'INFO':
        console.log("<<< INFO: ", event.company);
        break;
      case 'QR_CODE':
        console.log("<<< QR_CODE: ", event);
        this.qrCode = event.qrCode;
        break;
      case 'ERROR':
        console.log("<<< ERROR: ", event);
        break;
    }
  }

  executeActions(action: string) {
    const registerAction: RegisterAction = {
      action: action,
      controlNumber: this.controlNumber
    }

    console.log(`>>> ${action}`);

    this.rxStompService.publish({
      destination: '/wip/vip-register',
      body: JSON.stringify(registerAction)
    });
  }
}
