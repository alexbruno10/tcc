import { firebaseDatabase } from "./firebase";
import clienteService from "./cliente";

const orcamentos = firebaseDatabase.collection("orcamentos");


const create = async (orcamento) => {
    orcamentos.add(orcamento);
}

const all = async () => {
    console.log((await clienteService.get('BhquaUbiaDQZQtn5YX6Q')))
    const allOrcamentos = await orcamentos.get();
    var list = [];

    allOrcamentos.forEach(function (orcamento) {

        list.push({ ...orcamento.data(), id: orcamento.id });
    });
    return list;
}

export default { create, all };