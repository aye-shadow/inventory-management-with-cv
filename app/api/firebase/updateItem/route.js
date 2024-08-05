import { firestore } from "../../../../firebase.js";
import { collection, setDoc, doc, deleteDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  console.log(body);

  if (body.exists) {
    const docRef = doc(collection(firestore, "inventory"), body.itemName);
    // if item exists in array and
    if (body.newQuantity === 0) {
      // if new quantity == 0, remove from db
      await deleteDoc(docRef);
    } else {
      // else, update quantity
      await setDoc(docRef, { quantity: body.newQuantity });
    }
  } else {
    // else add new item to db
    await setDoc(doc(collection(firestore, "inventory"), body.itemName), {
      quantity: 1,
    });
  }

  return NextResponse.json({ response: "success" });
}
