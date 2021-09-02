import React from "react";
import "./PostTable.css";

const PostTable = (props) => {
  const { headersName, children } = props;

  return (
    <table className="post-table">
      <thead>
        <tr>
          {headersName &&
            headersName.map((item, index) => {
              return (
                <td className="post-table-header-column" key={index}>
                  {item}
                </td>
              );
            })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default PostTable;
