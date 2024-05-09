import { Button } from "@/app/components/ui/button";

export function BtnCheckOut({wentClicked}:any){
    console.log(wentClicked)
    return(
        <Button variant={'outline'}>Realizar Check-Out</Button>
    )
}