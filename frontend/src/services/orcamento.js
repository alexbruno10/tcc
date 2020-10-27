import { firebaseDatabase } from "./firebase";
import clienteService from "./cliente";

const orcamentos = firebaseDatabase.collection("orcamentos");


const create = async (orcamento) => {
    orcamento.data = new Date().toLocaleDateString();
    const createdOrcamento = await orcamentos.add(orcamento);
    return createdOrcamento
}

const edit = async (id) => {
    return await orcamentos.doc(id).get();
}

const update = async (orcamento) => {
    return await orcamentos.doc(orcamento.id).set(orcamento)
}

const all = async () => {
    const allOrcamentos = await orcamentos.get();
    var list = [];
    const clients = await clienteService.all()

    allOrcamentos.forEach(async (orcamento) => {
        const cliente = clients.find((client) => client.id === orcamento.data().cliente)
        list.push({ ...orcamento.data(), id: orcamento.id, cliente: cliente });
    });
    return list;
}

const remove = async (id) => {
    return await orcamentos.doc(id).delete();

}

export default { create, all, remove, edit, update };