import PubSub from '@aws-amplify/pubsub';
import config from "../../aws-exports";
import API, {graphqlOperation} from "@aws-amplify/api";

API.configure(config) ;            // Configure Amplify
PubSub.configure(config);

export const graphQLOperation = (operation, payload) => {
  return API.graphql(graphqlOperation(operation, payload));
};
