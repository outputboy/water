const bhkTypeRegex: RegExp = /(ALLOT_WATER )(.+?)/g;
const corporationWaterRegex: RegExp = /(ALLOT_WATER [2-3] )(.\d?)(:)/g;
const borewellWaterRegex: RegExp = /(ALLOT_WATER [2-3] \d:)(.\d?)(\\n)/g;
const guestsRegex: RegExp = /(ADD_GUESTS )(.\d?)(\\n)/g;

export const getBhkType = (textFileData: string): number => {
  if (textFileData.match(bhkTypeRegex)) {
    return Number(bhkTypeRegex.exec(textFileData)![2]);
  } else {
    console.log('Error getting bhk type');
    return 0;
  };
}

export const getCorporationWaterRatio = (textFileData: string): number => {
  if (textFileData.match(corporationWaterRegex)) {
    return Number(corporationWaterRegex.exec(textFileData)![2]);
  } else {
    console.log("Error getting corporation ratio");
    return 0;
  }
};

export const getBorewellWaterRatio = (textFileData: string): number => {
  if (textFileData.match(borewellWaterRegex)) {
    return Number(borewellWaterRegex.exec(textFileData)![2]);
  } else {
    console.log("Error getting borewell water ratio");
    return 0;
  }
};

export const getGuests = (textFileData: string): number => {
  const guestList = textFileData.match(guestsRegex);
  let guests = 0;

  if (guestList && guestList.length > 0) {
    guests = guestList
      .map((g) =>
        Number(g.replace("ADD_GUESTS ", "").replace("\\n", ""))
      )
      .reduce((partialSum, a) => partialSum + a, 0);
  }

  return guests;
};

export const tankerWaterRate = (guests: number): number => {
  const tankerWaterConsumption = guests * 10 * 30;
  if (tankerWaterConsumption > 3000) {
    return 500 * 2 + 1000 * 3 + 1500 * 5 + (tankerWaterConsumption - 3000) * 8;
  } else if (tankerWaterConsumption > 1500) {
    return 500 * 2 + 1000 * 3 + (tankerWaterConsumption - 1500) * 5;
  } else if (tankerWaterConsumption > 500) {
    return 500 * 2 + (tankerWaterConsumption - 500) * 3;
  } else {
    return tankerWaterConsumption * 2;
  }
};

export const getBhkRatioRate = (
  bhkType: number,
  cWaterRatio: number,
  bWaterRatio: number
): number => {
  const cWater = cWaterRatio / (cWaterRatio + bWaterRatio);
  const bWater = bWaterRatio / (cWaterRatio + bWaterRatio);
  if (bhkType === 3) {
    return 1500 * cWater + 1500 * bWater * 1.5;
  } else {
    return 900 * cWater + 900 * bWater * 1.5;
  }
};

export const getAllWaterUse = (bhkType: number, guests: number): number => {
  return (bhkType === 2 ? 900 : 1500) + guests * 10 * 30;
}

