// lib/db.ts
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";

export async function getUserByEmail(email: string) {
  const userRef = doc(db, "users", email);  // Use email as doc ID
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return null;

  const data = userSnap.data();
  return {
    id: userSnap.id,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    hashedPassword: data.hashedPassword,
  };
}

// Optional: Create user (for signup page)
export async function createUser(email: string, password: string, name?: string) {
  const hashedPassword = bcrypt.hashSync(password, 12);
  // Use Firebase Admin SDK in a server action or API route
  // For now, manually add via Firebase Console
}