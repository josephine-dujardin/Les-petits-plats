/* eslint-disable no-undef */

(async function () {
  // Défini l'affichage des ingrédients dans les cards
  const ingredientsDisplay = (elems) => {
    let res = "";
    for (const elem of elems) {
      res += `<strong>${elem.ingredient}</strong> : ${elem.quantity || ""} ${
        elem.unit || ""
      }</br>`;
    }
    return res;
  };

  // Crée et ajoute les tags
  const addTag = (value, color) => {
    filters.tags.push(value);
    const span = document.createElement("span");
    const tags = document.getElementById("span-tag");
    span.id = "tag";
    span.className = `fa-regular fa-circle-xmark bg-${color}`;
    span.textContent = value;
    tags.appendChild(span);
    span.addEventListener("click", (e) => {
      const value = e.target.innerHTML;
      const index = filters.tags.findIndex((tag) => tag === value);
      filters.tags.splice(index, 1);

      span.remove();
      filterTagInput(filters.input);
      filterVue();
    });

    filterVue();
  };

  const displayList = (elems, typeIndex) => {
    let color, ul;
    switch (typeIndex) {
      case 0: // ingredient
        ul = ingredientUl;
        color = "blue";
        break;
      case 1: // appareils
        ul = appareilUl;
        color = "green";
        break;
      case 2: // ustensiles
        ul = ustensileUl;
        color = "orange";
        break;
    }

    elems = [...new Set(elems)];
    elems.sort();
    for (const item of elems) {
      const newLi = document.createElement("li");
      newLi.textContent = item;
      ul.appendChild(newLi);

      newLi.addEventListener(
        "click",
        function () {
          const lowerCaseIng = item.toLowerCase();
          addTag(lowerCaseIng, color);
        },
        { once: true }
      );
    }
  };

  const recipesCards = document.querySelector(".recipes-cards");
  const input = document.querySelector(".search-input");
  const ingredientInput = document.querySelector(".ingredients-input");
  const appareilInput = document.querySelector(".appareils-input");
  const ustensileInput = document.querySelector(".ustensiles-input");
  const ingredientUl = document.querySelector(".ul-ingredient");
  const appareilUl = document.querySelector(".ul-appareil");
  const ustensileUl = document.querySelector(".ul-ustensile");
  const lists = {
    ingredients: [],
    ustensils: [],
    appareils: [],
  };
  const filters = {
    input: "",
    tags: [],
  };
  let latch = false;

  // Crée et affiche les cards
  const getData = function (array) {
    for (const item of array) {
      let div = document.createElement("div");
      div.innerHTML = `<div class="card">
          <div class="card-header">
          </div>
          <div class="card-content">
            <h3 class="card-title">${item.name}</h3>
            <div class="flex-time">
              <i class="fa-regular fa-clock"></i>
              <p class="card-time">${item.time} min</p>
            </div>
          </div>
          <div class="card-reveal">
            <p class="card-ingredients">${ingredientsDisplay(
              item.ingredients
            )}</p>
            <p class="card-description">${item.description}</p>
          </div>
        </div>`;
      recipesCards.appendChild(div);

      // Affiche les ingrédients dans les cards
      const mappedIng = [];
      for (const { ingredient } of item.ingredients) {
        mappedIng.push(ingredient.toLowerCase());
      }
      lists.ingredients = [...lists.ingredients, ...mappedIng];

      // Rempli les ustensils dans lists
      const mappedUs = [];
      for (const u of item.ustensils) {
        mappedUs.push(u.toLowerCase());
      }
      lists.ustensils.push(...mappedUs);

      // Rempli les appareils dans lists
      lists.appareils.push(item.appliance.toLowerCase());
    }
  };

  getData(recipes);
  displayList(lists.ingredients, 0);
  displayList(lists.appareils, 1);
  displayList(lists.ustensils, 2);

  // Filtre les recettes dans la searchbar et les tags
  const filterVue = () => {
    recipesCards.innerHTML = "";
    const filterRecipe = (recipe, filter) => {
      let ing = "";
      for (const elem of recipe.ingredients) {
        ing += `${elem.ingredient} ${elem.quantity || ""} ${elem.unit || ""}`;
      }
      return (
        recipe.name.toLowerCase().includes(filter) +
        ing.toLowerCase().includes(filter) +
        recipe.description.toLowerCase().includes(filter) +
        recipe.appliance.toLowerCase().includes(filter) +
        recipe.ustensils.join(" ").toLowerCase().includes(filter)
      );
    };

    const filtered = recipes.filter((item) => {
      const searchFilter = filterRecipe(item, filters.input);
      const tagsFilter = filters.tags.map((tag) => {
        return filterRecipe(item, tag);
      });
      let res = searchFilter;
      tagsFilter.forEach((t) => {
        res = res && t;
      });
      return res;
    });
    getData(filtered);
  };

  // Affiche un message d'erreur si la valeur entrée dans la searchbar ne correspond à une aucuns éléments dans les cards
  input.addEventListener("input", function (e) {
    filters.input = e.target.value.toLowerCase();
    if (this.value.length >= 3) {
      latch = false;
      filterVue();
      // Relie la searchbar principale à celle des tags

      filterTagInput(e.target.value.toLowerCase());

      filterTagInput(e.target.value.toLowerCase());

      filterTagInput(e.target.value.toLowerCase());

      const notFound = document.getElementById("not-found-div");
      if (recipesCards.innerHTML === "") {
        notFound.style.display = "block";
      } else {
        notFound.style.display = "none";
      }
    } else if (this.value.length <= 3 && !latch) {
      latch = true;
      recipesCards.innerHTML = "";
      ingredientUl.innerHTML = "";
      appareilUl.innerHTML = "";
      ustensileUl.innerHTML = "";
      getData(recipes);
      displayList(lists.ingredients, 0);
      displayList(lists.appareils, 1);
      displayList(lists.ustensils, 2);
    }
  });

  const toggleListTags = (list, angleDown, angleUp) => {
    if (list.style.display === "none") {
      list.style.display = "grid";
      angleDown.style.display = "none";
      angleUp.style.display = "block";
    } else {
      list.style.display = "none";
      angleDown.style.display = "block";
      angleUp.style.display = "none";
    }
  };

  // Affiche la liste des ingrédients dans le tag
  const ingredientList = document.querySelector(".list-ingredient");
  const angleDownIng = document.querySelector(".angle-down-ing");
  const angleUpIng = document.querySelector(".angle-up-ing");
  ingredientInput.addEventListener("click", function () {
    toggleListTags(ingredientList, angleDownIng, angleUpIng);
  });

  const appareilList = document.querySelector(".list-appareil");
  const angleDownApp = document.querySelector(".angle-down-app");
  const angleUpApp = document.querySelector(".angle-up-app");
  // Affiche la liste des appareils dans le tag
  appareilInput.addEventListener("click", function () {
    toggleListTags(appareilList, angleDownApp, angleUpApp);
  });

  const ustensileList = document.querySelector(".list-ustensile");
  const angleDownUs = document.querySelector(".angle-down-us");
  const angleUpUs = document.querySelector(".angle-up-us");
  // Affiche la liste des ustensils dans le tag
  ustensileInput.addEventListener("click", function () {
    toggleListTags(ustensileList, angleDownUs, angleUpUs);
  });

  const filterTagInput = (searchValue) => {
    if (searchValue.length > 2) {
      latch = false;
      ingredientUl.innerHTML = "";
      appareilUl.innerHTML = "";
      ustensileUl.innerHTML = "";

      const filteredIng = [];
      for (const item of lists.ingredients) {
        if (item.toLowerCase().includes(searchValue)) {
          filteredIng.push(item);
        }
      }
      displayList(filteredIng, 0);

      const filteredApp = [];
      for (const item of lists.appareils) {
        if (item.toLowerCase().includes(searchValue)) {
          filteredApp.push(item);
        }
      }
      displayList(filteredApp, 1);

      const filteredUs = [];
      for (const item of lists.ustensils) {
        if (item.toLowerCase().includes(searchValue)) {
          filteredUs.push(item);
        }
      }
      displayList(filteredUs, 2);
    } else if (searchValue.length < 3) {
      ingredientUl.innerHTML = "";
      appareilUl.innerHTML = "";
      ustensileUl.innerHTML = "";

      displayList(lists.ingredients, 0);
      displayList(lists.appareils, 1);
      displayList(lists.ustensils, 2);
    }
    filterVue();
  };

  const filterTagList = (searchValue, typeIndex) => {
    switch (typeIndex) {
      case 0: // ingredient
        ingredientUl;
        lists.ingredients;
        break;
      case 1: // appareils
        appareilUl;
        lists.appareils;
        break;
      case 2: // ustensiles
        ustensileUl;
        lists.ustensils;
        break;
    }

    filterTagInput(searchValue);
  };

  // Filtre les ingrédients dans la searchbar du tag
  ingredientInput.addEventListener("input", function () {
    filterTagList(this.value.toLowerCase());
  });

  // Filtre les appareils dans la searchbar du tag
  appareilInput.addEventListener("input", function () {
    filterTagList(this.value.toLowerCase());
  });

  // Filtre les ustensils dans la searchbar du tag
  ustensileInput.addEventListener("input", function () {
    filterTagList(this.value.toLowerCase());
  });
})();
