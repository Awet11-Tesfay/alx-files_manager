import { MongoClient } from 'mongodb';

const Host = process.env.DB_HOST || 'localhost';
const Port = process.env.DB_PORT || 27017;
const Database = process.env.DB_DATABASE || 'files_manager';
const Urls = `mongodb://${Host}:${Port}`;

/**
 * DbClient class
 */
class DBClient {
    /**
     * Constructor that creates a client to mongodb
     */
  constructor() {
    MongoClient.connect(Urls, { useUnifiedTopology: true }, (error, client) => {
      if (!error) {
        this.db = client.db(Database);
        this.usersCollection = this.db.collection('users');
        this.filesCollection = this.db.collection('files');
      } else {
        console.log(error.message);
        this.db = false;
      }
    });
  }

  /**
   * Return true when the connection to redis is success
   */
  isAlive() {
    return Boolean(this.db);
  }

  /**
   * Returns the number of documents
   */
  async nbUsers() {
    const Users = this.usersCollection.countDocuments();
    return Users;
  }

  /**
   * Return the number of documents in collection files
   */
  async nbFiles() {
    const Files = this.filesCollection.countDocuments();
    return Files;
  }
}

const dbClient = new DBClient();
export default dbClient;
