import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Contract from "./Contract";
import ContractBtns from "./ContractBtns";

function Demo() {
  const { state } = useEth();
  const [value, setValue] = useState("?");

  const demo =
    <>
      {/* <div className="contract-container">
        <Contract value={value} />
        <ContractBtns setValue={setValue} />
      </div> */}
    </>;

  return (
    <div className="demo">
      {
        demo
      }
    </div>
  );
}

export default Demo;
