import React from "react";

import Loading from "../../../../components/Loading/Loading";
import Table from "../../../../components/Table/Table";
import useFetch from "../../../../hooks/useFetch";
import { getUsers } from "../../api";

export const UsersTable = () => {
  const { data, error, loadingState } = useFetch(getUsers, []);

  return (
    <Loading loadingState={loadingState} error={error}>
      <Table headers={["id", "name", "email"]} rows={data} />
    </Loading>
  );
};
