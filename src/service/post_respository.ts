import { FirebaseApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';

class PostRespository {
  private database: Database;
  constructor(private firebaseApp: FirebaseApp) {
    this.database = getDatabase(this.firebaseApp);
  }
}
export default PostRespository;
