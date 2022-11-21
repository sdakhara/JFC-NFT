// css
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.css";

// bs components
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import Spinner from "react-bootstrap/Spinner";

// libs
import React, { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

// assets
import logo from "./logo.svg";
import abi from "./abis/abi.json";

// constants
const CONTRACT_ADDRESS = "0x503CeBDCb99a9ecBA9546A324aD1c6030950321c";
const TOKEN_PRICE = 0.05;
const PRESALE_LIVE = true;

// web3modal config
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: { infuraId: "<<FILL IN>>" },
  },
};

// web3 obj inst
window.web3Modal = new Web3Modal({
  network: "mainnet",
  disableInjectedProvider: false,
  cacheProvider: false,
  providerOptions,
});

function App() {
  // hooks
  const [account, setAccount] = useState("Connect Wallet");
  const [total, setTotal] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  // funcs
  let connectWallet = async () => {
    let details = navigator.userAgent;
    let regexp = /android|iphone|kindle|ipad/i;
    let isMobileDevice = regexp.test(details);
    if (isMobileDevice) {
      // window.location.href = "metamask://dapp/opensea.io";
      // window.location.href = "https://metamask.app.link/dapp/opensea.io";
      if (!window.ethereum) {
        window.location.href = "dapp://" + window.location.hostname;
      }
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // window.location.href = "dapp://"+window.location.host;
      window.provider = new ethers.providers.Web3Provider(
        window.ethereum
      );
      console.log(window.provider);
      const signer = window.provider.getSigner();
      window.account = await signer.getAddress();
      console.log(window.account);
      setAccount(
        `${String(window.account).substring(0, 6)}...${String(
          window.account
        ).substring(38)}`
      );

      window.contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        abi,
        signer
      );
      const supply = await window.contract.totalSupply();
      setTotalSupply(supply.toNumber());
      setConnectionStatus(true);
    } else {
      const instance = await window.web3Modal.connect();
      window.provider = new ethers.providers.Web3Provider(instance);
      console.log(window.provider);
      const signer = window.provider.getSigner();
      window.account = await signer.getAddress();
      console.log(window.account);
      setAccount(
        `${String(window.account).substring(0, 6)}...${String(
          window.account
        ).substring(38)}`
      );

      window.contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        abi,
        signer
      );
      const supply = await window.contract.totalSupply();
      setTotalSupply(supply.toNumber());
      setConnectionStatus(true);
    }
  };

  let mintTokens = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Minting tokens");

    console.log(await window.contract.presaleLive());
    try {
      if (PRESALE_LIVE) {
        console.log("PRESALE IS LIVE");
        // console.log(await window.contract.isWhitelisted(window.account, proof))
        if (!(await window.contract.presaleLive())) {
          alert("Presale is not currently live!");
          setLoading(false);
          return;
        }
        // else if (!(await window.contract.isWhitelisted(window.account, proof))) {
        //   alert("Connected wallet is not whitelisted for the presale!");
        //   setLoading(false);
        //   return;
        // }
      } else {
        if (!(await window.contract.saleLive())) {
          alert("Sale is not currently live!");
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.log(e);
      alert("Please connect your Ethereum wallet!");
      setLoading(false);
      return;
    }

    var quantity = document.getElementById("tokenQuantity").value;
    console.log(quantity);
    console.log(total);
    try {
      var totalWei = ethers.utils.parseEther(String(total)).toString(10);
      console.log(totalWei);
      if (PRESALE_LIVE) {
        console.log("ETH");
        const tx = await window.contract.presaleBuy(quantity, {
          value: totalWei,
        });
        await tx.wait();
        console.log("TX FINISHED");
      } else {
        await window.contract.buy(quantity, { value: totalWei });
      }
    } catch (err) {
      console.log(err);
      if (err.code === "INVALID_ARGUMENT") {
        alert("Please select a quantity to mint!");
      } else if (err.code === 4001) {
        alert("Transaction cancelled by user!");
      } else if (err.code === -32603) {
        alert("Quantity exceeds wallet's available tokens!");
      } else if (err.code === "INSUFFICIENT_FUNDS") {
        alert("Insufficient Fund for Gas!");
      } else {
        console.log(err.code);
        alert("An error occured!");
      }
      setLoading(false);
      return;
    }

    setTotal(0);
    setLoading(false);
    e.target.reset();
  };

  let handleInputChange = (e) => {
    setTotal(
      parseFloat(parseFloat(e.target.value * TOKEN_PRICE).toPrecision(12))
    );
  };

  return (
    <div className="App">
      <Container fluid>
        <img
          className="bg-image"
          alt="background"
          src="images/background.png"
        />
        <div className="overlay"></div>
        <Row className="min-vh-100 main-bod">
          <Col>
            <div className="d-flex flex-column h-100">
              <Row>
                <Navbar expand="md" className="pb-3 pt-4">
                  <Container>
                    <Navbar.Brand>
                      <img
                        className="main-logo"
                        alt="logo"
                        src={logo}
                      />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="main-nav" />
                    <Navbar.Collapse
                      id="main-nav"
                      className="justify-content-end"
                    >
                      <Button
                        id="btn-connect"
                        className="shadow-none mob-block-btn"
                        onClick={connectWallet}
                      >
                        {account}
                      </Button>
                    </Navbar.Collapse>
                  </Container>
                </Navbar>
              </Row>
              <Row className="justify-content-md-center align-items-center flex-grow-1 pt-5 main-body">
                <Col />
                <Col xs={12} sm={8} md={8} lg={5}>
                  <h2 className="fw-bold text-center pb-3">
                    Mint A Jeweled Falcon
                  </h2>
                  <Card className="p-2">
                    <Card.Body>
                      {PRESALE_LIVE && connectionStatus
                        ? [
                          <p className="mb-0">
                            Total Minted
                          </p>,
                          <h4>
                            {totalSupply}/9990
                          </h4>,
                          <ProgressBar animated now={(totalSupply / 9990) * 100} label={`${Math.round((totalSupply / 9990) * 100)}%`}
                          />,
                          <hr className="my-3" />,
                        ]
                        : connectionStatus
                          ? [
                            <p className="mb-0">
                              Total Minted
                            </p>,
                            <h4>
                              {totalSupply}/9990
                            </h4>,
                            <ProgressBar
                              animated
                              now={
                                (totalSupply /
                                  9990) *
                                100
                              }
                              label={`${Math.round(
                                (totalSupply /
                                  9990) *
                                100
                              )}%`}
                            />,
                            <hr className="my-3" />,
                          ]
                          : null}
                      <Form onSubmit={mintTokens}>
                        <p className="mb-0 text-end">
                          Mint Price
                        </p>
                        <h4 className="text-end">
                          {TOKEN_PRICE + " "}
                          <b>ETH</b>
                        </h4>
                        <Form.Group className="mb-3">
                          {PRESALE_LIVE ? (
                            <Form.Control
                              id="tokenQuantity"
                              type="number"
                              min="1"
                              max="3"
                              placeholder="Enter mint quantity"
                              onChange={
                                handleInputChange
                              }
                            />
                          ) : (
                            <Form.Control
                              id="tokenQuantity"
                              type="number"
                              min="1"
                              max="20"
                              placeholder="Enter mint quantity"
                              onChange={
                                handleInputChange
                              }
                            />
                          )}
                        </Form.Group>
                        <div className="total-text">
                          <p className="m-0">Total</p>
                          <h5 className="m-0">
                            {total} <b>ETH</b>
                          </h5>
                        </div>
                        <div className="d-grid gap-2">
                          <Button
                            id="btn-mint"
                            className="shadow-none"
                            type="submit"
                          >
                            {!loading && "Mint"}
                            {loading && (
                              <Spinner
                                style={{
                                  marginBottom:
                                    "0.1em",
                                  marginLeft:
                                    "0.6em",
                                  marginRight:
                                    "0.6em",
                                }}
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                              />
                            )}
                          </Button>
                        </div>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
                <Col />
              </Row>
            </div>
          </Col>
          <Navbar className="pt-0 footer-nav">
            <Container>
              <div className="d-flex flex-column w-100">
                <p className="navbar-text mx-auto pt-0">
                  First 550 tokens sold at 0.05 Eth
                </p>
                <span className="navbar-text mx-auto my-0 pt-0">
                  View contract on{" "}
                  <a
                    href={`https://etherscan.io/address/${CONTRACT_ADDRESS}`}
                    target="blank"
                  >
                    <b>Etherscan</b>
                  </a>
                </span>
              </div>
            </Container>
          </Navbar>
        </Row>
      </Container>
    </div>
  );
}

export default App;
