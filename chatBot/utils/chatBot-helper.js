
import dialogflow from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */

export function newUUID() {
    return uuidv4();
}
//const projectId = 'coffee-shop-exercise1-kowi';
export async function runSample(uuid, message="", projectId = "bankaccountbot-whot") {
    // A unique identifier for the given session
    //const sessionId = uuidv4();
    const sessionId = uuid;
    console.log("ID" + sessionId);

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.projectAgentSessionPath(
        projectId,
        sessionId
    );
    console.log("PATH " + sessionPath);

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: message,
                // The language used by the client (en-US)
                languageCode: 'en-US',
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    console.log(`  Messages: ${result.fulfillmentMessages}`);
    if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
    } else {
        console.log('  No intent matched.');
    }
    return result;
}


