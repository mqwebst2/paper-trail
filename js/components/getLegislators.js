const apiKey = import.meta.env.VITE_API_KEY; // API Key Hidden

let legisArray = [];

const getLegislators = async () => {
  const legisURL = `https://www.opensecrets.org/api/?method=getLegislators&id=NJ&apikey=${apiKey}&output=json`;

  const legisResponse = await (await fetch(legisURL)).json();
  const legisData = legisResponse.response.legislator;

  for (let i = 0; i < legisData.length; i++) {
    legisArray[i] = legisData[i]['@attributes'];
  }

  return legisArray;
};

getLegislators();

export const searchCandName = (input) => {
  function findName(legisArray) {
    let searchedName = input;

    return legisArray.firstlast === searchedName;
  }

  let candIndex = legisArray.findIndex(findName);

  if (candIndex != -1) {
    console.log('FirstLast Name Index Found', candIndex);

    return legisArray[candIndex].cid;
  } else {
    console.log('FirstLast Name Index NOT Found');
    alert('Name not found, please search for another Member of Congress');

    return null;
  }
};
