import React from "react";
import { useState } from "react";
import publist from "../assets/JsonData/publicite-list.json";
import Badge from "../components/badge/Badge";
import Table from "../components/table/Table";
const Publicite = () => {
  const [openadd, setopenadd] = useState(false);
  const [opendetail, setopendetail] = useState(false);
  const [currentPub, setcurrentPub] = useState({
    id: "",
    location: "",
    price: "",
    size: "",
    status: "",
  });
  const pubTableHead = ["", "location", "price", "size", "status"];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index} onClick={() => openpubdetail(item)}>
      <td>{item.id}</td>
      <td>{item.location}</td>
      <td>{item.price}</td>
      <td>{item.size}</td>

      <td>
        <Badge type={pubStatus[item.status]} content={item.status} />
      </td>
      <td>{item.montant}</td>
    </tr>
  );
  const pubStatus = {
    disponible: "primary",
    indisponible: "danger",
  };
  const openpubdetail = (pub) => {
    setopendetail(false);
    setcurrentPub(pub);
    setopendetail(true);
  };
  const openAddPub = () => {
    setopenadd(true);
  };
  const closeAddPub = () => {
    setopenadd(false);
  };
  return (
    <div>
      <div>
        <h2 className="page-header">Publicité list :</h2>
        <div className="row">
          <div className="col-12">
            <button className="button col-2" onClick={openAddPub}>
              Add Publicité
            </button>
            <br />
            <br />
            {openadd ? (
              <div className="card col-6">
                <div className="card_body">
                  <label>Puclicite location</label>
                  <br />
                  <br />
                  <div className="col-10">
                    {" "}
                    <input
                      className="input"
                      type="text"
                      placeholder="location ..."
                    />
                  </div>
                  <label>Puclicite price</label>
                  <br />
                  <br />
                  <div className="col-10">
                    {" "}
                    <input
                      className="input"
                      type="text"
                      placeholder="price ..."
                    />
                  </div>
                  <label>Puclicite size</label>
                  <br />
                  <br />
                  <div className="col-10">
                    {" "}
                    <input
                      className="input"
                      type="text"
                      placeholder=" 4*4..."
                    />
                  </div>
                  <br />
                  <br />
                  <div className="row">
                    <div className="col-3">
                      {" "}
                      <button className="button col-8" onClick={closeAddPub}>
                        submit
                      </button>
                    </div>
                    <div className="col-3">
                      {" "}
                      <button className="button col-8" onClick={closeAddPub}>
                        cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            {opendetail ? (
              <div className="card col-6">
                <div className="card_body">
                  <div className="col-10">
                    <div className="row">
                      <div className="col-8">
                        {" "}
                        <p>Location :</p>
                        <h3>{currentPub.location}</h3>
                      </div>
                      <div className="col-4">
                        <button className="button col-10">Edit</button>
                      </div>
                    </div>
                  </div>

                  <p className="col-6">Price :</p>
                  <h4 className="col-6">{currentPub.price}</h4>
                  <p className="col-6">Size :</p>
                  <h4 className="col-6">{currentPub.size}</h4>
                  <p className="col-6">Status :</p>
                  <br />
                  <br />
                  <div className="col-6">
                    <Badge
                      type={pubStatus[currentPub.status]}
                      content={currentPub.status}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            <div className="card">
              <div className="card__body">
                <Table
                  limit="10"
                  headData={pubTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={publist}
                  renderBody={(item, index) => renderBody(item, index)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Publicite;
