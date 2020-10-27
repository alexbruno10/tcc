import { firebaseDatabase } from "./firebase";
import clienteService from "./cliente";

const pedidos = firebaseDatabase.collection("pedidos");


const create = async (pedido) => {
    return await pedidos.add(pedido)
}

const all = async () => {
    const allItens = await pedidos.get();
    var itens = [];

    const clients = await clienteService.all()

    allItens.forEach(function (item) {
        const cliente = clients.find((client) => client.id === item.data().cliente)
        itens.push({ ...item.data(), id: item.id, cliente: cliente });
    });
    return itens;
};

const update = async (pedido) => {
    return await pedidos.doc(pedido.id).set(pedido)
}

const remove = async (id) => {
    return await pedidos.doc(id).delete();
}

export default { create, all, update, remove }
