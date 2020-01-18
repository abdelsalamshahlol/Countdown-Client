import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  constructor(private socket: Socket) {
  }

  // Users can join bidding on the product using its ID
  joinLiveBid(productId) {
    this.socket.emit('join', productId);
  }

  bidOnProduct(bidObj) {
    this.socket.emit('bid', bidObj);
  }

  handleBroadCast(cb) {
    this.socket.on('bid:broadcast', (broadcast) => {
      cb(broadcast);
    });
  }
}
