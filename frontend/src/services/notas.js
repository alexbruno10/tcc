import { firebaseDatabase } from "./firebase";

const notas = firebaseDatabase.collection("notas");

const create = async (nota) => {
    return await notas.add(nota)
}

const all = async () => {
    const allNotas = await notas.get();
    var itens = [];

    allNotas.forEach(function (item) {
        itens.push({ ...item.data(), id: item.id });
    });
    return itens;
};

const update = async (nota) => {
    return await notas.doc(nota.id).set(nota)
}

const remove = async (id) => {
    return await notas.doc(id).delete();
}

export default { create, all, update, remove }
