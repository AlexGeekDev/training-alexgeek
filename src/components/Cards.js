import React, { Fragment, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import InputCard from "./InputCard";
import { useStripeDataContext } from "../context/stripeContext";
import { useUserDataContext } from "../context/userContext";
import {
  apiCreateCustomer,
  apiAttachPaymentMethod,
  apiPaymentList,
  apiDetachPaymentMethod,
  apiDefaultPaymentMethod,
  apiGetCustomer,
} from "../services/stripe";
import {
  Col,
  Row,
  Container,
  Button,
  Modal,
  Form,
  Spinner,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { FaCcAmex, FaCcMastercard, FaCcVisa } from "react-icons/fa";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../dataBase/firebase";

const Cards = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { card, setCard, setPaymentList, paymentList, setCustomer, customer } =
    useStripeDataContext();
  const { userDb } = useUserDataContext();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePaymentList = async () => {
    const { data } = await apiPaymentList.post("/api/paymentsList", {
      customerId: userDb.stripe.customerId,
    });
    if (data) {
      await setPaymentList(data.paymentList.data);
    }
  };

  const handleGetCustomer = async () => {
    const { data } = await apiGetCustomer.post("/api/getCustomer", {
      customerId: userDb.stripe.customerId,
    });
    if (data) {
      await setCustomer(data.customer);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
      billing_details: {
        name: `${userDb.name}`,
        email: userDb.email,
      },
    });

    if (error) {
      Swal.fire("Error", error.message, "error");
      console.log("Error", error);
    } else if (paymentMethod) {
      const userRef = doc(db, "users", userDb.email);
      if (!userDb.paymentMethod) {
        const { data } = await apiCreateCustomer.post("/api/createCustomer", {
          user: userDb,
          paymentMethodId: paymentMethod.id,
        });
        const stripe = {
          customerId: data.customer_id,
          ephemeralKey: data.ephemeralKey,
          clientSecret: data.clientSecret,
        };
        await updateDoc(userRef, {
          stripe,
          paymentMethod: true,
        });
      } else {
        const { data } = await apiAttachPaymentMethod.post(
          "/api/attachPaymentMethod",
          {
            customerId: userDb.stripe.customerId,
            paymentMethodId: paymentMethod.id,
          }
        );
      }
      setCard();
      handleClose();
      handlePaymentList();
      Swal.fire("Payment added", "Tu método de pago se añadio", "success");
    }
    setLoading(false);
  };

  const handleSetDefault = async (paymentId) => {
    setLoading(true);
    const { data } = await apiDefaultPaymentMethod.post(
      "/api/defaultPaymentMethod",
      {
        customerId: userDb.stripe.customerId,
        paymentMethodId: paymentId,
      }
    );
    Swal.fire("Payment default", "Tu pago predeterminado se añadio", "success");
    handlePaymentList();
    handleGetCustomer();
    setLoading(false);
  };

  const handleDetachCard = async (paymentId) => {
    setLoading(true);
    const { data } = await apiDetachPaymentMethod.post(
      "/api/detachPaymentMethod",
      {
        paymentMethodId: paymentId,
      }
    );
    Swal.fire("Payment deleted", "Tu método de pago se eliminó", "success");
    handlePaymentList();
    handleGetCustomer();
    setLoading(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className="fw-bold">
            Añade un tarjeta de débito o crédito
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className="my-3 justify-content-center">
              <Col sm="8">
                <InputCard />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {!loading ? (
            <Fragment>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={!stripe}
              >
                Enviar tarjeta
              </Button>
            </Fragment>
          ) : (
            <Spinner animation="border" variant="primary" />
          )}
        </Modal.Footer>
      </Modal>
      <Container>
        <button onClick={handleShow} className="mb-3">
          Agregar método de pago
        </button>
        <hr className="dropdown-divider" />
        {paymentList !== undefined &&
        paymentList.length > 0 &&
        customer !== undefined ? (
          paymentList.map((item, index) => {
            return (
              <Fragment key={index}>
                <Row lg={12} xs={3} className="my-3">
                  <Col className="text-center">
                    {item.card.brand === "visa" && <FaCcVisa size={40} />}
                    {item.card.brand === "mastercard" && (
                      <FaCcMastercard size={40} />
                    )}
                    {item.card.brand === "amex" && <FaCcAmex size={40} />}
                  </Col>
                  <Col md>
                    <div className="fw-bolder">{`•••• ${item.card.last4}`}</div>
                  </Col>
                  <Col md className="text-center">
                    {customer.invoice_settings.default_payment_method !==
                    item.id ? (
                      <Fragment>
                        {!loading ? (
                          <span
                            style={{ cursor: "pointer" }}
                            className="text-decoration-none"
                            size="sm"
                            onClick={() => handleSetDefault(item.id)}
                          >
                            Hacer Default
                          </span>
                        ) : (
                          <Spinner animation="border" variant="primary" />
                        )}
                      </Fragment>
                    ) : (
                      <span
                        style={{ color: "white" }}
                        className="text-decoration-none"
                        size="sm"
                      >
                        Default
                      </span>
                    )}
                  </Col>
                  <Col>
                    {!loading ? (
                      <span
                        className="text-decoration-none"
                        style={{ cursor: "pointer" }}
                        size="sm"
                        onClick={() => handleDetachCard(item.id)}
                      >
                        Eliminar
                      </span>
                    ) : (
                      <Spinner animation="border" variant="primary" />
                    )}
                  </Col>
                </Row>
                <hr className="dropdown-divider" />
              </Fragment>
            );
          })
        ) : (
          <h2>Añade un método de pago</h2>
        )}
      </Container>
    </>
  );
};

export default Cards;
