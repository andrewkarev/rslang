const getRandomPages = (): number[] => {
  const LAST_PAGE = 29;
  const selectedPages: number[] = [];

  while (selectedPages.length < 3) {
    const randomNumber = Math.floor(Math.random() * (LAST_PAGE + 1));

    if (selectedPages.indexOf(randomNumber) > -1) continue;
    selectedPages.push(randomNumber);
  }

  return selectedPages;
};

export default getRandomPages;

