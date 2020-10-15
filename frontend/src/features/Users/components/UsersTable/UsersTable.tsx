import React from "react";

import Loading from "../../../../components/Loading/Loading";
import Table from "../../../../components/Table/Table";
import { useGetUsersQuery } from "../../../../generated/graphql";

export const UsersTable = () => {
  const { data, error, loading } = useGetUsersQuery();

  return (
    <Loading data={data} loadingState={loading} error={error?.message}>
      {(data) => <Table headers={["id", "name", "email"]} rows={data.users} />}
    </Loading>
  );
};
