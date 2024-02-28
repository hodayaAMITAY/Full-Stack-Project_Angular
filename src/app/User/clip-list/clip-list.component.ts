import { Component, Input } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ClipDetails } from '../models/ClipDetails';

@Component({
  selector: 'app-clip-list',
  templateUrl: './clip-list.component.html',
  styleUrl: './clip-list.component.css'
})
export class ClipListComponent {
  //clips: Clip[] = [];
  @Input() Clips: ClipDetails[] | null = [];
  //newClip:ClipDetails;
  @Input() registerId: string | null= '';

  constructor(private clipService: ServiceService) { }

  public exportToXML(): void {
    const xmlData = this.clipsToXML();
    this.sendEmailWithAttachment(xmlData, 'clips.xml', 'text/xml');
    this.downloadFile(xmlData, 'clips.xml', 'application/xml');
  }

  public exportToJSON(): void {
    //function of json
    const jsonData = JSON.stringify(this.Clips);
    this.sendEmailWithAttachment(jsonData, 'clips.json', 'application/json');
    this.downloadFile(jsonData, 'clips.json', 'application/json');
  }

  public clipsToXML(): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<clips>\n';
    for (const clip of this.Clips ?? []) {
      xml += `<clip>\n<id>${clip.id}</id>\n<name>${clip.url}</name>\n</clip>\n`;
    }
    xml += '</clips>';
    return xml;
  }

  private sendEmailWithAttachment(data: string, filename: string, mimeType: string): void {
    // Simulate email sending
    console.log('Sending email with attachment...');
    console.log('Attachment data:', data);
    console.log('Attachment filename:', filename);
    console.log('Attachment MIME type:', mimeType);
    this.clipService.sendEmail( this.registerId ?? '',).subscribe(
      response => {
        console.log('Email sent successfully', response);
      },
      error => {
        console.error('Error sending email', error);
      }
    );
  }




  private downloadFile(data: string, filename: string, type: string): void {
    const blob = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    window.URL.revokeObjectURL(url);
  }
}
