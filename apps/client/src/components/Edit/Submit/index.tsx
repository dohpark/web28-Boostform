import Button from "@/components/common/Button";

function Submit() {
  return (
    <div className="flex justify-end mt-4 mb-8 mx-0 bg-white rounded p-5 relative overflow-hidden">
      <Button type="button" onClick={() => openModal()} className="bg-blue5 border bordery-grey3 text-white">
        저장
      </Button>
    </div>
  );
}

export default Submit;
