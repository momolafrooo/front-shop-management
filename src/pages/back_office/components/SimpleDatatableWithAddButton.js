import React, { useEffect, useState } from "react";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "react-bootstrap/Modal";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

import { useHistory } from "react-router-dom";
import "./css/dt-global_style.css";
import { Button } from "@material-ui/core";

function SimpleDatatable({
  columns,
  data,
  onConfirm,
  editURL,
  viewURL,
  title,
}) {
  const [items, setItems] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [query, setQuery] = useState("");
  const history = useHistory();
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    setItems(data);
  }, [data]);

  function handleItemsPerPage(e) {
    setItemsPerPage(parseInt(e.target.value));
  }

  function handleChangePage(event, newPage) {
    setCurrentPage(newPage);
  }

  function handleSearch(e) {
    setQuery(e.target.value);
  }

  function checkQuery(item) {
    const keys = Object.keys(columns);
    const lower_case_query = query.toLocaleLowerCase();
    let found = false;

    for (const key of keys) {
      //   console.log("item key ", item[key]);
      const lower_case_item = item[key] && item[key].toLocaleLowerCase();
      if (lower_case_item && lower_case_item.includes(lower_case_query)) {
        found = true;
        break;
      }
    }
    return found;
  }

  function search() {
    if (!items) {
      return [];
    }

    const indexOfLastItem =
      currentPage === 0 ? itemsPerPage : (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const new_items = items.filter((item) => checkQuery(item));

    const currentItems = new_items.slice(indexOfFirstItem, indexOfLastItem);
    return currentItems;
  }

  const handleClose = () => {
    setShowDeleteModal(false);
    setSelectedId(null);
  };

  const handleConfirm = async () => {
    await onConfirm(selectedId)
      .then((response) => {
        const new_items = items.filter((item) => item.id !== selectedId);
        setItems(new_items);
        setShowDeleteModal(false);
        setMessage(response.data.message);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setMessage(null);
      });
    setSelectedId(null);
  };

  function isSuccess() {
    if (message && !error) {
      return "alert-success";
    } else if (!message && error) {
      return "alert-danger";
    } else {
      return "";
    }
  }

  return (
    <>
      <div className="layout-top-spacing" id="cancel-row">
        <div className="layout-spacing">
          <div className="widget-content widget-content-area br-6">
            {message || error ? (
              <div
                className={`alert ${isSuccess()} mb-4`}
                style={{ width: "100%" }}
                role="alert"
              >
                <button
                  style={{ fontSize: "0.5rem" }}
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <CloseIcon color="primary" />
                </button>
                {message || (
                  <ul>
                    {error.map((error, index) => (
                      <li key={index} className="text-danger font-weight-bold">
                        {error}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              ""
            )}
            <div className="d-flex justify-content-between mb-4">
              <div className="title">
                <h5>{title}</h5>
              </div>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setShowAddModal(true)}
              >
                Ajouter
              </Button>
            </div>
            <div className="mb-4 mt-4">
              <div className="d-sm-flex justify-content-between">
                <div className="form-group">
                  <input
                    type="search"
                    className="form-control"
                    name="search"
                    id="search"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Recherche..."
                  />
                </div>
                <div className="form-group d-flex">
                  <select
                    name="item_per_page"
                    className="custom-select mr-3"
                    id="item_per_page"
                    onChange={handleItemsPerPage}
                    value={itemsPerPage}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                  </select>
                  <span>par page</span>
                </div>
              </div>
              <div className="table-responsive-md">
                <table
                  id="multi-column-ordering"
                  className="table table-hover"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      {Object.keys(columns).map((key) => (
                        <th key={key}>{columns[key]}</th>
                      ))}
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!items || items.length === 0 ? (
                      <tr>
                        <td
                          colSpan={Object.keys(columns).length + 1}
                          style={{ textAlign: "center" }}
                        >
                          <CircularProgress />
                        </td>
                      </tr>
                    ) : (
                      search().map((item) => (
                        <tr key={item.id}>
                          {Object.keys(columns).map((key) => (
                            <td key={key}>
                              <div className="d-flex">
                                <p className="align-self-center mb-0 admin-name">
                                  {item[key]}
                                </p>
                              </div>
                            </td>
                          ))}
                          <td className="d-flex">
                            <IconButton
                              color="inherit"
                              aria-label="upload picture"
                              component="span"
                              size="small"
                              className="mr-1"
                              onClick={(e) => {
                                e.preventDefault();
                                history.push(viewURL + item.id);
                              }}
                            >
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                              size="small"
                              className="mr-1"
                              onClick={(e) => {
                                e.preventDefault();
                                return history.push(editURL + item.id);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              aria-label="upload picture"
                              component="span"
                              size="small"
                              className="mr-1"
                              id={item.id}
                              onClick={(e) => {
                                e.preventDefault();
                                setShowDeleteModal(true);
                                setSelectedId(item.id);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <TablePagination
                component="div"
                count={items.length || 0}
                page={currentPage}
                labelRowsPerPage="Boutiques par page"
                rowsPerPageOptions={[5, 10, 15, 20, 30, 50]}
                onChangePage={handleChangePage}
                rowsPerPage={itemsPerPage}
                onChangeRowsPerPage={handleItemsPerPage}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        animation={false}
        show={showDeleteModal}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Supprimer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="modal-text">
            Voulez-vous vraiment supprimer cet élément ?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn" onClick={handleClose} data-dismiss="modal">
            <i className="flaticon-cancel-12"></i> Non
          </button>
          <button
            onClick={handleConfirm}
            type="button"
            className="btn btn-danger"
          >
            Oui
          </button>
        </Modal.Footer>
      </Modal>
      {/* Modal add expenses */}
      <Modal
        animation={false}
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une dépense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="modal-text">un formulaire pour ajouter une dépense</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn"
            onClick={() => setShowAddModal(false)}
            data-dismiss="modal"
          >
            <i className="flaticon-cancel-12"></i> Non
          </button>
          <button onClick={() => {}} type="button" className="btn btn-danger">
            Enregistrer
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SimpleDatatable;
