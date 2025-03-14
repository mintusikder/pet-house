//load category
const loadPetCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await res.json();
  displayPetCategory(data.categories);
};
//display category
const displayPetCategory = (categories) => {
  const petContainer = document.getElementById("pet-container");
  categories.forEach((category) => {
    const petDiv = document.createElement("div");
    petDiv.innerHTML = `
    <button onclick="loadCategoryWiseData('${category.category}')" class="btn">${category.category}
    <img class="w-8" src="${category.category_icon}" alt="">
    </button>
    `;
    petContainer.appendChild(petDiv);
  });
};

//load category wise data
const loadCategoryWiseData = async (id) => {
  loaderShow("loading");
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${id}`
  );
  const data = await res.json();
  if (data.data) {
    displayCategoryWiseData(data.data);
    loaderHide("loading");
  }
};

const displayCategoryWiseData = (pets) => {
  const cardContainer = document.getElementById("card-container");
  if (pets.length === 0) {
    cardContainer.innerHTML = `
        <h2 class="text-center py-12 text-2xl font-bold col-span-full">Oops!! Sorry, There is no pet here</h2>
    `;
    return;
  }
  cardContainer.innerHTML = "";
  pets.forEach((pet) => {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
              <div class="card bg-base-100  shadow-sm">
  <figure>
    <img class ="h-[190px] w-full"
      src="${pet.image}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2  class="card-title">${pet.breed}</h2>
    <p>${pet.pet_details.slice(0, 100)}</p>
    <div class="card-actions ">
      <button class="btn select btn-primary">Add To Cart</button>
         <button onclick=loadPetDetails('${
           pet.petId
         }') class="btn btn-primary">Details</button>
    </div>
  </div>
</div>
          `;
    cardContainer.appendChild(cardDiv);
  });

  const allSelectBtn = document.getElementsByClassName("select");
  // console.log(allSelectBtn);
  for (const button of allSelectBtn) {
    button.addEventListener("click", (event) => {
      const title = event.target.parentNode.parentNode.childNodes[1].innerText;

      const titleContainer = document.getElementById("title-container");
      const titleDiv = document.createElement("div");
      titleDiv.innerHTML = `
      <li>${title}</li>
      `;
      titleContainer.appendChild(titleDiv);
      const previousCount = getItemValue("item");
      const sum = previousCount + 1;
      document.getElementById("item").innerText = sum;
    });
  }
};
// pet details
const loadPetDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await res.json();
  showPetDetails(data.petData);
};

const showPetDetails = async (details) => {
  console.log(details);
  document.getElementById("pet_details").showModal();
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
      <div class="card bg-base-100 image-full  shadow-sm">
  <figure>
    <img class ="object-cover"
      src="${details.image}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${details.breed}</h2>
    <p>${details.pet_details.slice(0, 100)}</p>
  </div>
</div>
      `;
};
// spinner show hide function
const loaderShow = (id) => {
  document.getElementById(id).style.display = "block";
};
const loaderHide = (id) => {
  document.getElementById(id).style.display = "none";
};

const getItemValue = (id) => {
  const element = document.getElementById(id).innerText;
  const convertValue = parseInt(element);
  return convertValue;
};

loadPetCategory();
loadCategoryWiseData("cat");
