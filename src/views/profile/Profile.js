import React from "react";
import ProfileFace from "../../components/ProfileFace";
import ProfileEditUser from "../../components/ProfileEditUser";
import Payments from "../../components/Payments";
import { Tabs, Tab } from "react-bootstrap-tabs";
import { useUserDataContext } from "../../context/userContext";
import { Container } from "react-bootstrap";

const Profile = () => {
  const { userDb } = useUserDataContext();

  return (
    <React.Fragment>
      <Container className="mb-5">
        <Tabs
          className="profileTabs"
          onSelect={(index, label) => console.log(label + " selected")}
        >
          <Tab label="Perfil">
            <ProfileFace user={userDb} />
          </Tab>
          <Tab label="Editar Perfil">
            <ProfileEditUser user={userDb} />
          </Tab>
          <Tab label="Método de Pago">
            <Payments user={userDb} />
          </Tab>
        </Tabs>
      </Container>
    </React.Fragment>
  );
};

export default Profile;
