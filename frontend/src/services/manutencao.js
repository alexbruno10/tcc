import { firebaseDatabase } from "./firebase";

const manutencoes = firebaseDatabase.collection("manutencoes");

const create = async (item) => {
    return await manutencoes.add(item)
}

const all = async () => {
    const allManutencoes = await manutencoes.get();
    var itens = [];

    allManutencoes.forEach(function (item) {
        itens.push({ ...item.data(), id: item.id });
    });
    return itens;
};

const update = async (item) => {
    return await manutencoes.doc(item.id).set(item)
}

const remove = async (id) => {
    return await manutencoes.doc(id).delete();
}

export default { create, all, update, remove }
