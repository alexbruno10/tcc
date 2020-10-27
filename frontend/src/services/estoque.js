import { firebaseDatabase } from "./firebase";

const estoque = firebaseDatabase.collection("estoque");

const create = async (item) => {
    return await estoque.add(item)
}

const all = async () => {
    const allItens = await estoque.get();
    var itens = [];

    allItens.forEach(function (item) {
        itens.push({ ...item.data(), id: item.id });
        // var id = cliente.id;
        // var data = cliente.val();
        // clients.push({ id: id, title: data.title, description: data.description });
    });
    return itens;
};

const update = async (item) => {
    return await estoque.doc(item.id).set(item)
}

const remove = async (id) => {
    return await estoque.doc(id).delete();
}

export default { create, all, update, remove }
