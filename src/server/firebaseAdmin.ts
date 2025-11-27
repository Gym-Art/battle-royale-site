import * as admin from 'firebase-admin';

let app: admin.app.App | null = null;

export function getAdminApp(): admin.app.App {
  if (!app) {
    if (admin.apps.length > 0) {
      app = admin.apps[0]!;
    } else {
      const projectId = process.env.FIREBASE_PROJECT_ID;
      const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
      const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

      if (!projectId || !clientEmail || !privateKey) {
        console.warn(
          '[Firebase] Missing credentials. Analytics and email signups will not be persisted.'
        );
        // Return a mock app for development without Firebase
        app = admin.initializeApp({
          projectId: 'demo-project',
        });
      } else {
        app = admin.initializeApp({
          credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey,
          }),
        });
      }
    }
  }
  return app;
}

export function getFirestore(): admin.firestore.Firestore {
  return getAdminApp().firestore();
}

