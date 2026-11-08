import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const REQUESTS_COLLECTION = "involvementRequests";

export async function fetchInvolvementRequests() {
  const snapshot = await getDocs(
    query(collection(db, REQUESTS_COLLECTION), orderBy("createdAt", "desc")),
  );

  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}
