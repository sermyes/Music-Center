import { AxiosInstance } from 'axios';

class Youtube {
  constructor(private client: AxiosInstance) {}
  async playList() {
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
