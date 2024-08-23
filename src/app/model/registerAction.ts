export interface RegisterAction {
  action: string;
  controlNumber: number;
  vipUrl?: string;
  qrCode?: string;
  message?: string;
  company?: any;
  dynoBuildId?: string;
}
