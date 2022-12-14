import { AxiosInstance } from 'axios';

export type Video = {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
};

type Snippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: ResourceId;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
};

type Thumbnails = {
  default: object;
  medium: {
    url: string;
    width: number;
    height: number;
  };
  high: object;
  standard: object;
  maxres: object;
};

type ResourceId = {
  kind: string;
  videoId: string;
};

class Youtube {
  constructor(private client: AxiosInstance) {}
  async playList(): Promise<Video[]> {
    const response = await this.client.get('playlistItems', {
      params: {
        part: 'snippet',
        playlistId: 'PL4fBVwST-63oKnpvGbt0Ok7Qkh3P22Plm',
        maxResults: 40
      }
    });

    return response.data.items;
  }
}

export default Youtube;
