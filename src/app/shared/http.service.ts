import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService {
    constructor(private _http: Http) { }

    theReturnOfGet() {
        console.log('get method being called');
        return this._http.post('http://localhost:8080/file/download2',{ responseType: ResponseContentType.Blob })
            .map((res: Response) => {
               return res; 
            })
            .subscribe(
                (data: any) => {
                    this.downloadFileOnceAgain(data);
                },
                err => console.log(err), // error
                () => console.log('getUserStatus Complete') // complete
            );
    }

    get() { 
        Observable.create(observer => {
            
                        let xhr = new XMLHttpRequest();
            
                        xhr.open('POST', 'http://localhost:8080/file/download2', true);
                        xhr.setRequestHeader('Content-type', 'application/json');
                        xhr.responseType='blob';
            
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4) {
                                if (xhr.status === 200) {
            
                                    var contentType = 'application/pdf';
                                    var blob = new Blob([xhr.response], { type: contentType });
                                    observer.next(blob);
                                    observer.complete();
                                } else {
                                    observer.error(xhr.response);
                                }
                            }
                        }
                        xhr.send();
            
                    }).subscribe(
                        (data: any) => {
                            this.theReturnOfDownloadFile(data);
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
        //console.log(array.toString());
        let blob = new Blob([(<any>data)._body], { type: 'application/pdf' });
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

    private downloadFileOnceAgain(data) {
        let blob = new Blob([(<any>data)._body], { type: 'application/pdf' });
        let anchor = document.createElement('a');
        anchor.download = 'test.pdf';

        let blobtest = new Blob([data._body], {
            type: data.headers.get("Content-Type")
        });
        let blobUrl = (window.URL).createObjectURL(data);
        
        anchor.href = blobUrl;
        anchor.click();
    }

    private theReturnOfDownloadFile(data) {
        var downloadUrl= URL.createObjectURL(data);
        let blobUrl = (window.URL).createObjectURL(data);
        let anchor = document.createElement('a');
        anchor.download = 'test.pdf';
        anchor.href = blobUrl;
        anchor.click();
        // window.open(downloadUrl);
    }
}