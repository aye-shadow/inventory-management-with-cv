import { firestore } from "@/firebase";
import { getDocs, query, collection } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  const snapshot = query(collection(firestore, "inventory"));
  const docs = await getDocs(snapshot);
  const inventoryList = [];
  docs.forEach((doc) => {
    inventoryList.push({
      name: doc.id,
      ...doc.data(),
    });
  });

  return NextResponse.json({ inventoryList });
}
