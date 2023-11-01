import { useState } from "react";
import { GiSharkFin } from "react-icons/gi";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { DeleteSnifferModal } from "./DeleteSnifferModal";
import { EditSnifferModal } from "./EditSnifferModal";
import { AddSnifferModal } from "./AddSnifferModal";
import { Sniffer, useSniffersStore } from "../../stores/sniffersStores";

type SniffersSideBarProps = {
  activeSniffer?: Sniffer;
  setActiveSniffer: (sniffer: Sniffer) => void;
};
export const SniffersSideBar = ({
  activeSniffer,
  setActiveSniffer,
}: SniffersSideBarProps) => {
  const [selectedSniffer, setSelectedSniffer] = useState<Sniffer | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const { sniffers, loadSniffers } = useSniffersStore();

  const onAddSnifferModalClose = () => {
    setIsAddModalOpen(false);
    loadSniffers();
  };

  const onEditSnifferModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedSniffer(null);
    loadSniffers();
  };

  const onEditSniffer = (sniffer: Sniffer) => {
    setSelectedSniffer(sniffer);
    setIsEditModalOpen(true);
  };

  const onDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedSniffer(null);
    loadSniffers();
  };

  const onDeleteSniffer = (sniffer: Sniffer) => {
    setSelectedSniffer(sniffer);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="relative min-w-[240px] border-r-[0.1px] border-[#3a3a3a]">
      <div className="flex h-16 items-center p-2 mb-2 justify-between">
        <div className="text-white text-xl font-bold">Sniffers</div>
        <AiOutlinePlus
          className="text-blue-200 text-xl hover:cursor-pointer active:scale-110"
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>
      <AddSnifferModal
        isOpen={isAddModalOpen}
        onClose={onAddSnifferModalClose}
      />
      {selectedSniffer && (
        <EditSnifferModal
          isOpen={isEditModalOpen}
          onClose={onEditSnifferModalClose}
          sniffer={selectedSniffer}
        />
      )}
      {selectedSniffer && (
        <DeleteSnifferModal
          isOpen={isDeleteModalOpen}
          onClose={onDeleteModalClose}
          sniffer={selectedSniffer}
        />
      )}

      {sniffers.map((sniffer, i) => (
        <div
          key={i}
          className={`group flex h-10 items-center px-2 shadow-lg border-b-[0.1px] border-[#3a3a3a] cursor-pointer hover:bg-[#232323] transition-colors active:first:bg-[#232323] ${
            activeSniffer?.id === sniffer.id && "bg-[#232323]"
          }`}
        >
          <div
            className="flex items-center w-full active:scale-105 h-full"
            onClick={() => setActiveSniffer(sniffer)}
          >
            <GiSharkFin className="text-blue-200 mr-2" />
            <div className="text-white text-sm">{sniffer.name}</div>
          </div>
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100">
            <AiOutlineEdit
              className="opacity-0 group-hover:opacity-100 text-amber-200 active:scale-110 text-lg"
              onClick={() => onEditSniffer(sniffer)}
            />
            <AiOutlineDelete
              className="opacity-0 group-hover:opacity-100 text-red-200 active:scale-110 text-lg"
              onClick={() => onDeleteSniffer(sniffer)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
