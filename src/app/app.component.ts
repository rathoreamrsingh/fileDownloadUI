import { Component } from '@angular/core';
import { HttpService } from './shared/http.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], 
  providers: [HttpService]
})
export class AppComponent {
  title = 'app works!';
  constructor(private _httpService : HttpService) {}

  public downloadFile(){
    //alert("starting to download!!!");
    this._httpService.get();
  }
}
