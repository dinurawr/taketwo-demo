import { PhoneFrame } from "@/components/PhoneFrame";
import { DemoBanner } from "@/components/DemoBanner";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DemoBanner />
      <div className="pt-7">
        <PhoneFrame>{children}</PhoneFrame>
      </div>
    </>
  );
}
