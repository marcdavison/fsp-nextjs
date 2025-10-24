"use client"
import { useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "@/firebase/clientApp";


export default function Dashboard() {

  useEffect(() => {
  // const db = getDatabase();
  console.log('in the useEffect and data')
  const dataRef = ref(db, 'fixtures');

  const unsubscribe = onValue(dataRef, (snapshot) => {
    const value = snapshot.val();
    console.log('setData .. ', value);
  });

  // Optional cleanup
  return () => unsubscribe();
}, []);


  return <div>In the dashbaord</div>;
}
