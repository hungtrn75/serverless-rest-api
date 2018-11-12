import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";

export class ContactController {
  private contactsCollection: any = admin.firestore().collection("contacts");
  public getContacts = async (req: Request, res: Response) => {
    try {
      this.contactsCollection.get().then(snapshot => {
        let data = [];
        snapshot.forEach(doc => {
          data = [...data, { id: doc.id, data: doc.data() }];
        });
        res.send(data);
      });
      // res.send(this.contacts);
    } catch (error) {
      res.status(404).send({ error });
    }
  };
  public postContacts = async (req: Request, res: Response) => {
    try {
      this.contactsCollection.doc().set(req.body);
      res.send("msg: Create a contact successful");
    } catch (error) {
      res.status(404).send({ error });
    }
  };

  public getContact = (req: Request, res: Response) => {
    try {
      this.contactsCollection
        .doc(req.params.contactId)
        .get()
        .then(doc => res.send({ id: doc.id, data: doc.data() }));
    } catch (error) {
      res.status(404).send({ error });
    }
  };

  public updateContact = (req: Request, res: Response) => {
    try {
      this.contactsCollection.doc(req.params.contactId).update(req.body);
      res.send("msg: Update successful");
    } catch (error) {
      res.status(404).send({ error });
    }
  };
  public deleteContact = (req: Request, res: Response) => {
    try {
      this.contactsCollection.doc(req.params.contactId).delete();
      res.send("msg: Delete contact successful");
    } catch (error) {
      res.status(404).send({ error });
    }
  };
}
