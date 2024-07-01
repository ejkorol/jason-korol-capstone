import { Chip } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";

export default function DreamCard() {
  return (
    <div className="h-full w-full mb-6">
      <Card radius="sm" shadow="none" style={{ backgroundColor: "#F4F4F5" }}>
        <CardBody>
          <div className="flex flex-row justify-between items-center">
            <div><h2 className="text-xl tracking-wide">Fleeting Memories</h2></div>
            <div><p className="text-sm font-mono tracking-tight">4:21 AM</p></div>
          </div>
          <Spacer y={2}/>
          <div>
            <p className="text-sm tracking-wide font-light" style={{ color: "#616161" }}>  I find myself wandering through a vast, mist-covered forest illuminated by the soft glow of moonlight. As I traverse the winding pathways I am for some reason...</p>
          </div>
          <Spacer y={2}/>
          <Chip className="text-sm" variant="shadow" radius="full" size="md" style={{ backgroundColor: "#212121", color: "#ffffff" }}>Nostalgic Journey</Chip>
        </CardBody>
      </Card>
    </div>
  );
};
