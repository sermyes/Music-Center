import { Video } from '../../service/youtube';

export const fakeVideo: Video = {
  kind: 'kind',
  etag: 'etag',
  id: '1',
  snippet: {
    publishedAt: '' + new Date(),
    channelId: '1',
    title: 'title',
    description: 'desc',
    thumbnails: {
      default: {},
      medium: {
        url: 'https://image/',
        width: 10,
        height: 10
      },
      high: {},
      standard: {},
      maxres: {}
    },
    channelTitle: 'channelTitle1',
    playlistId: '1',
    position: 123,
    resourceId: {
      kind: '1',
      videoId: '1'
    },
    videoOwnerChannelTitle: '',
    videoOwnerChannelId: ''
  }
};

export const fakeVideos: Video[] = [
  {
    kind: 'kind',
    etag: 'etag',
    id: '1',
    snippet: {
      publishedAt: '' + new Date(),
      channelId: '1',
      title: 'title',
      description: 'desc',
      thumbnails: {
        default: {},
        medium: {
          url: 'https://image/',
          width: 10,
          height: 10
        },
        high: {},
        standard: {},
        maxres: {}
      },
      channelTitle: 'channelTitle1',
      playlistId: '1',
      position: 123,
      resourceId: {
        kind: '1',
        videoId: '1'
      },
      videoOwnerChannelTitle: '',
      videoOwnerChannelId: ''
    }
  },
  {
    kind: 'kind',
    etag: 'etag',
    id: '2',
    snippet: {
      publishedAt: '' + new Date(),
      channelId: '2',
      title: 'title',
      description: 'desc',
      thumbnails: {
        default: {},
        medium: {
          url: 'https://image/',
          width: 10,
          height: 10
        },
        high: {},
        standard: {},
        maxres: {}
      },
      channelTitle: 'channelTitle2',
      playlistId: '2',
      position: 123,
      resourceId: {
        kind: '2',
        videoId: '2'
      },
      videoOwnerChannelTitle: '',
      videoOwnerChannelId: ''
    }
  },
  {
    kind: 'kind',
    etag: 'etag',
    id: '3',
    snippet: {
      publishedAt: '' + new Date(),
      channelId: '3',
      title: 'title',
      description: 'desc',
      thumbnails: {
        default: {},
        medium: {
          url: 'https://image/',
          width: 10,
          height: 10
        },
        high: {},
        standard: {},
        maxres: {}
      },
      channelTitle: 'channelTitle3',
      playlistId: '3',
      position: 123,
      resourceId: {
        kind: '3',
        videoId: '3'
      },
      videoOwnerChannelTitle: '',
      videoOwnerChannelId: ''
    }
  },
  {
    kind: 'kind',
    etag: 'etag',
    id: '4',
    snippet: {
      publishedAt: '' + new Date(),
      channelId: '4',
      title: 'title',
      description: 'desc',
      thumbnails: {
        default: {},
        medium: {
          url: 'https://image/',
          width: 10,
          height: 10
        },
        high: {},
        standard: {},
        maxres: {}
      },
      channelTitle: 'channelTitle',
      playlistId: '4',
      position: 123,
      resourceId: {
        kind: '4',
        videoId: '4'
      },
      videoOwnerChannelTitle: '',
      videoOwnerChannelId: ''
    }
  }
];
