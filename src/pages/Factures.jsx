import React from "react";
import { useState } from "react";
import Badge from "../components/badge/Badge";
import Table from "../components/table/Table";
import axios from "axios";

const Factures = () => {
  const [openFactureDetail, setopenFactureDetail] = useState(false);
  const [dataReady, setdataReady] = useState(false);
  const [listFactures, setlistFactures] = useState([]);
  const [currentFacture, setcurrentFacture] = useState({
    id: "",
    name: "",
    email: "",
    type: "",
    montant: "",
  });
  const customerTableHead = [
    "",
    "adress",
    "email",
    "date",
    "type de paiement",
    "montant",
  ];
  const openFactureDetailaction = (facture) => {
    setopenFactureDetail(false);
    setcurrentFacture(facture);
    setopenFactureDetail(true);
  };
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index} onClick={() => openFactureDetailaction(item)}>
      <td>{item.id}</td>
      <td>{item.address}</td>
      <td>{item.email}</td>
      <td>{item.createdAt}</td>
      <td>
        <Badge type={rectlamationStatus[item.type]} content={item.type} />
      </td>
      <td>{item.prix}</td>
    </tr>
  );
  const rectlamationStatus = {
    creditcard: "primary",
    crypto: "danger",
  };
  React.useEffect(async () => {
    await axios.get("http://localhost:4000/api/facture").then((res) => {
      console.log(res.data.factures);
      setlistFactures(res.data.factures);
      setdataReady(true);
    });
  }, []);
  return (
    <div>
      {" "}
      <h2 className="page-header">Factures list :</h2>
      <div className="row">
        <div className="col-12">
          {openFactureDetail ? (
            <div className="card col-6">
              <h3>{currentFacture.name}</h3>
              <br />
              <h4>Email : {currentFacture.email}</h4>
              <br />

              <div className="row">
                <div className="col-5">
                  <p>Type of payment: </p>
                </div>
                <div className="col-1">
                  <Badge
                    type={rectlamationStatus[currentFacture.type]}
                    content={currentFacture.type}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-5">
                  <p>Montant :</p>
                </div>
                <div className="col-1">{currentFacture.prix}</div>
              </div>
              <div className="card_body"></div>
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
                  bodyData={listFactures}
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

export default Factures;
