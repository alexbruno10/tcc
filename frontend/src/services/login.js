import { firebaseAuth } from "./firebase";

const logar = async ({ usuario, senha }) => {
  try {
    const logged = await firebaseAuth.signInWithEmailAndPassword(
      usuario,
      senha
    );
    console.log(logged);
    return true;
  } catch (error) {
    return false;
  }
};

const logout = async () => {
  try {
    await firebaseAuth.signOut();
    return true;
  } catch (error) {
    return false;
  }
};

const isLogged = () => {
  if (firebaseAuth.currentUser != null) {
    return true;
  } else {
    return false;
  }
};

export default { logar, isLogged };
