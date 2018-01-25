import { TestBed, inject } from '@angular/core/testing';

import { ExtendedAngularFirestoreService } from './extended-angular-firestore.service';

describe('ExtendedAngularFirestoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExtendedAngularFirestoreService]
    });
  });

  it('should be created', inject([ExtendedAngularFirestoreService], (service: ExtendedAngularFirestoreService) => {
    expect(service).toBeTruthy();
  }));
});
