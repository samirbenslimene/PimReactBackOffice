import React from "react";

import Table from "../components/table/Table";

import customerList from "../assets/JsonData/reclamation-list.json";
import Badge from "../components/badge/Badge";
import { useState } from "react";

const Reclamations = () => {
  const [openReply, setopenReply] = useState(false);
  const [doReply, setdoReply] = useState(false);
  const [cuurentRecalamtaion, setcuurentRecalamtaion] = useState({
    name: "",
    email: "",
    content: "",
    status: false,
  });
  const customerTableHead = [
    "",
    "name",
    "email",
    "Reclamation Content",
    "status",
  ];
  const doReplyAction = () => {
    setdoReply(true);
  };
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const replytoreclamation = (item) => {
    console.log("hi");
    setopenReply(false);

    setcuurentRecalamtaion(item);
    setopenReply(true);
  };
  const renderBody = (item, index) => (
    <tr key={index} onClick={() => replytoreclamation(item)}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.content}</td>
      <td>
        {item.status ? (
          <Badge type={rectlamationStatus[true]} content="replied" />
        ) : (
          <Badge type={rectlamationStatus[false]} content="pending" />
        )}
      </td>
    </tr>
  );
  const rectlamationStatus = {
    true: "primary",
    false: "danger",
  };
  const closereplysection = () => {
    setdoReply(false);
  };
  return (
    <div>
      <h2 className="page-header">Reclamation list :</h2>
      <div className="row">
        <div className="col-12">
          {openReply ? (
            <div className="card">
              <div className="card__body">
                <div className="row">
                  <div className="col-4">
                    <h3>Reclamation owner: {cuurentRecalamtaion.name}</h3>
                  </div>
                  <div className="col-6">
                    {cuurentRecalamtaion.status ? (
                      <Badge
                        type={rectlamationStatus[true]}
                        content="replied"
                      />
                    ) : (
                      <div>
                        <Badge
                          type={rectlamationStatus[false]}
                          content="pending"
                        />
                      </div>
                    )}
                    <br></br>
                  </div>
                </div>
                <br></br>
                <h4>email : {cuurentRecalamtaion.email}</h4>

                <p>Relacamtion content :{cuurentRecalamtaion.content}</p>
                {cuurentRecalamtaion.status ? (
                  <div></div>
                ) : (
                  <div>
                    <br />

                    <button className="button col-2" onClick={doReplyAction}>
                      Reply
                    </button>
                    <br />
                    <br />
                    {doReply ? (
                      <div className="row">
                        <div className="col-6">
                          <div className="card">
                            <label>Reply content</label>
                            <br />
                            <br />
                            <div className="col-10">
                              {" "}
                              <input
                                className="input"
                                type="text"
                                placeholder="Reply ..."
                              />
                            </div>

                            <br />
                            <br />
                            <div className="row">
                              <div className="col-3">
                                {" "}
                                <button
                                  className="button col-8"
                                  onClick={closereplysection}
                                >
                                  submit
                                </button>
                              </div>
                              <div className="col-3">
                                {" "}
                                <button
                                  className="button col-8"
                                  onClick={closereplysection}
                                >
                                  cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div></div>
          )}

          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={customerTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={customerList}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reclamations;
