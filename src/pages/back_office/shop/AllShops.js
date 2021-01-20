import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { expand_area, menu, sub_menu } from "../../../redux/actions";

import "./css/dt-global_style.css";
import SimpleDatatable from "../components/SimpleDatatable";
import ShopApi from "../../../APIs/ShopApi";

import { motion } from "framer-motion";
import PageVariants from "../variants/PageVariants";

function AllShops() {
  const dispatch = useDispatch();

  const [shops, setShops] = useState([]);

  const columns = {
    name: "Nom",
    phone1: "Téléphone",
    address: "Adresse",
    email: "Email",
  };

  useEffect(() => {
    dispatch(menu("Boutiques"));
    dispatch(sub_menu("Toutes les boutiques"));
    dispatch(expand_area("Boutiques"));

    const getShops = async () => {
      await ShopApi.allShops()
        .then((response) => {
          setShops(Object.values(response.data.shops).reverse());
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getShops();
  }, [dispatch]);

  return (
    <motion.div
      variants={PageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <SimpleDatatable
        columns={columns}
        data={shops}
        onConfirm={ShopApi.deleteShop}
        editURL="/boutiques/modifier-boutique/"
        viewURL="/boutiques/afficher-boutique/"
      />
    </motion.div>
  );
}

export default AllShops;
