import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { ContactRoutes } from "./routes";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);
admin.firestore().settings({ timestampsInSnapshots: true });

const app = express();

const contactRoutes = new ContactRoutes();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true }));

contactRoutes.routes(app);

export const webAPI = functions.https.onRequest(app);
