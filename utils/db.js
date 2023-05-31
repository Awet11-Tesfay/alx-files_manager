import { MongoClient } from 'mongodb';

const Host = process.env.DB_HOST || 'localhost';
const Port = process.env.DB_PORT || 27017;
const Database = process.env.DB_DATABASE || 'files_manager';
const Urls = `mongodb://${Host}:${Port}`;


class DBClient {
  constructor() {
    MongoClient.connect(Urls, { useUnifiedTopology: true }, (err, client) => {
      if (!err) {
        this.db = client.db(Database);
        this.usersCollection = this.db.collection('users');
        this.filesCollection = this.db.collection('files');
      } else {
        console.log(err.message);
        this.db = false;
      }
    });
  }

  isAlive() {
    return Boolean(this.db);
  }

  async nbUsers() {
    const Users = this.usersCollection.countDocuments();
    return Users;
  }

  async nbFiles() {
    const Files = this.filesCollection.countDocuments();
    return Files;
  }
}

const dbClient = new DBClient();
export default dbClient;
