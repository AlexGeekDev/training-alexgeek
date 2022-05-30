/* eslint-disable no-unused-vars */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(
  "sk_test_51L5EjnF5bIaCQA8cg11GeMXL3pKcYZA0vahd7Efb5XA24y5cIe6K0N42AR25EFOsp4izwOaDio51yyQhZPQjuLDK00YzwEYlpN"
);
admin.initializeApp();
const express = require("express");
const cors = require("cors");
const corsMail = require("cors")({ origin: true });
const nodemailer = require("nodemailer");
const createStripeAccount = express();
const portStripeAccount = 5000;
const createStripeCustomer = express();
const portCustomer = 5001;
const createStripeIdentity = express();
const portIdentity = 5002;
const createStripeIdentityReport = express();
const portIdentityReport = 5005;
const createStripePayment = express();
const portPayment = 5003;
const listPaymentMethods = express();
const portlistPaymentMethods = 5004;
const createStripePaymentInit = express();
const portPaymentInit = 5006;
const attachStripePaymentMethod = express();
const portAttachStripePaymentMethod = 5007;
const setDefaultPaymentMethod = express();
const portDefaultPaymentMethod = 5008;
const detachStripePaymentMethod = express();
const portDetachStripePaymentMethod = 5009;
const getStripeCustomer = express();
const portGetStripeCustomer = 5010;

//Create email sender //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "janz.application@gmail.com",
    pass: "VQSp8JN6n!fTTkYv",
  },
});

//export the cloud function called `sendEmail`
exports.sendEmail = functions.https.onRequest((req, res) => {
  //for testing purposes
  console.log(
    "from sendEmail function. The request object is:",
    JSON.stringify(req.body)
  );

  //enable CORS using the `cors` express middleware.
  corsMail(
    {
      origin: true,
    },
    req,
    res,
    () => {
      //get contact form data from the req and then assigned it to variables
      console.log(req.body);
      const email = req.body.data.email;
      const name = req.body.data.name;
      const message = req.body.data.message;

      //config the email message
      const mailOptions = {
        from: "janz.application@gmail.com",
        to: email,
        subject: "New message from Janz",
        text: `Dear ${name}:
      ${message}`,
      };

      //call the built in `sendMail` function and return different responses upon success and failure
      return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send({
            data: {
              status: 500,
              message: error.toString(),
            },
          });
        }

        return res.status(200).send({
          data: {
            status: 200,
            message: "sent",
          },
        });
      });
    }
  );
});

//Create Stripe Customer & Payment Method //////////////////////////////////////////////////////////////////////////////////////////
createStripeCustomer.use(
  cors({
    origin: true,
  })
);
createStripeCustomer.use(express.json());

createStripeCustomer.get("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(404).send("Create Stripe Customer, Port Online");
});

createStripeCustomer.post("/api/createCustomer", async (req, res) => {
  const { user, paymentMethodId } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: user.email,
      name: `${user.name}`,
      description: `${user.name} "Janz Customer" (created for Api Create Customers)`,
      payment_method: paymentMethodId,
    });
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2020-08-27" }
    );
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
    });

    const clientSecret = setupIntent.client_secret;

    return res.status(200).json({
      message: `Successful Create Customer`,
      customer_id: customer.id,
      ephemeralKey: ephemeralKey.secret,
      clientSecret: clientSecret,
    });
  } catch (error) {
    await snap.ref.set({ error: userFacingMessage(error) }, { merge: true });
    reportError(error, { user: context.params.userId });
  }
});

createStripeCustomer.listen(portCustomer, () => {
  console.log("Server on port", portCustomer, "Create Stripe Customer");
});

exports.createStripeCustomer = functions.https.onRequest(createStripeCustomer);

//Attach Payment Method //////////////////////////////////////////////////////////////////////////////////////////
attachStripePaymentMethod.use(
  cors({
    origin: true,
  })
);
attachStripePaymentMethod.use(express.json());

attachStripePaymentMethod.get("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(404).send("Attach payment to Customer, Port Online");
});

attachStripePaymentMethod.post("/api/attachPaymentMethod", async (req, res) => {
  const { customerId, paymentMethodId } = req.body;
  try {
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      payment_method: paymentMethodId,
      payment_method_types: ["card"],
    });

    const attachPaymentToCustomer = await stripe.paymentMethods.attach(
      paymentMethodId,
      { customer: customerId }
    );

    return res.status(200).json({
      message: `Successful Attach Payment`,
      clientSecret: setupIntent.client_secret,
      attachPaymentToCustomer,
    });
  } catch (error) {
    await snap.ref.set({ error: userFacingMessage(error) }, { merge: true });
    reportError(error, { user: context.params.userId });
  }
});

attachStripePaymentMethod.listen(portAttachStripePaymentMethod, () => {
  console.log(
    "Server on port",
    portAttachStripePaymentMethod,
    "Create Attach Payment"
  );
});

exports.attachStripePaymentMethod = functions.https.onRequest(
  attachStripePaymentMethod
);

//Set default Payment Method //////////////////////////////////////////////////////////////////////////////////////////
setDefaultPaymentMethod.use(
  cors({
    origin: true,
  })
);
setDefaultPaymentMethod.use(express.json());

setDefaultPaymentMethod.get("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(404).send("Default payment method, Port Online");
});

setDefaultPaymentMethod.post("/api/defaultPaymentMethod", async (req, res) => {
  const { customerId, paymentMethodId } = req.body;
  try {
    const customer = await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });
    return res.status(200).json({
      message: `Successful Attach Payment`,
      customer,
    });
  } catch (error) {
    await snap.ref.set({ error: userFacingMessage(error) }, { merge: true });
    reportError(error, { user: context.params.userId });
  }
});

setDefaultPaymentMethod.listen(portDefaultPaymentMethod, () => {
  console.log(
    "Server on port",
    portDefaultPaymentMethod,
    "Create Attach Payment"
  );
});

exports.setDefaultPaymentMethod = functions.https.onRequest(
  setDefaultPaymentMethod
);

//Detach Payment Method //////////////////////////////////////////////////////////////////////////////////////////
detachStripePaymentMethod.use(
  cors({
    origin: true,
  })
);
detachStripePaymentMethod.use(express.json());

detachStripePaymentMethod.get("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(404).send("Detach payment to Customer, Port Online");
});

detachStripePaymentMethod.post("/api/detachPaymentMethod", async (req, res) => {
  const { paymentMethodId } = req.body;
  try {
    const detachPaymentToCustomer = await stripe.paymentMethods.detach(
      paymentMethodId
    );

    return res.status(200).json({
      message: `Successful Detach Payment`,
      detachPaymentToCustomer,
    });
  } catch (error) {
    await snap.ref.set({ error: userFacingMessage(error) }, { merge: true });
    reportError(error, { user: context.params.userId });
  }
});

detachStripePaymentMethod.listen(portDetachStripePaymentMethod, () => {
  console.log(
    "Server on port",
    portDetachStripePaymentMethod,
    "Create Detach Payment"
  );
});

exports.detachStripePaymentMethod = functions.https.onRequest(
  detachStripePaymentMethod
);

// List Payment Methods /////////////////////////////////////////////////////////////////////////////////////////////////////////
listPaymentMethods.use(
  cors({
    origin: true,
  })
);
listPaymentMethods.use(express.json());

listPaymentMethods.get("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send("List Payment Methods, Port Online");
});

listPaymentMethods.post("/api/paymentsList", async (req, res) => {
  const { customerId } = req.body;
  try {
    const paymentList = await stripe.customers.listPaymentMethods(customerId, {
      type: "card",
    });
    return res.status(200).json({ message: `Successful List`, paymentList });
  } catch (error) {
    console.log(error);
  }
});

listPaymentMethods.listen(portlistPaymentMethods, () => {
  console.log("Server on port", portlistPaymentMethods, "List Payment Methods");
});

exports.listPaymentMethods = functions.https.onRequest(listPaymentMethods);

// Get Customer /////////////////////////////////////////////////////////////////////////////////////////////////////////
getStripeCustomer.use(
  cors({
    origin: true,
  })
);
getStripeCustomer.use(express.json());

getStripeCustomer.get("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send("Get Customer, Port Online");
});

getStripeCustomer.post("/api/getCustomer", async (req, res) => {
  const { customerId } = req.body;
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return res.status(200).json({ message: `Successful Customer`, customer });
  } catch (error) {
    console.log(error);
  }
});

getStripeCustomer.listen(portGetStripeCustomer, () => {
  console.log("Server on port", portGetStripeCustomer, "Get Customer");
});

exports.getStripeCustomer = functions.https.onRequest(getStripeCustomer);

//Create Stripe Creator Account///////////////////////////////////////////////////////////////////////////////////////////////////////////
createStripeAccount.use(
  cors({
    origin: true,
  })
);
createStripeAccount.use(express.json());

createStripeAccount.get("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send("Create Stripe Creator Account, Port Online");
});

createStripeAccount.post("/api/createAccount", async (req, res) => {
  const { email } = req.body;
  try {
    const account = await stripe.accounts.create({
      country: "US",
      type: "express",
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_type: "individual",
      business_profile: { product_description: "Your Creator Partner" },
      email: email,
    });
    const creatorId = await account.id;

    const accountLink = await stripe.accountLinks.create({
      account: creatorId,
      refresh_url: "https://example.com/reauth",
      return_url: "https://example.com/return",
      type: "account_onboarding",
    });

    const url = await accountLink.url;
    const link = await accountLink;

    return res
      .status(200)
      .json({ message: `Successful Account`, account, creatorId, url, link });
  } catch (error) {
    console.log(error);
  }
});

createStripeAccount.listen(portStripeAccount, () => {
  console.log("Server on port", portStripeAccount, "List Payment Methods");
});

exports.createStripeAccount = functions.https.onRequest(createStripeAccount);

// Create Stripe Payment ////////////////////////////////////////////////////////////////////////////////////////////////////////
createStripePayment.use(
  cors({
    origin: true,
  })
);
createStripePayment.use(express.json());

createStripePayment.get("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(404).send("Port Payment Working");
});

createStripePayment.post("/api/createService", async (req, res) => {
  const {
    paymentMethodId,
    customerId,
    amount,
    hours,
    pilotName,
    pilotLast,
    serviceId,
  } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customerId,
      payment_method: paymentMethodId,
      error_on_requires_action: true,
      description: `Hired Pilot: ${pilotName} ${pilotLast} for ${hours} hours ( Service ID: ${serviceId} )`,
      payment_method_types: ["card"],
      off_session: true,
      confirm: true,
    });

    const clientSecret = payment.client_secret;

    return res
      .status(200)
      .json({ message: "Successful Payment", clientSecret: clientSecret });
  } catch (error) {
    // Error code will be authentication_required if authentication is needed
    console.log("Error code is: ", error.code);
    const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(
      error.raw.payment_intent.id
    );
    console.log("PI retrieved: ", paymentIntentRetrieved.id);
  }
});

createStripePayment.listen(portPayment, () => {
  console.log("Server on port", portPayment);
});

exports.createStripePayment = functions.https.onRequest(createStripePayment);

// Stripe Payment Initial ///////////////////////////////////////////////////////////////////////////////////////////////////////
createStripePaymentInit.use(
  cors({
    origin: true,
  })
);
createStripePaymentInit.use(express.json());

createStripePaymentInit.get("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(404).send("Port Initial Payment Working");
});

createStripePaymentInit.post("/api/createInitialPayment", async (req, res) => {
  const { paymentMethodId, customerId, amount, hours, serviceId, pilotId } =
    req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customerId,
      payment_method: paymentMethodId,
      error_on_requires_action: true,
      description: `Initial payment service for ${hours} hours, ( Service ID: ${serviceId} ), ( Pilot: ${pilotId} )`,
      payment_method_types: ["card"],
      off_session: true,
      confirm: true,
    });

    const clientSecret = payment.client_secret;

    return res.status(200).json({
      message: "Successful Initial Payment",
      clientSecret: clientSecret,
    });
  } catch (error) {
    // Error code will be authentication_required if authentication is needed
    console.log("Error code is: ", error.code);
    const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(
      error.raw.payment_intent.id
    );
    console.log("PI retrieved: ", paymentIntentRetrieved.id);
  }
});

createStripePaymentInit.listen(portPaymentInit, () => {
  console.log("Server on port", portPaymentInit);
});

exports.createStripePaymentInit = functions.https.onRequest(
  createStripePaymentInit
);

//Create Stripe Identity //////////////////////////////////////////////////////////////////////////////////////////////////////////
createStripeIdentity.use(
  cors({
    origin: true,
  })
);
createStripeIdentity.use(express.json());

createStripeIdentity.get("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send("Create Stripe Identity, Port Online");
});

createStripeIdentity.post("/api/createIdentity", async (req, res) => {
  const { name, lastName, email } = req.body;
  try {
    const verificationSession =
      await stripe.identity.verificationSessions.create({
        type: "document",
        metadata: {
          user_id: `${email} ${name} ${lastName}`,
        },
      });
    // Return only the client secret to the frontend.
    const clientSecret = verificationSession.client_secret;
    const url = verificationSession.url;
    const id = verificationSession.id;
    const status = verificationSession.status;

    return res.status(200).json({
      message: `Successful Verification Identity`,
      clientSecret,
      url,
      id,
      status,
    });
  } catch (error) {
    console.log(error);
  }
});

createStripeIdentity.listen(portIdentity, () => {
  console.log("Server on port", portIdentity, "Create Stripe Identity");
});

exports.createStripeIdentity = functions.https.onRequest(createStripeIdentity);

// Create Stripe Identity Report /////////////////////////////////////////////////////////////////////////////////////////////////
createStripeIdentityReport.use(
  cors({
    origin: true,
  })
);
createStripeIdentityReport.use(express.json());

createStripeIdentityReport.get("/api/identityReport", async (req, res) => {
  let id = req.query.id;
  const verificationSession =
    await stripe.identity.verificationSessions.retrieve(id);
  const status = verificationSession.status;
  return res.status(200).json({
    message: `Successful Identity Report`,
    verificationSession,
    status,
  });
});

createStripeIdentityReport.listen(portIdentityReport, () => {
  console.log(
    "Server on port",
    portIdentityReport,
    "Create Stripe Identity Report"
  );
});

exports.createStripeIdentityReport = functions.https.onRequest(
  createStripeIdentityReport
);
