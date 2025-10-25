"use client"
import { useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "@/firebase/clientApp";
import Footer from "../components/ui/Footer";

export default function Home() {

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


  return  <div>
    <div>In the home</div>;
    <Footer></Footer>
  </div>
}
