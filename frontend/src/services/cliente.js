import { firebaseDatabase } from "./firebase";

const clientes = firebaseDatabase.collection("clientes");

const all = async () => {
  const allClientes = await clientes.get();
  var clients = [];

  allClientes.forEach(function (cliente) {
    clients.push({ ...cliente.data(), id: cliente.id });
    // var id = cliente.id;
    // var data = cliente.val();
    // clients.push({ id: id, title: data.title, description: data.description });
  });
  return clients;
};

const get = async (id) => {

  const client = await clientes.doc(id)
  return client
}

const create = async (user) => {
  const cliente = await clientes.add(user);
  console.log(cliente);
};

const update = async (user) => {
  const cliente = await clientes.doc(user.id).set(user);
};

export default { create, all, update, get };
