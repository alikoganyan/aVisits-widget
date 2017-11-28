import {Component} from '@angular/core';
// import {Subscription} from 'rxjs/Subscription';
// import {SwitcherService} from './services/switcher.service';


// import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  // start = 'button';
  // status = '';
  // startSubscription: Subscription;
  // statusSubscription: Subscription;
  // sub: Subscription;

  constructor() {
  }
/*

  onStart() {
    this.start = 'show';
    this.status = 'select_city';
  }

  ngOnInit() {
    this.startSubscription = this.switcherService.clickedStart.subscribe((start: string) => {
      this.start = start;
    });
    this.statusSubscription = this.switcherService.status.subscribe((status: string) => {
      this.status = status;
    });

    console.log(this.route.snapshot.params['widget']);

    this.sub = this.route.params.subscribe(params => {
      console.log(params['widget']);
    });


  }

  ngOnDestroy() {
    this.startSubscription.unsubscribe();
    this.statusSubscription.unsubscribe();
    this.sub.unsubscribe();
  }
*/

}
