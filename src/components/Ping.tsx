import { Dispatch, SetStateAction } from "react";

interface Prop {
  content: string;
  setDisplayContent: Dispatch<SetStateAction<string>>;
}
function Ping({ content, setDisplayContent }: Prop) {
  return (
    <>
      <span
        className="cursor-pointer absolute bottom-3 right-3 flex h-5 w-5"
        onClick={() => setDisplayContent(content)}
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-5 w-5 bg-sky-500"></span>
      </span>
    </>
  );
}

export default Ping;
