const recipes = [
  {
    id: 1,
    name: "Limonade de Coco",
    servings: 1,
    ingredients:
      "Lait de coco : 400 ml, Jus de citron : 2, Crème de coco : 2 cuillères à soupe, Sucre : 30 grammes, Glaçons",
    time: 10,
    description:
      "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée",
    appliance: "Blender",
    ustensils: ["cuillère à Soupe", "verres", "presse citron"],
  },
  {
    id: 2,
    name: "Poisson Cru à la tahitienne",
    servings: 2,
    ingredients:
      "Thon Rouge (ou blanc) : 200 grammes, Concombre : 1, Tomate : 2, Carotte : 1, Citron Vert : 5, Lait de Coco : 100 ml",
    time: 60,
    description:
      "Découper le thon en dés, mettre dans un plat et recouvrir de jus de citron vert (mieux vaut prendre un plat large et peu profond). Laisser reposer au réfrigérateur au moins 2 heures. (Si possible faites-le le soir pour le lendemain. Après avoir laissé mariner le poisson, coupez le concombre en fines rondelles sans la peau et les tomates en prenant soin de retirer les pépins. Rayer la carotte. Ajouter les légumes au poissons avec le citron cette fois ci dans un Saladier. Ajouter le lait de coco. Pour ajouter un peu plus de saveur vous pouver ajouter 1 à 2 cuillères à soupe de Crème de coco",
    appliance: "Saladier",
    ustensils: ["presse citron"],
  },
  {
    id: 3,
    name: "Poulet coco réunionnais",
    servings: 4,
    ingredients:
      "Poulet : 1, Lait de coco: 400 ml, Coulis de tomate : 25 cl, Oignon : 1, Poivron rouge : 1, Huile d'olive : 1 cuillères à soupe",
    time: 80,
    description:
      "Découper le poulet en morceaux, les faire dorer dans une cocotte avec de l'huile d'olive. Salez et poivrez. Une fois doré, laisser cuire en ajoutant de l'eau. Au bout de 30 minutes, ajouter le coulis de tomate, le lait de coco ainsi que le poivron et l'oignon découpés en morceaux. Laisser cuisiner 30 minutes de plus. Servir avec du riz",
    appliance: "Cocotte",
    ustensils: ["couteau"],
  },
];

(async function () {
  const recipesCards = document.querySelector(".recipes-cards");
  const input = document.querySelector(".search-input");
  const ingredientInput = document.querySelector(".ingredients-input");
  const appareilInput = document.querySelector(".appareils-input");
  const ustensileInput = document.querySelector(".ustensiles-input");
  const ingredientUl = document.querySelector(".ul-ingredient");
  const appareiltUl = document.querySelector(".ul-appareil");
  const ustensileUl = document.querySelector(".ul-ustensile");
  let latch = false;
  const getData = function (array) {
    array.forEach((item) => {
      let div = document.createElement("div");
      let listIngredient = document.createElement("li");
      let listAppareil = document.createElement("li");
      let listUstensile = document.createElement("li");
      if (item.description.length > 90)
        item.description = item.description.substring(0, 100) + "...";
      if (item.ingredients.length > 50)
        item.ingredients = item.ingredients.substring(0, 100) + "...";
      div.innerHTML = `<div class="card">
      <div class="card-header">
      </div>
      <div class="card-content">
        <h3>${item.name}</h3>
        <div class="flex-time">
          <i class="fa-regular fa-clock"></i>
          <p class="card-time">${item.time} min</p>
        </div>
      </div>
      <div class="card-reveal">
        <p class="card-ingredients">${item.ingredients}</p>
        <p>${item.description}</p>
      </div>
    </div>`;
      recipesCards.appendChild(div);
      listIngredient.textContent = item.ingredients;
      ingredientUl.appendChild(listIngredient);
      listAppareil.textContent = item.appliance;
      appareiltUl.appendChild(listAppareil);
      listUstensile.textContent = item.ustensils;
      ustensileUl.appendChild(listUstensile);
    });
  };
  getData(recipes);

  input.addEventListener("input", function (e) {
    if (this.value.length > 2) {
      latch = false;
      recipesCards.innerHTML = "";
      const cloned = [...recipes];
      const filtered = cloned.filter((item) => {
        return (
          item.name.toLowerCase().includes(e.target.value.toLowerCase()) +
          item.ingredients
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) +
          item.description.toLowerCase().includes(e.target.value.toLowerCase())
        );
      });
      console.log(filtered);
      return getData(filtered);
    } else if (this.value.length < 3 && !latch) {
      latch = true;
      recipesCards.innerHTML = "";
      getData(recipes);
    }
  });

  //   display list filtre

  ingredientInput.addEventListener("click", displayIngredient);

  let ingredientList = document.querySelector(".list-ingredient");

  function displayIngredient() {
    if ((ingredientList.style.display = "none")) {
      ingredientList.style.display = "block";
    }
  }

  appareilInput.addEventListener("click", displayAppareil);

  let appareilList = document.querySelector(".list-appareil");

  function displayAppareil() {
    if ((appareilList.style.display = "none")) {
      appareilList.style.display = "block";
    }
  }

  ustensileInput.addEventListener("click", displayUstensile);

  let ustensileList = document.querySelector(".list-ustensile");

  function displayUstensile() {
    if ((ustensileList.style.display = "none")) {
      ustensileList.style.display = "block";
    }
  }

  ingredientInput.addEventListener("input", function (e) {
    if (this.value.length > 2) {
      latch = false;
      ingredientUl.innerHTML = "";
      const cloned = [...recipes];
      const filtered = cloned.filter((item) => {
        return item.ingredients
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      return getData(filtered);
    } else if (this.value.length < 3 && !latch) {
      latch = true;
      ingredientUl.innerHTML = "";
      getData(recipes);
    }
  });
})();
