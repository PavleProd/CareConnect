import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClient) { }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  getExtension(fileName: string) {
    return fileName.substring(fileName.lastIndexOf('.') + 1)
  }

  isFileSelected(): boolean {
    return this.selectedFile != null
  }

  async isImageDimensionValid(): Promise<boolean> {
    const img = new Image();
    img.src = URL.createObjectURL(this.selectedFile);

    return new Promise<boolean>((resolve, reject) => {
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        URL.revokeObjectURL(img.src);

        if (width >= 100 && width <= 300 && height >= 100 && height <= 300) {
          resolve(true);
        } else {
          resolve(false);
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        resolve(false);
      };
    });
  }

  async isImageValid(): Promise<boolean> {
    let extention = this.getExtension(this.selectedFile.name)
    if (!(extention == 'jpg' || extention == 'png' || extention == 'jpeg')) {
      return false
    }

    return await this.isImageDimensionValid()
  }

  async onUpload(username: string): Promise<string> {
    const fd = new FormData();
    fd.append('username', username)
    fd.append('file', this.selectedFile, this.selectedFile.name)

    await this.httpClient.post(this.path + '/upload', fd).toPromise()

    // naziv fajla: username + ekstenzija
    return username + '.' + this.getExtension(this.selectedFile.name)
  }

  selectedFile: File = null;
  path: string = "http://localhost:4000/files"
}
