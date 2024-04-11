import { useState, useEffect } from "react";
import { Menubar } from "primereact/menubar";
import { ToggleButton } from "primereact/togglebutton";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import {
  ConfirmDialog,
  confirmDialog,
} from "primereact/confirmdialog";

export default function Desktop() {
  let date = new Date();
  date.setHours(12);
  date.setMinutes(18);
  const [time, setTime] = useState(date);

  const [checked, setChecked] = useState(false);
  const [isOnline, setOnline] = useState(false);
  const [isSecured, setSecured] = useState(true);
  const [dialog, setDialog] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [desktopFiles, setDesktopFiles] = useState([
    {
      name: "Trash",
      icon: "pi pi-trash",
      onOpen: () => {
        setDialog("trash");
        setShowDialog(true);
      },
    },
    {
      name: "Email",
      icon: "pi pi-envelope",
      onOpen: () => {
        setDialog("email");
        setShowDialog(true);
      },
    },
    {
      name: "NextLevel",
      icon: "pi pi-arrow-circle-right",
      onOpen: () => {
        setDialog("nextLevel");
        setShowDialog(true);
      }
    }
  ]);
  const [trashFiles, setTrashFiles] = useState([
    {
      name: "CrkPSW.exe",
      icon: "pi pi-lock",
      onOpen: () => {
        setDialog("crkpsw");
        setShowDialog(true);
      },
    },
  ]);
  const [wifiNetworks, setWifiNetworks] = useState([
    {
      name: "Giorno Home",
      password: "a82f7d927a72b8fe62b",
      passwordType: 1,
    },
    {
      name: "FASTWEB-72947294",
      password: "Zeb89",
      passwordType: 2,
    },
    {
      name: "DLink - 08273",
      password: "a82f7d927a72b8fe62b",
      passwordType: 1,
    },
  ]);
  const [crkpswNetwork, setCrkpswNetwork] =
    useState(null);
  const [emails, setEmails] = useState([{
    name: "Password",
    content: "ABC123ABC"
  }]);
  const [network, setNetwork] = useState(null);
  const [networkPassword, setNetworkPassword] =
    useState("");

  const [nextLevelPassword, setNextLevelPassword] = useState("");
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        return new Date(prevTime.getTime() + 1000);
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function getClockTime(time) {
    return `${time.getHours()}:${time.getMinutes()}`;
  }

  const accept = () => {
    if (isSecured) return;

    setDesktopFiles((prev) => [
      ...prev,
      trashFiles.pop(),
    ]);
    setTrashFiles([]);
  };

  const reject = () => {};

  const connect = (net) => {
    if (net.password == networkPassword) {
      setOnline(true);
    }
  };

  const confirmRestoreFile = () => {
    confirmDialog({
      message:
        "Are you sure you want to restore the file?",
      header: "Confirm Restore",
      icon: "pi pi-exclamation-triangle",
      accept: accept,
      reject: reject,
    });
  };

  return (
    <div style={styles.main}>
      <div style={styles.desktop}>
        <div style={styles.topBar}>
          <div style={styles.topBarStart}></div>
          <div style={styles.topBarEnd}>
            <i
              className="pi pi-shield red"
              style={{
                color: isSecured
                  ? "var(--gray-900)"
                  : "var(--red-500)",
              }}
              onClick={() => {
                setDialog("security");
                setShowDialog(true);
              }}
            />
            <i
              className="pi pi-wifi"
              style={{
                color: isOnline
                  ? "var(--gray-900)"
                  : "var(--gray-500)",
              }}
              onClick={() => {
                setDialog("networks");
                setShowDialog(true);
              }}
            />
            <div>{getClockTime(time)}</div>
          </div>
        </div>

        <ConfirmDialog />

        <Dialog
          header={"Defender"}
          visible={dialog == "security"}
          onHide={() => {
            setDialog(null);
            setShowDialog(false);
          }}
          style={{ width: "80%", height: "80%" }}
        >
          <div style={styles.securityContent}>
            <div>
              <span>{`Defender is ${isSecured ? "enabled" : "disabled"}`}</span>
              <span>
                <i
                  className={`pi pi-${isSecured ? "check-circle" : "exclamation-triangle"}`}
                  style={{
                    color: isSecured
                      ? "var(--green-900)"
                      : "var(---red-900)",
                  }}
                />
              </span>
            </div>
            <Button
              label={isSecured ? "Disable" : "Enable"}
              onClick={() => setSecured(!isSecured)}
            />
          </div>
        </Dialog>

        <Dialog
          header={"Trash"}
          visible={dialog == "trash"}
          onHide={() => {
            setDialog(null);
            setShowDialog(false);
          }}
          style={{ width: "80%", height: "80%" }}
        >
          <div style={styles.content}>
            {trashFiles.map((file, i) => {
              return (
                <div
                  key={i}
                  style={styles.desktopItem}
                  onClick={confirmRestoreFile}
                >
                  <i className={file.icon} style={{fontSize: "36px"}}></i>
                  <span>{file.name}</span>
                </div>
              );
            })}
          </div>
        </Dialog>

        <Dialog
          header={"Password Cracker"}
          visible={dialog == "crkpsw"}
          onHide={() => {
            setDialog(null);
            setShowDialog(false);
          }}
          style={{ width: "80%", height: "80%" }}
        >
          <div style={styles.crkpswContent}>
            {!crkpswNetwork ? (
              wifiNetworks.map((network, i) => {
                return (
                  <div
                    key={i}
                    style={styles.network}
                    onClick={() => {
                      if (network.passwordType == 1)
                        return;
                      setCrkpswNetwork(network);
                    }}
                  >
                    <i className="pi pi-wifi"></i>
                    {network.name}
                    {network.passwordType != 2 && (
                      <div
                        style={{
                          color: "var(--red-500)",
                        }}
                      >
                        {"Incompatible Password Type"}
                      </div>
                    )}

                    <div>
                      <i className="pi pi-lock"></i>
                      <span>
                        {network.passwordType == 1
                          ? "WPA-2"
                          : "WPA"}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <h1>{crkpswNetwork.name}</h1>
                <p>{crkpswNetwork.password}</p>
              </div>
            )}
          </div>
        </Dialog>

        <Dialog
          header={"Networks"}
          visible={dialog == "networks"}
          onHide={() => {
            setDialog(null);
            setShowDialog(false);
          }}
          style={{ width: "80%", height: "80%" }}
        >
          <div style={styles.networksContent}>
            {!network ? (
              wifiNetworks.map((network, i) => {
                return (
                  <div
                    key={i}
                    style={styles.network}
                    onClick={() => {
                      setNetwork(network);
                    }}
                  >
                    <i className="pi pi-wifi"></i>
                    {network.name}

                    <div>
                      <i className="pi pi-lock"></i>
                      <span>
                        {network.passwordType == 1
                          ? "WPA-2"
                          : "WPA"}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <h1>{network.name}</h1>

                <Button
                  onClick={() => setNetwork(null)}
                >
                  Back
                </Button>

                <Password
                  onInput={(e) =>
                    setNetworkPassword(e.target.value)
                  }
                  feedback={false}
                />

                <Button
                  onClick={() =>
                    isOnline
                      ? setOnline(false)
                      : connect(network)
                  }
                >
                  {isOnline ? "Disconnect" : "Connect"}
                </Button>
              </div>
            )}
          </div>
        </Dialog>

        <Dialog
          header={"Emails"}
          visible={dialog == "email"}
          onHide={() => {
            setDialog(null);
            setShowDialog(false);
          }}
          style={{ width: "80%", height: "80%" }}
        >
          <div style={styles.emailContent}>
            {isOnline ? (
              emails.map((email, i) => {
                return (
                  <div
                    key={i}
                    style={styles.email}
                    onClick={() => {}}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <i className="pi pi-envelope"></i>
                      {email.name}
                    </div>
                    <div>{email.content}</div>
                  </div>
                );
              })
            ) : (
              <div>
                <h1>{"Connection required"}</h1>
              </div>
            )}
          </div>
        </Dialog>

        <Dialog
          header={"Next Level"}
          visible={dialog == "nextLevel"}
          onHide={() => {
            setDialog(null);
            setShowDialog(false);
          }}
          style={{ width: "80%", height: "80%" }}
          >
        <h1>{"Enter Next Level Password"}</h1>
          <Password
            placeHolder={"Password"}
            feedback={false}
            onInput={(e) => {
              setNextLevelPassword(e.target.value);
            }}
            />
          <Button 
            onClick= {() => {
              if (nextLevelPassword == "ABC123ABC") {
                setDialog("youWon");
                setShowDialog(true);
              }
            }}
            ></Button>
        </Dialog>

        <Dialog
          header={"You Won"}
          visible={dialog == "youWon"}
          ><h1>YOU WON</h1></Dialog>
            
            
          
          

        <div style={styles.content}>
          {desktopFiles.map((file, i) => {
            return (
              <div
                key={i}
                style={styles.desktopItem}
                onClick={file.onOpen}
              >
                <i className={file.icon} />
                <div style={styles.desktopItemName}>
                  {file.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  main: {
    height: "100%",
    border: "1px solid black",
    borderRadius: "5px",
    overflow: "hidden",
  },
  desktop: {
    height: "100%",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgb(228, 228, 228)",
  },
  topBarStart: {
    width: "100%",
    display: "flex",
    //alignItems: "center",
    justifyContent: "flex-start",
    gap: "5px",
  },
  topBarEnd: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "5px",
    margin: "2px 5px",
  },
  menu: {
    height: "20px",
  },
  content: {
    padding: "5px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "start",
    flexWrap: "wrap",
  },
  desktopItem: {
    width: "45px",
    aspectRatio: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  desktopItemName: {
    alignSelf: "left",
    width: "100%",
    textAlign: "center",
    fontSize: "10px",
  },
  crkpswContent: {
    heiht: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  network: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "var(--gray-200)",
  },
  emailContent: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  }, 
  email: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "var(--gray-200)",
  }
};
