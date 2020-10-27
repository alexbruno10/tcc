import { firebaseAuth } from './firebase';

const logar = async ({ usuario, senha }) => {
    try {
        const logged = await firebaseAuth.signInWithEmailAndPassword(usuario, senha)
        return true;

    } catch (error) {
        return false;

    }


}

const logout = async () => {
    try {
        await firebaseAuth.signOut();
        return true;
    } catch (error) {
        return false;
    }
}

const isLogged = async () => {
    if (firebaseAuth.currentUser) {
        return true;
    } else {
        return false;
    }
}

export default { logar, isLogged }