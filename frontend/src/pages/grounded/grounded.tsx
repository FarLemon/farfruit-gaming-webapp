import { onMount, Component, For } from 'solid-js';
import { createStore } from 'solid-js/store'
import "./styles/_grounded.scss";
import CreatureCard from './components/CreatureCard';



import firebase from "@/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
const dataBase = getFirestore(firebase);



const snapshot = await getDocs(collection(dataBase, "grounded-creatures"));
const creatures = snapshot.docs.map(doc => doc.data());



const Grounded: Component = () => {
  const [images, setImages] = createStore({
    groundedBackground: "https://firebasestorage.googleapis.com/v0/b/farfruit-gaming.appspot.com/o/grounded%2Fgrounded-background.jpg?alt=media&token=0697d904-f765-4acf-b47a-031d224b1541",
    damageTypeIcons: {
      generic: "https://firebasestorage.googleapis.com/v0/b/farfruit-gaming.appspot.com/o/grounded%2Fdamage-type-icons%2Fgeneric.webp?alt=media&token=ceda4ae9-fe7e-4a39-bdc3-6bb525d01fd8",
      slashing: "https://firebasestorage.googleapis.com/v0/b/farfruit-gaming.appspot.com/o/grounded%2Fdamage-type-icons%2Fslashing.webp?alt=media&token=ee11994f-6072-441b-95a1-81ebc885e340",
      stabbing: "https://firebasestorage.googleapis.com/v0/b/farfruit-gaming.appspot.com/o/grounded%2Fdamage-type-icons%2Fstabbing.webp?alt=media&token=4b131608-b0f2-4002-b3b6-b3de7fcbbdc0",
      chopping: "https://firebasestorage.googleapis.com/v0/b/farfruit-gaming.appspot.com/o/grounded%2Fdamage-type-icons%2Fchopping.webp?alt=media&token=d6f1b606-2018-41c7-8065-4fde23d918c8",
      busting: "https://firebasestorage.googleapis.com/v0/b/farfruit-gaming.appspot.com/o/grounded%2Fdamage-type-icons%2Fbusting.webp?alt=media&token=859e8c8e-a1f1-49f7-835a-502ff149863b",
      fresh: "https://firebasestorage.googleapis.com/v0/b/farfruit-gaming.appspot.com/o/grounded%2Fdamage-type-icons%2Ffresh.webp?alt=media&token=e739b93f-3749-420d-9a7a-0a95ca633c66",
      spicy: "https://firebasestorage.googleapis.com/v0/b/farfruit-gaming.appspot.com/o/grounded%2Fdamage-type-icons%2Fspicy.webp?alt=media&token=96e4e836-d2fd-49e2-97c5-f604c72056c4",
      salty: "https://firebasestorage.googleapis.com/v0/b/farfruit-gaming.appspot.com/o/grounded%2Fdamage-type-icons%2Fsalty.webp?alt=media&token=b9ed2d08-563e-4876-822b-54a0b59be875",
      sour: "https://firebasestorage.googleapis.com/v0/b/farfruit-gaming.appspot.com/o/grounded%2Fdamage-type-icons%2Fsour.webp?alt=media&token=e7beb502-e91f-4ae5-8f85-7c0a8a09bdfb",
      explosive: "https://firebasestorage.googleapis.com/v0/b/farfruit-gaming.appspot.com/o/grounded%2Fdamage-type-icons%2Fexplosive.webp?alt=media&token=0fac4b97-3d48-4c07-91f7-5598d50fba15",
      bleed: "https://firebasestorage.googleapis.com/v0/b/farfruit-gaming.appspot.com/o/grounded%2Fdamage-type-icons%2Fbleed.webp?alt=media&token=aa9fbc3a-5d73-4d9f-94b9-968659722cce",
      gas: "https://firebasestorage.googleapis.com/v0/b/farfruit-gaming.appspot.com/o/grounded%2Fdamage-type-icons%2Fgas.webp?alt=media&token=e5fb8cea-e4c7-432f-8bc3-a43270d3d3e8",
      poison: "https://firebasestorage.googleapis.com/v0/b/farfruit-gaming.appspot.com/o/grounded%2Fdamage-type-icons%2Fpoison.webp?alt=media&token=3533c860-5638-41b4-8ef1-3afd631a6e03",
      venom: "https://firebasestorage.googleapis.com/v0/b/farfruit-gaming.appspot.com/o/grounded%2Fdamage-type-icons%2Fvenom.webp?alt=media&token=149d8450-5f74-46b2-92f4-6f1b65627ea5"
    }
  });



  return (
    <div class="grounded" style={{
      "background-image": `url(${images.groundedBackground})`,
      "background-size": "cover",
      "background-repeat": "no-repeat",
      "background-attachment": "fixed",
      "background-position": "center"
    }}>
        <header>
          <h1>Grounded</h1>
        </header>

        <section class="content">
          <For each={creatures}>
            {(creature) =>
              // @ts-ignore: Knowingly passing data
              <CreatureCard creature={creature} imageURLs={images.damageTypeIcons}/>
            }
          </For>
        </section>
    </div>
  );
};
export default Grounded;