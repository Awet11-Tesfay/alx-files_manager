import { MongoClient } from 'mongodb';

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;
const DATABASE = Process.env.DB_DATABASE || 'files_manager';
const URLS = `mongodb://${DB_HOST}:${DB_PORT}`;


class DBClient {
    constructor() {
        MongoClient.connect(URLS, { useUnifiedTopology: true}, (error, client) => {
            if (!error) {
                this.db = client.db(DATABASE);
                this.usersCollection = this.db.collection('users');
                this.filesCollection = this.db.collection('files');
            } else {
                console.log(error.message);
                this.db = false;
            }
        });
    }

    isAlive() {
        return Boolean(this.db);
    }

    async nbUsers() {
        const Users = this.filesCollection.countDocument();
        return Users;
    }

    async nbFiles() {
        const files = this.filesCollection.countDocument();
        return files;
    }
}

export const dbclient = new DBClient()
export default dbclient
