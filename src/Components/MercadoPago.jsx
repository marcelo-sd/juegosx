import { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
//import img from "../../assets/Bananita.png";

import "../Styles/MercadoPago.css"

const Product = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago("TEST-1cf93908-a86e-4abb-8508-34b99eb4d5a9");

  const createPreference = async () => {
    try {
      const response = await axios.post("http://localhost:3000/create_preference", {
        description: "Bananita contenta",
        price: 100,
        quantity: 1,
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <div className='card-product-container'>
      <div className='card-product'>
        <div className='card'>
{/* <img src={img} alt='Product Image' /> */}
          <h3>Bananita contenta</h3>
          <p className='price'>100 $</p>
          <button onClick={handleBuy}>Buy</button>
          {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </div>
      </div>
    </div>
  );
};

export default Product;