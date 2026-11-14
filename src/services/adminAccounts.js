import { deleteApp, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import app, { db } from "../firebase";

export const ADMINS_COLLECTION = "admins";

export const ADMIN_ROLES = [
  { value: "admin", label: "Admin" },
  { value: "super-admin", label: "Super admin" },
];

export const ADMIN_ROLE_LABELS = Object.fromEntries(
  ADMIN_ROLES.map(({ value, label }) => [value, label]),
);

export async function fetchAdminProfile(uid) {
  const snapshot = await getDoc(doc(db, ADMINS_COLLECTION, uid));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

const PASSWORD_ALPHABET =
  "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";
const PASSWORD_LENGTH = 12;

export function generatePassword() {
  const values = new Uint32Array(PASSWORD_LENGTH);
  crypto.getRandomValues(values);
  return Array.from(
    values,
    (value) => PASSWORD_ALPHABET[value % PASSWORD_ALPHABET.length],
  ).join("");
}

export async function registerAdmin({ name, email, role, password }) {
  const secondaryApp = initializeApp(
    app.options,
    `admin-registration-${Date.now()}`,
  );
  const secondaryAuth = getAuth(secondaryApp);
  let createdUser = null;

  try {
    const credential = await createUserWithEmailAndPassword(
      secondaryAuth,
      email,
      password,
    );
    createdUser = credential.user;

    await updateProfile(createdUser, { displayName: name.trim() });

    await setDoc(doc(db, ADMINS_COLLECTION, createdUser.uid), {
      uid: createdUser.uid,
      name: name.trim(),
      email: email.trim(),
      role,
      createdAt: serverTimestamp(),
    });

    return {
      uid: createdUser.uid,
      name: name.trim(),
      email: email.trim(),
      role,
    };
  } catch (error) {
    if (createdUser) {
      await deleteUser(createdUser).catch(() => {});
    }
    throw error;
  } finally {
    await signOut(secondaryAuth).catch(() => {});
    await deleteApp(secondaryApp).catch(() => {});
  }
}
