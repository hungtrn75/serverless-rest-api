import { ContactController } from "../ccntrollers";

export class ContactRoutes {
  private contactController: ContactController = new ContactController();
  public routes(app: any): void {
    app
      .route("/contacts")
      .get(this.contactController.getContacts)
      .post(this.contactController.postContacts);
    app
      .route("/contacts/:contactId")
      .put(this.contactController.updateContact)
      .delete(this.contactController.deleteContact)
      .get(this.contactController.getContact);
  }
}
