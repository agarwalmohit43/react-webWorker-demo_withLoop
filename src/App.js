import { useEffect, useMemo, useState } from "react";
import "./styles.css";
import WorkerBuilder from "./Worker/woker-builder";
import Worker from "./Worker/testWorker";

export default function App() {
  const [sentData, setSentData] = useState(0);
  const [receivedData, setReceivedData] = useState("");

  let instance = null;
  instance = useMemo(() => new WorkerBuilder(Worker), []);

  useEffect(() => {
    instance.onmessage = (message) => {
      if (message && message.data) {
        setReceivedData(JSON.stringify(message.data));
        console.log("Message from worker", message.data);
      }
    };
  }, [instance]);

  const handleClick = (e) => {
    // console.log(e);

    if (instance.postMessage) {
      instance.postMessage({ count: sentData });
    } else {
      console.log("failed");
    }
    setSentData(sentData + 1);
  };

  console.log(instance);
  return (
    <div className="App">
      <h1>Web Worker in React</h1>
      <p>Sent Data: {sentData}</p>
      <p>
        Received Data: {receivedData ? receivedData : "Not reveived any data"}
      </p>
      <button onClick={handleClick}>Click me to start</button>
      <button onClick={() => console.log(1)}>Alternate task button</button>
    </div>
  );
}
