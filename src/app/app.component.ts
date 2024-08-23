import {Component, OnInit} from '@angular/core';

import {RxStompService} from "./service/stomp/rx-stomp.service";
import {RegisterAction} from "./model/registerAction";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Gerador de instâncias de WIP 2.0';
  controlNumber = 900024;
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
        console.log("<<< QR_CODE: ", event.qrCode);
        this.qrCode = event.qrCode;
        break;
      case 'ERROR':
        console.log("<<< ERROR: ", event);
        break;
    }
  }

  info() {
    const registerAction: RegisterAction = {
      action: 'INFO',
      controlNumber: this.controlNumber
    }

    console.log(">>> INFO");

    this.rxStompService.publish({
      destination: '/wip/vip-register',
      body: JSON.stringify(registerAction)
    });
  }

  start() {
    const registerAction: RegisterAction = {
      action: 'START',
      controlNumber: this.controlNumber
    }

    console.log(">>> START");

    this.rxStompService.publish({
      destination: '/wip/vip-register',
      body: JSON.stringify(registerAction)
    });
  }

  stop() {
    const registerAction: RegisterAction = {
      action: 'STOP',
      controlNumber: this.controlNumber
    }

    console.log(">>> STOP");

    this.rxStompService.publish({
      destination: '/wip/vip-register',
      body: JSON.stringify(registerAction)
    });
  }

  destroy() {
    const registerAction: RegisterAction = {
      action: 'DESTROY',
      controlNumber: this.controlNumber
    }

    console.log(">>> DESTROY");

    this.rxStompService.publish({
      destination: '/wip/vip-register',
      body: JSON.stringify(registerAction)
    });
  }
}
