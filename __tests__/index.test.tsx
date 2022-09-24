// __tests__/index.test.jsx

import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import {
  getBhkType,
  getCorporationWaterRatio,
  getBorewellWaterRatio,
  tankerWaterRate,
  getBhkRatioRate,
  getGuests,
  getAllWaterUse,
} from "../service/service";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /Water management/i,
    });

    expect(heading).toBeInTheDocument();
  });
});

/*
INPUT:
ALLOT_WATER 2 3:7
ADD_GUESTS 2
ADD_GUESTS 3
BILL

OUTPUT:
2400 5215
*/
describe("get bhk type", () => {
  it("returns 2 or 3 for bhk type", () => {
    const text = "ALLOT_WATER 2 3:7";

    expect(getBhkType(text)).toEqual(2);
  })
})

describe("get corporation water ratio", () => {
  it("returns corporation water ratio", () => {
    const text = "ALLOT_WATER 2 3:7";

    expect(getCorporationWaterRatio(text)).toEqual(3);
  });
});

describe("get borewell water ratio", () => {
  it("returns borewell water ratio", () => {
    const text = "ALLOT_WATER 2 3:7\\n";

    expect(getBorewellWaterRatio(text)).toEqual(7);
  });
});

describe("get guest number", () => {
  it("returns guest number", () => {
    const text = "ALLOT_WATER 2 3:7\\nADD_GUESTS 2\\n";

    expect(getGuests(text)).toEqual(2);
  });
});

describe("get guest tanker water rate", () => {
  it("returns guest number", () => {
    const text = "ALLOT_WATER 2 3:7\\nADD_GUESTS 2\\n";

    expect(getGuests(text)).toEqual(2);
  });

  it("returns guest tanker water rate", () => {
    const text = "ALLOT_WATER 2 3:7\\nADD_GUESTS 2\\nADD_GUESTS 3\\nBILL";

    expect(getGuests(text)).toEqual(5);
    expect(tankerWaterRate(getGuests(text))).toEqual(4000);
  });
});

describe("get all water useage", () => {
  it("returns all water useage", () => {
    const text = "ALLOT_WATER 2 3:7\\nADD_GUESTS 2\\nADD_GUESTS 3\\nBILL";

    expect(getAllWaterUse(getBhkType(text), getGuests(text))).toEqual(2400);
  });
});

describe("get all water useage rate", () => {
  it("returns all water useage rate", () => {
    const text = "ALLOT_WATER 2 3:7\\nADD_GUESTS 2\\nADD_GUESTS 3\\nBILL";

    expect(
      getBhkRatioRate(getBhkType(text), getCorporationWaterRatio(text), getBorewellWaterRatio(text)) +
        tankerWaterRate(getGuests(text))
    ).toEqual(5215);
  });
});
