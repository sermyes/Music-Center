import { Posts } from '../../service/post_respository';
export const fakePosts: Posts = {
  admin: {
    name: 'admin',
    psw: '123'
  },
  notice: {
    '1': {
      content: 'notice text',
      date: new Date().getDate(),
      key: '1',
      name: '1',
      psw: '1',
      type: 'notice'
    }
  },
  question: {
    '2': {
      content: 'question text',
      date: new Date().getDate(),
      key: '2',
      name: '2',
      psw: '2',
      type: 'question'
    }
  },
  post: {
    '3': {
      content: 'post text',
      date: new Date().getDate(),
      key: '3',
      name: '3',
      psw: '3',
      type: 'post'
    }
  }
};
