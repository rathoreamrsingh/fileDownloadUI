import { Component } from '@angular/core';
import { HttpService } from './shared/http.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})
export class AppComponent {
  title = 'Testing File Download!!!';
  constructor(private _httpService: HttpService) { }

  public downloadFileViaGet() {
    this._httpService.downloadViaGet();
  }

  public downloadViaPost() {
    this._httpService.downloadViaFaultyPost();
  }

  public downloadViaTheReturnOfPost() {
    this._httpService.downloadViaTheReturnOfPost();
  }

  public downloadWithTheUltimatePostWithSave() {
    this._httpService.downloadWithTheUltimatePostWithSave();
  }

  public andHereComesTheUltimateStressTest() {
    this._httpService.andHereComesTheUltimateStressTest();
  }
}
