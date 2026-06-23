import { PhoneFrame } from "@/components/PhoneFrame";
import { DemoBanner } from "@/components/DemoBanner";
import { BottomNav } from "@/components/customer/BottomNav";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DemoBanner />
      <PhoneFrame nav={<BottomNav />}>
        <div className="ui-thin">{children}</div>
      </PhoneFrame>
    </div>
  );
}
