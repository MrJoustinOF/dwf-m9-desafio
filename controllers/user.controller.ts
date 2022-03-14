import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "models/User";

const getMyData = async (req: NextApiRequest, res: NextApiResponse, token) => {
  const { id } = token;

  const ref = await User.find(id);
  const data = ref.data();

  res.json(data);
};

const updateMyData = async (
  req: NextApiRequest,
  res: NextApiResponse,
  token
) => {
  const { name, lastname } = req.body;
  const { id } = token;

  const ref = await User.find(id);
  const { name: dataName, lastname: dataLastName } = ref.data();

  await User.updateById(id, {
    name: !name ? dataName : name,
    lastname: !lastname ? dataLastName : lastname,
  });

  res.json({ msg: "data updated" });
};

const updateMyAddress = async (
  req: NextApiRequest,
  res: NextApiResponse,
  token
) => {
  const { address } = req.body;
  const { id } = token;

  const ref = await User.find(id);
  const { address: dataAddress } = ref.data();

  await User.updateById(id, {
    address: !address ? dataAddress : address,
  });

  res.json({ msg: "address updated" });
};

export { getMyData, updateMyData, updateMyAddress };
