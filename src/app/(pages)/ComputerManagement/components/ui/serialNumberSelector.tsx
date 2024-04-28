// import { Label } from "@/app/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
// import { useState } from "react";

// export function RadioGroupDemo({ onValueChange }: any) {
//   const [value, setValue] = useState("");

//   const handleChange = (newValue: string) => {
//     setValue(newValue);
//     onValueChange(newValue);
//   };

//   return (
//     <RadioGroup defaultValue="serviceTag" onValueChange={handleChange}>
//       <div className="flex items-center space-x-2">
//         <RadioGroupItem value="serviceTag" id="r1" />
//         <Label htmlFor="r1">Service Tag</Label>
//       </div>
//       <div className="flex items-center space-x-2">
//         <RadioGroupItem value="serialNumber" id="r2" />
//         <Label htmlFor="r2">Serial Number</Label>
//       </div>
//     </RadioGroup>
//   );
// }
