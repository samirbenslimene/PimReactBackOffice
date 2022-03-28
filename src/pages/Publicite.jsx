import React from "react";
import { useState } from "react";
import Badge from "../components/badge/Badge";
import Table from "../components/table/Table";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Publicite = () => {
  const history = useHistory();
  if (localStorage.getItem("id") === null) {
    //check condition
    history.push("/login");
  }
  const [openadd, setopenadd] = useState(false);
  const [opendetail, setopendetail] = useState(false);
  const [dataReady, setdataReady] = useState(false);
  const [listPub, setlistPub] = useState([]);
  const [pubToAdd, setpubToAdd] = useState({
    location: "",
    size: "",
    price: "",
    description: "",
  });
  const [currentPub, setcurrentPub] = useState({
    id: "",
    name: "",
    price: "",
    size: "",
    description: "",
    status: "",
  });
  const addToBD = () => {
    console.log(pubToAdd);
    axios
      .post("http://localhost:4000/api/publicite", {
        name: pubToAdd.location,
        description: pubToAdd.description,
        price: pubToAdd.price,
        size: pubToAdd.size,
      })
      .then(async (res) => {
        if (res.status == 201) {
          closeAddPub();
          setpubToAdd({});
          setdataReady(false);

          await setlistPub((listPub) => [...listPub, res.data["publicite"]]);
          setdataReady(true);
        }
      });
  };
  React.useEffect(async () => {
    await axios.get("http://localhost:4000/api/publicite").then((res) => {
      setlistPub(res.data["publicites"]);
      setdataReady(true);
    });
  }, []);
  const pubTableHead = ["", "location", "price", "size", "status"];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index} onClick={() => openpubdetail(item)}>
      <td>{item._id}</td>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>{item.size}</td>
      {item.status ? (
        <td>
          <Badge type={pubStatus["indisponible"]} content="indisponible" />
        </td>
      ) : (
        <td>
          <Badge type={pubStatus["disponible"]} content="disponible" />
        </td>
      )}

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
  const louer = async () => {
    await axios
      .put("http://localhost:4000/api/publicite", currentPub)
      .then(async (res) => {
        setcurrentPub((prev) => ({
          id: prev.id,
          name: prev.name,
          size: prev.size,
          price: prev.price,
          description: prev.description,
          status: true,
        }));
        window.location.reload(false);
      });
  };
  const deleteAll = () => {
    axios.delete("http://localhost:4000/api/publicite/all").then((res) => {
      window.location.reload(false);
    });
  };
  const makedispo = () => {
    axios
      .put("http://localhost:4000/api/publicite/dispo", currentPub)
      .then(async (res) => {
        setcurrentPub((prev) => ({
          id: prev.id,
          name: prev.name,
          size: prev.size,
          price: prev.price,
          description: prev.description,
          status: false,
        }));
        window.location.reload(false);
      });
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
                      value={pubToAdd.location}
                      onChange={(e) =>
                        setpubToAdd((prev) => ({
                          location: e.target.value,
                        }))
                      }
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
                      value={pubToAdd.price}
                      onChange={(e) =>
                        setpubToAdd((prev) => ({
                          location: prev.location,
                          price: e.target.value,
                        }))
                      }
                      placeholder="price ..."
                    />
                  </div>
                  <label>Puclicite description</label>
                  <br />
                  <br />
                  <div className="col-10">
                    {" "}
                    <input
                      placeholder="description ..."
                      className="input"
                      type="text"
                      value={pubToAdd.description}
                      onChange={(e) =>
                        setpubToAdd((prev) => ({
                          location: prev.location,
                          price: prev.price,
                          description: e.target.value,
                        }))
                      }
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
                      value={pubToAdd.size}
                      onChange={(e) =>
                        setpubToAdd((prev) => ({
                          location: prev.location,
                          price: prev.price,
                          description: prev.description,
                          size: e.target.value,
                        }))
                      }
                      placeholder=" 4*4..."
                    />
                  </div>
                  <br />
                  <br />
                  <div className="row">
                    <div className="col-3">
                      {" "}
                      <button className="button col-8" onClick={addToBD}>
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
              <div className="card col-8">
                <div className="card_body">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-8">
                        {" "}
                        <p>Location :</p>
                        <h3>{currentPub.name}</h3>
                      </div>
                      <div className="col-4">
                        {currentPub.status ? (
                          <button className="button col-10" onClick={makedispo}>
                            make disponible
                          </button>
                        ) : (
                          <button className="button col-8" onClick={louer}>
                            Louer
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="col-6">Price :</p>
                  <h4 className="col-6">{currentPub.price}</h4>
                  <p className="col-6">Size :</p>
                  <h4 className="col-6">{currentPub.size}</h4>
                  <p className="col-6">Status :</p>
                  <div className="col-6">
                    {currentPub.status ? (
                      <td>
                        <Badge
                          type={pubStatus["indisponible"]}
                          content="indisponible"
                        />
                      </td>
                    ) : (
                      <td>
                        <Badge
                          type={pubStatus["disponible"]}
                          content="disponible"
                        />
                      </td>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            {dataReady ? (
              <div className="card">
                <div className="row">
                  <div className="col-9"></div>
                  <button className="button col-2" onClick={deleteAll}>
                    clear all
                  </button>
                </div>

                <div className="card__body">
                  <Table
                    limit="10"
                    headData={pubTableHead}
                    renderHead={(item, index) => renderHead(item, index)}
                    bodyData={listPub}
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
    </div>
  );
};
export default Publicite;
