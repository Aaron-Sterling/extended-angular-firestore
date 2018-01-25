import { NgModule, ModuleWithProviders } from '@angular/core';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';

import { ExtendedAngularFirestore } from './extended-angular-firestore';

@NgModule({})
export class ExtendedAngularFirestoreModule {
    static forRoot(config: FirebaseAppConfig): ModuleWithProviders {
        @NgModule({
            imports: [ AngularFireModule.initializeApp(config) ]
        })
        class RootModule {}
        return {
            ngModule: RootModule,
            providers: [ ExtendedAngularFirestore ]
        };
    }
}
