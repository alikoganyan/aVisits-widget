import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../services/switcher.service';
import {ActivatedRoute} from '@angular/router';
import {SVariables} from '../../services/sVariables';
import {GetDataService} from '../../services/get-data.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit, OnDestroy {

  start = 'button';
  status = '';
  startSubscription: Subscription;
  statusSubscription: Subscription;
  subRoutId: Subscription;

  constructor(private switcherService: SwitcherService,
              private route: ActivatedRoute,
              private getDataService: GetDataService) {
  }

  onStart() {
    this.start = 'show';
    this.status = 'select_city';
  }

  ngOnInit() {
    this.getSubscriptions();
    this.getSettings();
  }

  getSubscriptions() {
    this.startSubscription = this.switcherService.clickedStart.subscribe((start: string) => {
      this.start = start;
    });
    this.statusSubscription = this.switcherService.status.subscribe((status: string) => {
      this.status = status;
    });
    this.subRoutId = this.route.params.subscribe(params => {
      const id = params['widget'];
      SVariables.chainId = +id.substr(1);
    });
  }


  getSettings() {
    this.getDataService.getSettings().subscribe(response => {
        console.log(response);
        this.getDataService.sendSettings().subscribe(res => {
          console.log(res);
        },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log('An error occurred:', err.error.message); // A client-side or network error occurred. Handle it accordingly.
            } else {
              console.log(`Backend returned code ${err.status}, body was: ${err.error}`); // The backend returned an unsuccessful response code.
            }
          });
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message); // A client-side or network error occurred. Handle it accordingly.
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`); // The backend returned an unsuccessful response code.
        }
      });
  }

  ngOnDestroy() {
    this.startSubscription.unsubscribe();
    this.statusSubscription.unsubscribe();
    this.subRoutId.unsubscribe();
  }


}
