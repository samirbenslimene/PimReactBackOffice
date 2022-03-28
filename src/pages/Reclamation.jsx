import React from "react";

import Table from "../components/table/Table";
import { useHistory } from "react-router-dom";

import Badge from "../components/badge/Badge";
import { useState } from "react";
import axios from "axios";

const Reclamations = () => {
  if (localStorage.getItem("id") === null) {
    //check condition
    history.push("/login");
  }
  const [openReply, setopenReply] = useState(false);
  const [doReply, setdoReply] = useState(false);
  const [dataReady, setdataReady] = useState(false);
  const [listReclamation, setlistReclamation] = useState([]);
  const [replyContent, setreplyContent] = useState("");
  const [cuurentRecalamtaion, setcuurentRecalamtaion] = useState({
    name: "",
    email: "",
    content: "",
    status: false,
  });
  const customerTableHead = ["name", "email", "Reclamation Content", "status"];
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
  const reply = () => {
    console.log(replyContent);
    axios
      .put("http://localhost:4000/api/reclamation/", {
        _id: cuurentRecalamtaion._id,
        reply: replyContent,
      })
      .then(() => {
        window.location.reload(false);
      });
  };
  const closereplysection = () => {
    setdoReply(false);
  };
  const history = useHistory();

  React.useEffect(() => {
    axios.get("http://localhost:4000/api/reclamation/").then((res) => {
      console.log(res.data.reclamations);
      setlistReclamation(res.data.reclamations);
      setdataReady(true);
    });
  }, []);
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
                  <div>
                    <h3>admin reply :</h3>
                    <p>{cuurentRecalamtaion.reply}</p>
                  </div>
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
                                value={replyContent}
                                onChange={(e) =>
                                  setreplyContent(e.target.value)
                                }
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
                                  onClick={reply}
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
          {dataReady ? (
            <div className="card">
              <div className="card__body">
                <Table
                  limit="10"
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={listReclamation}
                  renderBody={(item, index) => renderBody(item, index)}
                />
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reclamations;
