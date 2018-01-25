# API

Previous page: [Installation and Setup](https://github.com/Aaron-Sterling/extended-angular-firestore/blob/master/README.md)

## Create / Update

#### Create document
```createNewDocument<T>(ref: string, document: T): Promise<void>```

Creates a new document at Firestore reference ```ref```. If a document already exists at ```ref``` it makes no change to the database.

#### Update document
```updateExistingDocument<T>(ref: string, document: T): Promise<void>```

Updates existing document at Firestore reference ```ref```.  If no document exists at ```ref``` it makes no changes.

#### Create or Update document
```upsert<T>(ref: string, document: T): Promise<void>```

If no document exists at ```ref```, creates the document. Otherwise, updates the document at ```ref```.

## Delete

#### Delete document
```deleteDocument<T>(ref: string): Promise<void>```

Deletes the document at ```ref```.

## Existence check

```documentExists<T>(ref: string): Promise<boolean>```

Returns a Promise that resolves to true if a document exists in Firestore at reference ```ref```. Returns a promise that resolves to false otherwise.

## Download document

#### Download once
```downloadDocument<T>(ref: string): Promise<T>```

Downloads the document at reference ```ref```.

#### Download and listen for changes
```listenForChangesToDocument<T>(ref: string): Observable<T>```

Returns an Observable that emits the current state of the document.

## Collections

#### Download collection once
```downloadCollection<T>(ref: string): Promise<Array<T>>```

Downloads the collection at reference ```ref``` and stops listening to it.

#### Download collection and listen for changes
```listenForChangesToCollection<T>(ref: string): Observable<Array<T>>```

Returns an Observable that emits the current state of the collection.


Previous page: [Installation and Setup](https://github.com/Aaron-Sterling/extended-angular-firestore/blob/master/README.md)
