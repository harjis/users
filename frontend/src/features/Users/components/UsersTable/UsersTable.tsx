import React from "react";
import { useQuery } from "@apollo/client";

import Loading from "../../../../components/Loading/Loading";
import Table from "../../../../components/Table/Table";
import { GET_USERS, GetUsersData } from "../../queries";

export const UsersTable = () => {
  const { data, error, loading } = useQuery<GetUsersData>(GET_USERS);

  return (
    <Loading data={data} loadingState={loading} error={error?.message}>
      {(data) => <Table headers={["id", "name", "email"]} rows={data.users} />}
    </Loading>
  );
};
