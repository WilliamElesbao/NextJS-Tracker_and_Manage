import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";

export type ErrorAlertProps = {
  description?: string;
};

export function AlertDestructive({ description }: ErrorAlertProps) {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        <span>{description}</span>
      </AlertDescription>
    </Alert>
  );
}
