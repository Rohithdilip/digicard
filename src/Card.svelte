<script>
  import {
    getFirestore,
    collection,
    getDocs,
    query,
    limit,
    where,
  } from "firebase/firestore/lite";

  import { getStorage, ref, getDownloadURL } from "firebase/storage";

  let logoURL,
    bizName,
    phone,
    whatsappnum,
    email,
    address,
    description,
    about,
    serviceList;

  async function getData() {
    var db = getFirestore();
    var card = getCardName();
    try {
      console.log("cards ref");
      const cardsRef = collection(db, "card");

      const q = query(cardsRef, where("cardName", "==", card), limit(1));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let biz = doc.data();

        bizName = biz.name;
        address = biz.address;
        description = biz.description;
        phone = biz.phone;
        email = biz.email;
        about = biz.about;
        whatsappnum = biz.whatsapp;
        serviceList = biz.services;
      });
    } catch (e) {
      console.log(`${getCardName()} ERRR ${e}`);
    }
  }
  getData();

  function getCardName() {
    var card_name = document.URL.split("/").pop().split("#")[0].split("?")[0];
    return card_name;
  }

  function logo() {
    var card_name = getCardName();
    const storage = getStorage();

    var logoRef = ref(storage, "card/" + card_name + "/logo.png");

    // @ts-ignore
    getDownloadURL(ref(storage, logoRef))
      .then((url) => {
        logoURL = url;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  logo();
</script>

<div class="container grid grid-cols-1 mx-auto px-5 py-6">
  <div class="">
    <img
      class="rounded-full border-2 border-black mx-auto max-h-28"
      src={logoURL}
      alt="logo"
    />
  </div>
  <br />
  <div class="mb-2">
    <h1 class="font-bold uppercase text-xl tracking-wide">
      {bizName}
    </h1>
  </div>
  <div class="mb-4">
    <p class="text-gray-700 font-bol tracking-wide text-lg">{description}</p>
  </div>

  <div class="row mb-5 my-2">
    <!-- phone number -->
    <button
      class="bg-blue-600 text-white py-4 min-w-full"
      on:click={() => {
        window.location.href = "tel:" + phone;
      }}
    >
      CALL
    </button>
  </div>
  <div class="row mb-3">
    <button
      class="bg-green-500 text-white py-4 min-w-full"
      on:click={() => {
        window.location.href = "https://wa.me/91" + whatsappnum;
      }}
    >
      WHATSAPP
    </button>
  </div>

  <div class="border-black border-dashed border-t-2 mt-5" />

  {#if serviceList}
    <div class="row tracking-wide mt-5">
      <h6 class="text-secondary font-bold mb-3">SERVICES</h6>
      <ol>
        {#each serviceList as service, index}
          <li>{++index}. {service}</li>
        {/each}
      </ol>
    </div>
  {/if}

  <div class="border-black border-dashed border-t-2 mt-5" />

  {#if about}
    <div class="row tracking-wider mt-5">
      <h6 class="text-secondary font-bold mb-3">ABOUT</h6>
      <p class="tracking-wider">{about}</p>
    </div>
  {/if}

  <div class="border-black border-dashed border-t-2 mt-5" />

  {#if address}
    <div class="row tracking-wider mt-5">
      <h6 class="text-secondary font-bold mb-3">CONTACT</h6>
      <div class="grid grid-cols-6">
        <span class="font-bold mb-2">Phone: </span>
        <div class="col-start-3 col-span-4">
          <span class="">{phone}</span>
        </div>
      </div>
      <div class="grid grid-cols-6 mb-2">
        <span class="font-bold">Email: </span>
        <div class="col-start-3 col-span-4">
          <span class="">{email}</span>
        </div>
      </div>
      <div class="grid grid-cols-6">
        <span class="font-bold">Address: </span>
        <div class="col-start-3 col-span-4">
          <span class="">{address}</span>
        </div>
      </div>
    </div>
  {/if}

  <div class="border-black border-dashed border-t-2 mt-5 mb-5" />
</div>

<style>
  .container {
    max-width: 700px;
  }
</style>
