import { Component, Input, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core'; 
declare global {
  interface Window { YT: any; }
}
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class VideoPlayerComponent {
  private _youtubeUrl: string | null= '';
  @Input() set youtubeUrl(youtubeUrl: string | null) {
    this._youtubeUrl = youtubeUrl;
    this.fetchThumbnailAndVideoId();
  };

  public get youtubeUrl(){
    return this._youtubeUrl;
  }

  public videoId!: string;
  public thumbnailUrl!: string;
  @ViewChild('youtubePlayer') youtubePlayer!: ElementRef;
constructor(){}

fetchThumbnailAndVideoId() {
  const videoIdMatch = this.youtubeUrl?.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (videoIdMatch) {
    this.videoId = videoIdMatch[1];
    this.thumbnailUrl = `https://img.youtube.com/vi/${this.videoId}/0.jpg`;
  }
}

playVideo() {
  if (this.videoId) {
    // Load the YouTube Player API if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }

    // Wait until the API is ready
    
      if (this.videoId && window.YT) {
        new window.YT.Player(this.youtubePlayer.nativeElement, {
          videoId: this.videoId,
          events: {
            'onReady': (event: any) => {
              event.target.playVideo();
            }
          }
        });
  }
}
}
}
