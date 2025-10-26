import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { getAuth } from 'firebase-admin/auth';

export function getFirebaseAdmin() {
  console.log("process process.env.FIREBASE_ADMIN_ENV ", process.env.FIREBASE_ADMIN_ENV);
  console.log("process.env.ADMIN_PROJECT_ID is ..", process.env.ADMIN_PROJECT_ID);
  console.log("🧪 getApps() length:", getApps().length);

  const adminEnv = JSON.parse(process.env.FIREBASE_ADMIN_ENV as string);
  

  let app;
  try {
    if (getApps().length === 0) {
      console.log("🚀 Initializing new Firebase Admin app...");
      app = initializeApp({
        credential: cert({
          projectId: adminEnv.ADMIN_PROJECT_ID!,
          clientEmail: adminEnv.ADMIN_CLIENT_EMAIL!,
          privateKey: adminEnv.ADMIN_PRIVATE_KEY!.replace(/\\n/g, '\n'),
        }),
        databaseURL: adminEnv.ADMIN_DATABASE_URL!,
      });
    } else {
      try {
        console.log("🔁 Reusing existing Firebase Admin app...");
        app = getApp();
      } catch (getAppError) {
        console.warn("⚠️ getApp() failed despite getApps().length > 0 — reinitializing...");
        app = initializeApp({
          credential: cert({
            projectId: adminEnv.ADMIN_PROJECT_ID!,
            clientEmail: adminEnv.ADMIN_CLIENT_EMAIL!,
            privateKey: adminEnv.ADMIN_PRIVATE_KEY!.replace(/\\n/g, '\n'),
          }),
          databaseURL: adminEnv.ADMIN_DATABASE_URL!,
        });
      }
    }

    console.log("✅ Firebase Admin ready");
  } catch (err) {
    console.error("❌ Firebase Admin initialization failed:", err);
    throw err;
  }

  return {
    firebaseAdminApp: app,
    firebaseAuth: getAuth(app),
    firebaseDB: getDatabase(app),
  };
}
