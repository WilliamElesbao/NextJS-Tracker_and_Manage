import { fetchCardData } from "@/lib/data";
import {
  CheckCircledIcon,
  EnterIcon,
  ExitIcon,
  GearIcon,
} from "@radix-ui/react-icons";

const iconMap = {
  available: CheckCircledIcon,
  underMaintenance: GearIcon,
  checkIn: EnterIcon,
  checkOut: ExitIcon,
};

export default async function CardWrapper() {
  const {
    numberOfAvailableMachine,
    numberOfUnderMaintenanceMachine,
    totalCheckIn,
    totalCheckOut,
  } = await fetchCardData();

  return (
    <>
      <Card title="Total Check-in" value={totalCheckIn} type="checkIn" />
      <Card
        title="Máquinas Disponíveis"
        value={numberOfAvailableMachine}
        type="available"
      />
      <Card
        title="Máquinas Em Manutenção"
        value={numberOfUnderMaintenanceMachine}
        type="underMaintenance"
      />
      <Card title="Total Check-out" value={totalCheckOut} type="checkOut" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "available" | "underMaintenance" | "checkIn" | "checkOut";
}) {
  const Icon = iconMap[type];
  return (
    <div className="border border-foreground/20 rounded-xl p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className="truncate border border-foreground/20 rounded-xl bg-background px-4 py-8 text-center text-2xl">
        {value}
      </p>
    </div>
  );
}
