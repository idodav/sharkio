import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import { SnifferType, useSniffersStore } from "../../stores/sniffersStores";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { EditSnifferModal } from "./EditSnifferModal";
import { DeleteSnifferModal } from "./DeleteSnifferModal";

type SnifferBoxProps = {
  sniffer: SnifferType;
};
const SnifferBox = ({ sniffer }: SnifferBoxProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-secondary p-4 rounded-xl w-full h-[200px] shadow-lg">
      <div className="flex flex-row justify-between items-center">
        <div
          className="font-bold text-lg w-40 truncate hover:scale-105 active:scale-100 cursor-pointer"
          onClick={() => {
            let params = new URLSearchParams();
            params.append("snifferId", sniffer.id);
            let queryString = params.toString();
            navigate(`${routes.ENDPOINTS}` + "?" + queryString);
          }}
        >
          {sniffer.name}
        </div>
        <div className="flex flex-row-reverse w-full ">
          <AiOutlineDelete
            className=" text-red-400 active:scale-110 text-lg cursor-pointer ml-4 hover:bg-border-color rounded-md"
            onClick={() => setIsDeleteModalOpen(true)}
          />
          <AiOutlineEdit
            className=" text-amber-400 active:scale-110 text-lg cursor-pointer hover:bg-border-color rounded-md"
            onClick={() => setIsEditModalOpen(true)}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center mt-2">
        <div className="text-sm text-gray-400">Domain</div>
        <div className="text-sm text-gray-400">
          https://{sniffer.subdomain}.{import.meta.env.VITE_PROXY_DOMAIN}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center mt-2">
        <div className="text-sm text-gray-400">Target URL</div>
        <div className="text-sm text-gray-400">{sniffer.downstreamUrl}</div>
      </div>
      <div className="flex flex-row justify-between items-center mt-2">
        <div className="text-sm text-gray-400">Port</div>
        <div className="text-sm text-gray-400">{sniffer.port || "N/A"}</div>
      </div>
      <EditSnifferModal
        sniffer={sniffer}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
      <DeleteSnifferModal
        sniffer={sniffer}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};
export const HomePage = () => {
  const { sniffers, loadSniffers } = useSniffersStore();
  const navigate = useNavigate();

  useEffect(() => {
    loadSniffers(true).then((data) => {
      if (data.length === 0) {
        navigate(routes.PROXY_CREATE);
      }
    });
  }, []);

  return (
    <div
      className={`flex flex-col bg-tertiary h-full w-[calc(100vw-56px)] p-4 overflow-y-auto`}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="text-2xl font-bold">Sniffers</div>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            navigate(routes.PROXY_CREATE);
          }}
        >
          + add
        </Button>
      </div>
      <div className="w-full border-b-[0.05px] mt-4 mb-8" />

      <div className="grid grid-cols-2 gap-2 w-full">
        {sniffers.map((sniffer) => (
          <SnifferBox sniffer={sniffer} />
        ))}
      </div>
    </div>
  );
};
