// Extended Angular Firestore

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { switchMap, take } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class ExtendedAngularFirestore {
    constructor(private afs: AngularFirestore) {}


    // check whether document exists
    documentExists<T>(ref: string): Promise<boolean> {
        return this.documentExistsObs<T>(ref).toPromise();
    }

    private documentExistsObs<T>(ref: string): Observable<boolean> {
        return this.afs.doc<T>(ref).snapshotChanges()
                   .map(snap => snap.payload.exists);
    }

    // create new document
    createNewDocument<T>(ref: string, document: T): Promise<void> {
        return this.afs.doc<T>(ref).set(document);
    }

    // update existing document
    updateExistingDocument<T>(ref: string, document: T): Promise<void> {
        return this.afs.doc<T>(ref).update(document);
    }

    // add or update (upsert) a document
    upsert<T>(ref: string, document: T): Promise<void> {
        return this.documentExistsObs<T>(ref)
                   .pipe(switchMap (exists => {
                       if (exists) { return this.updateExistingDocument<T>(ref, document); } else {
                         return this.createNewDocument<T>(ref, document);
                        }
                   })).toPromise();
    }

    // delete a document
    deleteDocument<T>(ref: string): Promise<void> {
        return this.afs.doc<T>(ref).delete();
    }

    // download document once
    // returns Promise that resolves to null if document does not exist
    downloadDocument<T>(ref: string): Promise<T> {
        return this.documentExistsObs<T>(ref)
                   .pipe( switchMap(exists => {
                        if (exists) {
                            return this.afs.doc<T>(ref).valueChanges().pipe(take(1));
                        } else {
                            return Observable.of<T>(null);
                        }
                   })).toPromise<T>();
    }

    // listens to document
    listenForChangesToDocument<T>(ref: string): Observable<T> {
        return this.afs.doc<T>(ref).valueChanges();
    }

    // collections

    downloadCollection<T>(ref: string): Promise<Array<T>> {
        return this.afs.collection<T>(ref).valueChanges()
                                          .pipe(take(1)).toPromise();
    }

   listenForChangesToCollection<T>(ref: string): Observable<Array<T>> {
        return this.afs.collection<T>(ref).valueChanges();
    }
}
