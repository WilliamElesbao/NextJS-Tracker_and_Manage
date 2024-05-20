import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  fetchLatestCheckInOut,
  fetchTechById,
  fetchUserById,
} from "@/lib/data";
import { EnterIcon, ExitIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { format } from "date-fns";

const iconMap = {
  checkIn: EnterIcon,
  checkOut: ExitIcon,
};

export default async function LatestCheckInOut() {
  const { latestCheckIn, latestCheckOut } = await fetchLatestCheckInOut();
  const givenBackBy = await fetchTechById(latestCheckOut?.givenBackBy_tech_FK!);
  const whoReceived = await fetchUserById(latestCheckOut?.WhoReceived_user_FK!);

  return (
    <div className="flex flex-col gap-3">
      {latestCheckIn && (
        <CardCheckIn
          title="Último Check-In"
          tickerNumber={latestCheckIn?.ticketNumber!}
          hostname={latestCheckIn?.hostname!}
          broughtBy={latestCheckIn?.user.name!}
          receivedBy={latestCheckIn?.technician.username!}
          computerStatus={latestCheckIn?.computerStatus!}
          type="checkIn"
        />
      )}
      {latestCheckOut && (
        <CardCheckOut
          title="Último Check-Out"
          tickerNumber={latestCheckOut!.ticketNumber!}
          hostname={latestCheckOut!.hostname!}
          broughtBy={givenBackBy?.username!}
          receivedBy={whoReceived?.name!}
          computerStatus={latestCheckOut!.computerStatus!}
          checkOutDate={latestCheckOut!.checkOutDate!}
          type="checkOut"
        />
      )}
    </div>
  );
}

export function CardCheckIn({
  title,
  tickerNumber,
  hostname,
  broughtBy,
  receivedBy,
  computerStatus,
  type,
}: {
  title?: string | null;
  tickerNumber?: string | number | null;
  hostname?: string | null;
  broughtBy?: string | number | null;
  receivedBy?: string | null;
  computerStatus?: string | null;
  type: "checkIn" | "checkOut";
}) {
  const Icon = iconMap[type];

  return (
    <div className="border border-foreground/20 rounded-xl p-2 shadow-sm w-auto">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      {tickerNumber && (
        <Table>
          <TableCaption>Última entrada registrada</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="truncate text-center">
                Número SATI
              </TableHead>
              <TableHead className="truncate text-center">Hostname</TableHead>
              <TableHead className="truncate text-center">Status</TableHead>
              <TableHead className="truncate text-center">
                Entregue por
              </TableHead>
              <TableHead className="truncate text-center">
                Recebido por
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="truncate text-center">
              <TableCell>{tickerNumber}</TableCell>
              <TableCell>{hostname}</TableCell>
              <TableCell className="flex justify-center items-center mt-1">
                <span
                  className={clsx("h-2 w-2 rounded-full", {
                    "bg-lime-600": computerStatus === "available",
                    "bg-amber-400": computerStatus === "underMaintenance",
                    "bg-destructive": computerStatus === "obsolete",
                  })}
                />
              </TableCell>
              <TableCell>{broughtBy}</TableCell>
              <TableCell>{receivedBy}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export function CardCheckOut({
  title,
  tickerNumber,
  hostname,
  broughtBy,
  receivedBy,
  computerStatus,
  checkOutDate,
  type,
}: {
  title: string;
  tickerNumber: string | number;
  hostname: string;
  broughtBy: string | number;
  receivedBy: string;
  computerStatus: string;
  checkOutDate: Date;
  type: "checkIn" | "checkOut";
}) {
  const Icon = iconMap[type];

  return (
    <div className="border border-foreground/20 rounded-xl p-2 shadow-sm w-auto">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <Table className="">
        <TableCaption>Última saída registrada</TableCaption>
        <TableHeader>
          <TableRow className="truncate text-center">
            <TableHead className="truncate text-center">Número SATI</TableHead>
            <TableHead className="truncate text-center">Hostname</TableHead>
            <TableHead className="truncate text-center">Status</TableHead>
            <TableHead className="truncate text-center">Entregue por</TableHead>
            <TableHead className="truncate text-center">Recebido por</TableHead>
            <TableHead className="truncate text-center">Data saída</TableHead>
          </TableRow>
        </TableHeader>
        {checkOutDate ? (
          <TableBody>
            <TableRow className="truncate text-center">
              <TableCell>{tickerNumber}</TableCell>
              <TableCell>{hostname}</TableCell>
              <TableCell className="flex justify-center items-center mt-1">
                <span
                  className={clsx("h-2 w-2 rounded-full", {
                    "bg-lime-600": computerStatus === "available",
                    "bg-amber-400": computerStatus === "underMaintenance",
                    "bg-destructive": computerStatus === "obsolete",
                  })}
                />
              </TableCell>
              <TableCell>{broughtBy}</TableCell>
              <TableCell>{receivedBy}</TableCell>
              <TableCell>
                {format(new Date(checkOutDate), "dd/MM/yyyy")}
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            <TableRow className="truncate text-center">
              <TableCell colSpan={6} className="text-muted-foreground">
                "Nenhum check-out registrado"
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </div>
  );
}
