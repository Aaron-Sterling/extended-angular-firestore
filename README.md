# extended-angular-firestore
Lightweight extension of Angular Firestore. Provides a more intuitive API. Create, Update, Insert-or-Update (Upsert), Check for Existence, Download Once, Download and listen for changes.

1. [Installation](https://github.com/Aaron-Sterling/extended-angular-firestore/blob/master/README.md#installation)
2. [Sample Usage](https://github.com/Aaron-Sterling/extended-angular-firestore/blob/master/README.md#sample-usage)
3. [Design Concept](https://github.com/Aaron-Sterling/extended-angular-firestore/blob/master/README.md#design-concept)
4. [Setup](https://github.com/Aaron-Sterling/extended-angular-firestore/blob/master/README.md#setup)

Next page: [API](https://github.com/Aaron-Sterling/extended-angular-firestore/blob/master/docs/api.md)

## Installation

```npm install extended-angular-firestore --save```

## Sample Usage

```
import { ExtendedAngularFirestore } from 'extended-angular-firestore';

export class Example {
  
  constructor(eaf: ExtendedAngularFirestore) {
  
    const ref = 'reference string to Firestore database location';
    const doc: DocType = documentOfYourChoiceHere;
    
    eaf.createNewDocument<DocType>(ref, doc); // creates a new doc at reference ref
    eaf.updateExistingDocument<DocType>(ref, doc); // updates existing document with value doc
    eaf.upsert<DocType>(ref, doc); // updates the document if it exists
                                   // otherwise, creates a new document at reference ref
  }
}
```

## Design Concept

The goal of the API is to help the programmer manage Observable Subscriptions, so you only ask for exactly what you want. You can either ask to download a document or a collection exactly once, in which case you get back a Promise that resolves to the value of the document you are requesting.  Or you can listen to a document or a collection, in which case you get back an Observable you can subscribe to (and might have to unsubscribe from). This structure has helped me avoid annoying double-request errors where I failed to unsubscribe from a stream I hadn't realized I was still subscribed to.

This package also handles existence/nonexistence gracefully, which has been a weakness of both Firebase and Firestore in the past. To create or modify a document, simply use the Upsert method, which does the existence checking for you.

Finally, the API extension is lightweight -- about 100 lines of TypeScript and three RXJS operators (which AngularFire may already need).

## Setup

In ```app.module.ts```, import ExtendedAngularFirestoreModule, instead of AngularFireModue, as follows.

Delete this line:
```
AngularFireModule.initializeApp(FIREBASE_CONFIG);
```

Replace it with this line:
```
ExtendedAngularFirestoreModule.forRoot(FIREBASE_CONFIG);
```

In more complete context:
```
import { ExtendedAngularFirestoreModule } from 'extended-angular-firestore';
import { FirebaseAppConfig } from 'angularfire2';

const FIREBASE_CONFIG: FirebaseAppConfig = {
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>'
  }

@NgModule({
  declarations: [],
  imports: [
    ExtendedAngularFirestoreModule.forRoot(FIREBASE_CONFIG)
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
```

AngularFire2 is a peer dependency of ExtendedAngularFirestore, so if you use npm to install this library, angularfire2 will be available to import from as well.

Next page: [API](https://github.com/Aaron-Sterling/extended-angular-firestore/blob/master/docs/api.md)
