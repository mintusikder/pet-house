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
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${id}`
  );
  const data = await res.json();
  displayCategoryWiseData(data.data);
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
      <button class="btn btn-primary">Add To Cart</button>
         <button class="btn btn-primary">Details</button>
    </div>
  </div>
</div>
          `;
    cardContainer.appendChild(cardDiv);
  });
};

loadPetCategory();
loadCategoryWiseData("cat");
