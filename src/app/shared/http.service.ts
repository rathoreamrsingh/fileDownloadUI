import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { saveAs } from 'file-saver/FileSaver';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService {
    private getDownloadLink: string = 'http://localhost:8080/file/downloadViaGet';
    private postDownloadLink: string = 'http://localhost:8080/file/downloadViaPost';
    private largeFilePostDownloadLink: string = 'http://localhost:8080/file/download';
    private downloadContentType: string = 'application/pdf';
    private largeFileDownloadContentType: string = 'video/x-matroska';
    constructor(private _http: Http) { }

    downloadViaGet() {
        this._http.get(this.getDownloadLink, { responseType: ResponseContentType.Blob })
            .toPromise()
            .then(response => this.saveToFileSystem(response));
    }

    downloadViaFaultyPost() {
        this._http.post(this.postDownloadLink, { responseType: ResponseContentType.Blob })
            .toPromise()
            .then(response =>
                this.saveToFileSystem(response)
            );
    }

    private saveToFileSystem(response) {
        const blob = new Blob([response._body], { type: this.downloadContentType });
        saveAs(blob, 'a.pdf');
    }

    downloadViaTheReturnOfPost() {
        Observable.create(observer => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.postDownloadLink, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.responseType = 'blob';
            let that = this;
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {

                        var contentType = that.downloadContentType;
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
                this.andHereComesTheSaviourOfPost(data);
            },
            err => console.log(err), // error
            () => console.log('getUserStatus Complete') // complete
            );
    }

    private andHereComesTheSaviourOfPost(data) {
        var downloadUrl = URL.createObjectURL(data);
        let blobUrl = (window.URL).createObjectURL(data);
        let anchor = document.createElement('a');
        anchor.download = 'test.pdf';
        anchor.href = blobUrl;
        anchor.click();
    }


    downloadWithTheUltimatePostWithSave() {
        Observable.create(observer => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.postDownloadLink, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.responseType = 'blob';
            let that = this;
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {

                        var contentType = that.downloadContentType;
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
                this.theUltimateSaviourOfPost(data);
            },
            err => console.log(err), // error
            () => console.log('getUserStatus Complete') // complete
            );
    }


    private theUltimateSaviourOfPost(response) {
        const blob = new Blob([response], { type: this.downloadContentType });
        saveAs(blob, 'a.pdf');
    }

    andHereComesTheUltimateStressTest() {
        Observable.create(observer => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.largeFilePostDownloadLink, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.responseType = 'blob';
            let that = this;
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {

                        var contentType = that.largeFileDownloadContentType;
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
                this.andTheSaviorOfUltimateStressTest(data);
            },
            err => console.log(err), // error
            () => console.log('getUserStatus Complete') // complete
            );
    }

    private andTheSaviorOfUltimateStressTest(data) {
        var downloadUrl = URL.createObjectURL(data);
        let blobUrl = (window.URL).createObjectURL(data);
        let anchor = document.createElement('a');
        anchor.download = 'The_boss_baby.mkv';
        anchor.href = blobUrl;
        anchor.click();
    }

}