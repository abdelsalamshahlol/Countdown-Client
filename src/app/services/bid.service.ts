import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  constructor(private socket: Socket) {
  }

  bidOnProduct(bid) {
    this.socket.emit('bid', bid);
  }
}
