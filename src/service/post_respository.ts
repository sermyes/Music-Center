import { FirebaseApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  set,
  remove,
  onValue,
  off,
  Database
} from 'firebase/database';

type Posts = {
  admin: Admin;
  notice: Post;
  question: Post;
  post: Post;
};

export type Post = {
  [key in string]: PostData;
};

export type PostData = {
  content: string;
  date: number;
  key: string;
  name: string;
  psw: string;
  type: string;
};

export type Admin = {
  name: string;
  psw: string;
};

interface PostRespositoryImpl {
  getPost(onRead: ReadListener): void;
  savePost(post: Post, key: string): void;
  removePost(post: PostData): void;
}

type ReadListener = (posts: Posts) => void;

class PostRespository implements PostRespositoryImpl {
  private database: Database;
  constructor(private firebaseApp: FirebaseApp) {
    this.database = getDatabase(this.firebaseApp);
  }

  getPost(onRead: ReadListener) {
    const query = ref(this.database, `posts/`);

    onValue(query, (snapshot) => {
      const value = snapshot.val();
      value && onRead(value);
    });

    return () => off(query);
  }

  savePost(post: Post, key: string) {
    set(
      ref(this.database, `posts/${post[key].type}/${post[key].key}`),
      post[key]
    );
  }

  removePost(post: PostData) {
    remove(ref(this.database, `posts/${post.type}/${post.key}`));
  }
}
export default PostRespository;
