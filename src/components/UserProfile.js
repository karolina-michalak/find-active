import React, { useState, useEffect } from "react";
import firebase from "../firebase/firebase";
import styles from "../styles/UserProfile.module.css";
import "firebase/storage";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../layouts/Navbar";
import LoggedNavbar from "../layouts/LoggedNavbar";
import UpdatePassword from "./UpdatePassword";
import RemoveAccount from "./RemoveAccount";
import SearchBar from "./SearchBar";

const UserProfile = () => {
  const user = firebase.auth().currentUser;
  const storage = firebase.storage();
  const isLoggedIn = useAuth();

  const allInputs = {
    imgUrl: "",
  };

  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [currentImage, setCurrentImage] = useState("");

  const [changePhotoForm, showChangePhotoForm] = useState(false);
  const [updatePasswordForm, showUpdatePasswordForm] = useState(false);
  const [removeAccountForm, showRemoveAccountForm] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const id = user.uid;
        const ref = firebase.database().ref(`/users/${id}/photoURL`);
        if (ref != null) {
          ref.on("value", (snapshot) => {
            setCurrentImage(snapshot.val());
          });
        }
      }
    });
  }, []);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(image);
  };

  const handleFirebaseUpload = (e) => {
    e.preventDefault();
    const uploadTask = storage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        console.log(snapShot);
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref("images")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((firebaseUrl) => {
            setImageAsUrl((prevObject) => ({
              ...prevObject,
              imgUrl: firebaseUrl,
            }));

            const currentUser = firebase.auth().currentUser;
            const id = currentUser.uid;

            firebase.database().ref(`/users/${id}/photoURL`).set(firebaseUrl);
            console.log("to jest url" + firebaseUrl);
          });
      }
    );
  };

  return (
    <div className={styles.userProfile}>
      {" "}
      {isLoggedIn ? <LoggedNavbar /> : <Navbar />}
      <SearchBar />
      {isLoggedIn ? (
        <div className={styles.userFeatures}>
          <div className={styles.userData}>
            <h2> Witaj, {user.displayName}! </h2>
            <img
              src={
                currentImage ||
                "https://semantic-ui.com/images/wireframe/image.png"
              }
              className={styles.profileImg}
              alt="user profile"
            />
          </div>
          <form
            className={styles.changePhotoForm}
            onSubmit={handleFirebaseUpload}
          >
            <button onClick={() => showChangePhotoForm(!changePhotoForm)}>
              Zmień zdjęcie
            </button>{" "}
            {changePhotoForm && (
              <>
                <input
                  type="file"
                  name="file"
                  id="file"
                  accept="image/*"
                  onChange={handleImageAsFile}
                />
                <button>zmień zdjęcie</button>{" "}
              </>
            )}
          </form>
          <button onClick={() => showUpdatePasswordForm(!updatePasswordForm)}>
            Zmień hasło
          </button>{" "}
          {updatePasswordForm && <UpdatePassword />}
          <button onClick={() => showRemoveAccountForm(!removeAccountForm)}>
            Usuń konto
          </button>{" "}
          {removeAccountForm && <RemoveAccount />}
        </div>
      ) : (
        ""
      )}{" "}
    </div>
  );
};

export default UserProfile;
