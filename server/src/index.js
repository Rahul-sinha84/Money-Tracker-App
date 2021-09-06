import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors'
const PORT = 9000;
import { typeDefs } from './graphql/typedefs';
import { resolvers } from './graphql/resolvers';


(async () => {
    const app = express();
    app.use(cors());
    await mongoose.connect('mongodb://localhost/money_management', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    await mongoose.connection.once('open', () => console.log("DB is connected..."));
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });
    server.applyMiddleware({ app });
    app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}/graphql`));
})();
