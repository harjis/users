import React from "react";

type Props = {
  headers: string[];
  rows: Record<string, any>[];
};
export default function Table(props: Props) {
  return (
    <table width={500}>
      <thead>
        <tr>
          {props.headers.map((header) => (
            <td key={header}>{header}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.rows.map((row, i) => (
          <tr key={i}>
            {props.headers.map((header) => (
              <td key={header}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
