import { User } from "models/User";

const getMyData = async (token) => {
  const { id } = token;

  const ref = await User.find(id);
  const data = ref.data();

  return { status: 200, response: data };
};

const updateMyData = async (body, token) => {
  const { name, lastname } = body;
  const { id } = token;

  const ref = await User.find(id);
  const { name: dataName, lastname: dataLastName } = ref.data();

  await User.updateById(id, {
    name: !name ? dataName : name,
    lastname: !lastname ? dataLastName : lastname,
  });

  return { status: 200, response: { msg: "data updated" } };
};

const updateMyAddress = async (body, token) => {
  const { address } = body;
  const { id } = token;

  const ref = await User.find(id);
  const { address: dataAddress } = ref.data();

  await User.updateById(id, {
    address: !address ? dataAddress : address,
  });

  return { status: 200, response: { msg: "address updated" } };
};

export { getMyData, updateMyData, updateMyAddress };
