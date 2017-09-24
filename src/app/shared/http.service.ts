import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService {
    constructor(private _http: Http) { }

    get() {
        console.log('get method being called');
        return this._http.post('http://localhost:8080/file/download2', '', '')
            .map((res: Response) => {
               return res; 
            })
            .subscribe(
                (data: any) => {
                    this.downloadFile(data);
                },
                err => console.log(err), // error
                () => console.log('getUserStatus Complete') // complete
            );
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private downloadFile(data) {
        //data = atob(data);
        let array = new Uint8Array(data._body.length);

        for(let i = 0; i < data._body.length; i++){
            array[i] = data._body.charAt(i);
            //console.log(array[i]);
        }
        console.log(array.toString());
        let blob = new Blob([array], { type: 'application/pdf' });
        let anchor = document.createElement('a');
        anchor.download = 'test.pdf';

        let blobtest = new Blob([data._body], {
            type: data.headers.get("Content-Type")
        });
        let blobUrl = (window.URL).createObjectURL(blob);
        
        anchor.href = blobUrl;
        anchor.click();
        //let url= window.URL.createObjectURL(blob);
        
        //window.open(url);
    }
}