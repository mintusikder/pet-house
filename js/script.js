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

const displayCategoryWiseData = (pet) =>{
        
}

loadPetCategory();
loadCategoryWiseData("cat")