import axios from "axios";

const payload = {
  name: "jon Doe",
  email: "divyanibhusa@gmail.com",
  phoneNo: "7962776025",
  message: "hiiii",
  formType: "CONTACT",
  turnstileToken: "0.XXXX"
};

async function run() {
  try {
    const res = await axios.post(
      "https://devangdevelopersllpbackend.onrender.com/api/contact/connect-request",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:5173",
        },
      }
    );
    console.log("SUCCESS:", res.status, res.data);
  } catch (err) {
    if (err.response) {
      console.log("ERROR RESPONSE:", err.response.status, err.response.data);
    } else {
      console.log("NETWORK/OTHER ERROR:", err.message);
    }
  }
}

run();
