import { fetchRecordById } from "@/lib/data";
import { Records } from "@/lib/types/Records";
import { useSearchParams } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";

type EditFormContextType = {
  recordById: Records | null;
};

export const EditFormContext = createContext({} as EditFormContextType);

export function EditFormProvider({ children }: { children: ReactNode }) {
  const idFromSearchParams = useSearchParams().get("id")!!;

  const [recordById, setRecordById] = useState<Records | null>(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const record = await fetchRecordById(idFromSearchParams);
        setRecordById(record);
      } catch (error) {
        console.error("Erro ao buscar o registro pelo id: ", error);
      }
    };

    fetchRecord();
  }, [idFromSearchParams]);

  return (
    <EditFormContext.Provider value={{ recordById }}>
      {children}
    </EditFormContext.Provider>
  );
}
