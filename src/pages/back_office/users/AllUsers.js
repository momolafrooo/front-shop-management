import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { expand_area, menu, sub_menu } from "../../../redux/actions";
import SimpleDatatable from "../components/SimpleDatatable";
import UserApi from "../../../APIs/UserApi";
import { motion } from "framer-motion";
import PageVariants from "../variants/PageVariants";

function AllUsers() {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);

  const columns = {
    first_name: "Prénom",
    last_name: "Nom",
    address: "Adresse",
    email: "Email",
    role: "Role",
  };

  useEffect(() => {
    dispatch(menu("Utilisateurs"));
    dispatch(sub_menu("Tous les utilisateurs"));
    dispatch(expand_area("Utilisateurs"));

    const getUsers = async () => {
      await UserApi.allUsers()
        .then((response) => {
          setUsers(Object.values(response.data.users));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getUsers();
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
        data={users}
        onConfirm={UserApi.deleteUser}
        editURL="/utilisateurs/modifier-utilisateur/"
        viewURL="/utilisateurs/afficher-utilisateur/"
      />
    </motion.div>
  );
}

export default AllUsers;
