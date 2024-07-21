import React from "react";
import { Link, useParams } from "react-router-dom";
import "./CategoryPage.css"
interface shopProps {
  data: [categoriesItems: Categories, categoriesNames: CategoryKey[]];
}

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

const CategoryPage = (props: shopProps) => {
  const { data } = props;
  const [categoriesItems, categoriesNames] = data;
  const { category } = useParams();
  const categoryKey = category as CategoryKey;
const displayImg = [
  categoriesItems.Clothing[0].Image,
  categoriesItems.Shoes[0].Image,
  categoriesItems.Phones[0].Image,
  categoriesItems.Cars[0].Image,
];
 if (category === undefined) {
    return(
      <div className="content">
    <div className="mobile-categorypage-list">
      {categoriesNames.map((item,index)=>(
         <Link to={`/categories/${item}`} className="mobile-categorypage-item"><div><img src={displayImg[index]} alt="" /> {item}</div> <img src="src\assets\Icon Arrow.png" alt="" /></Link>
      ))}
       <div className="mobile-categorypage-item"><div><img src="/src/assets/45D808E0-5E00-4D2A-9BDC-5ED6F427010E.png" alt="" /><h3 className="foryou-heading">Just For You</h3>
</div>   <button className="seeAllBtn">
              <img src="\src\assets\Arrow.svg" alt="" />
            </button></div>
      
    </div>
    </div>)
  }


  return (
          <div className="content">
    <div className="mobile-section-container">
      {categoriesItems[categoryKey].map(
        (item: CategoryItem, index: React.Key | null | undefined) => (

              <Link
                key={index}
                className="mobile-product-card"
                to={`/Product/${item.id}`}
              >
                <div className="image-holder">
                  <img src={item.Image} alt={item.Label} />
                </div>
                <div className="product-details">
                  <h4>{item.title}</h4>
                  <span>{item.Label}</span>
                  <b>{item.Price}</b>
                </div>
              </Link>
        )
      )}
    </div>
    </div>
  );
}; 

export default CategoryPage;
