import React from "react";
import CategoryPage from "./components/CategoryPage";
import Startpage from "./components/Startpage";
import ShopPage from "./components/ShopPage";
import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ProductPage from "./components/ProductPage";


type CategoryItem = {
  id: Number;
  title:string;
  Image: string;
  Label: string;
  Price: string;
};

type CategoryKey = "Clothing" | "Shoes" | "Phones" | "Cars";

type Categories = {
  [key in CategoryKey]: CategoryItem[];
};

function App() {

  const categoriesNames: CategoryKey[] = [
    "Clothing",
    "Shoes",
    "Phones",
    "Cars",
  ];
  const forYouData = [
    {
      id: 3,
      title: "Beautiful Gown",
      Image: "/src/assets/02643ACC-CFE9-415B-B36C-04316EC68CF0.png",
      Label:
        "Pink Dress Gown lazury awaits with this beautiful pink dress of size xl.",
      Price: "$" + 17.58,
    },
    {
      id: 4,
      title: "Beautiful Gown",
      Image: "/src/assets/45D808E0-5E00-4D2A-9BDC-5ED6F427010E.png",
      Label: "Lorem ipsum dolor sit amet consectetur",
      Price: "$" + 17.58,
    },
    {
      id: 4,
      title: "Beautiful Gown",
      Image: "/src/assets/45D808E0-5E00-4D2A-9BDC-5ED6F427010E.png",
      Label: "Lorem ipsum dolor sit amet consectetur",
      Price: "$" + 17.58,
    },
    {
      id: 4,
      title: "Beautiful Gown",
      Image: "/src/assets/45D808E0-5E00-4D2A-9BDC-5ED6F427010E.png",
      Label: "Lorem ipsum dolor sit amet consectetur",
      Price: "$" + 17.58,
    },
  ];
  const categoriesItems: Categories = {
    Clothing: [
      {
        id: 5,
        title: "Beautiful Gown",
        Image: "/src/assets/Placeholder_01@2x(3).png",
        Label: "Lorem ipsum dolor sit amet consectetur",
        Price: "$" + 17.58,
      },
      {
        id: 8,
        title: "Beautiful Gown",
        Image: "/src/assets/Placeholder_01@2x(2).png",
        Label: "Lorem ipsum dolor sit amet consectetur",
        Price: "$" + 17.58,
      },
      {
        id: 9,
        title: "Beautiful Gown",
        Image: "/src/assets/Placeholder_01@2x(1).png",
        Label: "Lorem ipsum dolor sit amet consectetur",
        Price: "$" + 17.58,
      },
      {
        id: 26,
        title: "Beautiful Gown",
        Image: "/src/assets/Placeholder_01@2x.png",
        Label: "Lorem ipsum dolor sit amet consectetur",
        Price: "$" + 17.58,
      },
    ],
    Shoes: [
      {
        id: 65,
        title: "Beautiful Gown",
        Image: "/src/assets/Placeholder_01@2x(3).png",
        Label: "Lorem ipsum dolor sit amet consectetur",
        Price: "$" + 17.58,
      },
      {
        id: 58,
        title: "Beautiful Gown",
        Image: "/src/assets/Placeholder_01@2x(2).png",
        Label: "Lorem ipsum dolor sit amet consectetur",
        Price: "$" + 17.58,
      },
      {
        id: 55,
        title: "Beautiful Gown",
        Image: "/src/assets/Placeholder_01@2x(1).png",
        Label: "Lorem ipsum dolor sit amet consectetur",
        Price: "$" + 17.58,
      },
      {
        id: 12,
        title: "Beautiful Gown",
        Image: "/src/assets/Placeholder_01@2x.png",
        Label: "Lorem ipsum dolor sit amet consectetur",
        Price: "$" + 17.58,
      },
    ],
    Phones: [
      {
        id: 23,
        title: "Beautiful Gown",
        Image: "/src/assets/Placeholder_01@2x(3).png",
        Label: "Lorem ipsum dolor sit amet consectetur",
        Price: "$" + 17.58,
      },
      {
        id: 54,
        title: "Beautiful Gown",
        Image: "/src/assets/Placeholder_01@2x(2).png",
        Label: "Lorem ipsum dolor sit amet consectetur",
        Price: "$" + 17.58,
      },
      {
        id: 23,
        title: "Beautiful Gown",
        Image: "/src/assets/Placeholder_01@2x(1).png",
        Label: "Lorem ipsum dolor sit amet consectetur",
        Price: "$" + 17.58,
      },
      {
        id: 33,
        title: "Beautiful Gown",
        Image: "/src/assets/Placeholder_01@2x.png",
        Label: "Lorem ipsum dolor sit amet consectetur",
        Price: "$" + 17.58,
      },
    ],
    Cars: [
      {
        id: 34,
        title: "Beautiful Gown",
        Image: "/src/assets/Placeholder_01@2x(3).png",
        Label: "Lorem ipsum dolor sit amet consectetur",
        Price: "$" + 17.58,
      },
      {
        id: 10,
        title: "Beautiful Gown",
        Image: "/src/assets/Placeholder_01@2x(2).png",
        Label: "Lorem ipsum dolor sit amet consectetur",
        Price: "$" + 17.58,
      },
      {
        id: 11,
        title: "Beautiful Gown",
        Image: "/src/assets/Placeholder_01@2x(1).png",
        Label: "Lorem ipsum dolor sit amet consectetur",
        Price: "$" + 17.58,
      },
      {
        id: 20,
              title:"Beautiful Gown",
        Image: "/src/assets/Placeholder_01@2x.png",
        Label: "Lorem ipsum dolor sit amet consectetur",
        Price: "$" + 17.58,
      },
    ],
  };

  return (
    <>
      <div className="App">
        <div>
          <Routes>
            <Route path="/" element={<Startpage />} />
            <Route
              path="/Shop"
              element={<ShopPage data={[forYouData, categoriesItems, categoriesNames]} />}
            />
            <Route
              path="/Search"
              element={<CategoryPage data={[categoriesItems, categoriesNames]} />}
            />
            <Route
              path="/Product/:id"
              element={<ProductPage data={[forYouData,categoriesItems, categoriesNames]} />}
            />
            <Route
              path="/categories/:category"
              element={<CategoryPage data={[categoriesItems, categoriesNames]} />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;