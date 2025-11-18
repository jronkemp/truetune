// app/test/page.tsx
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export default async function TestPage() {
  try {
    const docRef = doc(db, "users", "jronkemp@gmail.com")
    const docSnap = await getDoc(docRef)
    
    return (
      <pre>
        {JSON.stringify(
          { exists: docSnap.exists(), data: docSnap.data() },
          null,
          2
        )}
      </pre>
    )
  } catch (error: any) {
    return <pre>{error.message}</pre>
  }
}