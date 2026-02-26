import React, { useEffect, useState } from "react";

export const ProductDetails= () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://stagingapi2.shop.com/custom-cocktail-service/v1/custom-cocktails?siteType=SHP&siteCountry=USA&languageCode=en&preferredCustomerId=9276777&preferredCustomerDiscount=0&markup=0&cocktailType=CC&pageMode=1&templateIdSelected=&api_key=759ef1fc9e4c4e8bbf900db5f4b7caba');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="cc-product">
      product details here: <br/>
      {/*{data}*/}
    </div>
  );
};
