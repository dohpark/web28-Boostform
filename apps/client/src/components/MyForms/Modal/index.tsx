import { useQueryClient } from "@tanstack/react-query";
import EditNameModal from "@/components/MyForms/Modal/EditFormNameModal";
import DeleteSurveyModal from "@/components/MyForms/Modal/DeleteFormModal";
import { useMyForms } from "@/store/myForms";

interface ModalProps {
  closeModal: () => void;
}

export default function Modal({ closeModal }: ModalProps) {
  const { modalType, selectedFormId } = useMyForms();

  const queryClient = useQueryClient();
  const refetchData = () => queryClient.invalidateQueries({ queryKey: ["myForm"] });

  return (
    <>
      {modalType === "change" ? (
        <EditNameModal closeModal={closeModal} selectedFormId={selectedFormId} refetchData={refetchData} />
      ) : null}
      {modalType === "delete" ? (
        <DeleteSurveyModal closeModal={closeModal} selectedFormId={selectedFormId} refetchData={refetchData} />
      ) : null}
    </>
  );
}
