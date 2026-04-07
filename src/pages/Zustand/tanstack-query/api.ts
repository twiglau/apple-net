import { randomMessage } from "../store/async-request";

export const randomFetch = () => {};
export interface QueryParams {
  page: number;
  pageSize: number;
  gender?: string | undefined;
  nat?: string | undefined;
  keyword?: string | undefined;
}

export const getUserInfo = async (params: QueryParams) => {
  const { page, pageSize, gender, nat, keyword } = params;

  const searchParams = new URLSearchParams({
    page: page.toString(),
    results: pageSize.toString(),
    inc: "name,gender,email,nat,picture",
    noinfo: "true",
  });

  if (gender) searchParams.append("gender", gender);
  if (nat) searchParams.append("nat", nat);

  const response = await fetch(
    `https://randomuser.me/api/?${searchParams.toString()}`,
  );
  const data = await response.json();

  const users: any[] = data.results.map((item: any) => ({
    ...item,
    id: crypto.randomUUID(),
    desc: randomMessage(),
    fullname: `${item.name.first} ${item.name.last}`,
  }));

  return {
    list: users,
    total: 1000,
  };
};
