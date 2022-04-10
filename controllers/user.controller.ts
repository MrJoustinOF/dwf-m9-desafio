import { User } from "models/User";

const getMyData = async (id: string) => {
  const ref = await User.find(id);
  const data = ref.data();

  return data;
};

const updateMyData = async (data: any, id: string) => {
  const { name, lastname } = data;

  const ref = await User.find(id);
  const { name: dataName, lastname: dataLastName } = ref.data();

  await User.updateById(id, {
    name: !name ? dataName : name,
    lastname: !lastname ? dataLastName : lastname,
  });

  return { msg: "data updated" };
};

const updateMyAddress = async (address: any, id: string) => {
  const ref = await User.find(id);
  const { address: dataAddress } = ref.data();

  await User.updateById(id, {
    address: !address ? dataAddress : address,
  });

  return { msg: "address updated" };
};

export { getMyData, updateMyData, updateMyAddress };
