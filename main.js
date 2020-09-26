const descriptions = document.querySelectorAll(`.table__item--description p`);
const searchSection = document.querySelector(`.search`);
const searchBtn = searchSection.querySelector(`.search__find-btn`);
const resetBtn = searchSection.querySelector(`.search__reset-btn`);
const input = searchSection.querySelector(`.search input`);

const processedDescriptions = [];
const sourceDescriptions = Array.from(descriptions)
  .slice()
  .map((description) => description.innerHTML);

const getNounPluralForm = (number, one, two, many) => {
  const mod10 = number % 10;
  const mod100 = number % 100;

  switch (true) {
    case mod100 >= 11 && mod100 <= 20:
      return many;

    case mod10 > 5:
      return many;

    case mod10 === 1:
      return one;

    case mod10 >= 2 && mod10 <= 4:
      return two;

    default:
      return many;
  }
};

const setSpanTag = (text) => {
  return `<span style = "background-color: #ff9c9c; display: inline; padding: 0">${text}</span>`;
};

const createSearchResultElement = (resultsCount) => {
  const findCount = document.createElement(`p`);
  if (resultsCount > 0) {
    const rightVerb = resultsCount % 10 === 1
      ? `Найден`
      : `Найдено`;
    findCount.textContent = rightVerb + ` ${resultsCount} ${getNounPluralForm(resultsCount, `элемент`, `элемента`, `элементов`)}`;
  } else {
    findCount.textContent = `Ничего не найдено`;
  }

  findCount.classList.add(`search__result`);
  searchSection.appendChild(findCount);
};

const resetHighlighted = () => {
  let i = 0;
  if (processedDescriptions.length) {
    for (let description of Array.from(descriptions)) {
      description.innerHTML = sourceDescriptions[i];
      i++;
    }
  }
};

const removeSearchResultElement = () => {
  const searchResult = searchSection.querySelector(`.search__result`);
  if (searchResult) {
    searchSection.removeChild(searchResult);
  }
};

searchBtn.addEventListener(`click`, () => {
  resetHighlighted();
  removeSearchResultElement();
  let count = 0;

  if (input.value.length) {
    const reg = new RegExp(input.value, `gi`);

    for (let description of Array.from(descriptions)) {
      description.innerHTML = description.innerHTML.replace(reg, (str) => {
        count++;
        return setSpanTag(str);
      });
      processedDescriptions.push(description.innerHTML);
    }
  }

  createSearchResultElement(count);
});

resetBtn.addEventListener(`click`, () => {
  resetHighlighted();
  removeSearchResultElement();
  input.value = ``;
});
