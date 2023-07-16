import { ReactNode, useState } from "react";

interface IProps {
  title: string;
  children: ReactNode;
}

const AccordionBasic = ({ title, children }: IProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="border border-slate-200 rounded-md">
        <button
          className={`flex items-center justify-between w-full group px-4 py-3 hover:bg-violet-200  ${
            open && "bg-violet-200"
          }`}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <div className="text-sm text-left text-slate-800 font-medium">
            {title}
          </div>
          <div className="flex items-center">
            {/* <div className="text-sm text-indigo-500 font-medium">
              {props.due && `Due ${dayjs(props.due).format("lll")}`}
            </div> */}
            <svg
              className={`w-8 h-8 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 ${
                open && "rotate-180"
              }`}
              viewBox="0 0 32 32"
            >
              <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
            </svg>
          </div>
        </button>
        <div className={`p-4  ${!open && "hidden"}`}>{children}</div>
      </div>
    </>
  );
};

export default AccordionBasic;
