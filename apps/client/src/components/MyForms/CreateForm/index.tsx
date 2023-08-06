import { useRouter } from "next/navigation";
import formApi from "@/api/formApi";
import Button from "@/components/common/Button";
import Plus from "@public/icons/plus.svg";

export default function CreateForm() {
  const router = useRouter();

  const onClickCreateForm = async () => {
    const { formId } = await formApi.createForm();
    router.push(`/forms/${formId}/edit`);
  };

  return (
    <div className="mt-6 mb-4">
      <Button type="button" onClick={onClickCreateForm} className="bg-blue3 text-white text-base">
        <Plus height="24" width="24" fill="white" />
        <span className="ml-1">새 설문지</span>
      </Button>
    </div>
  );
}
