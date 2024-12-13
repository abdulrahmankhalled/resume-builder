import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function SectionWrapper({ children, onAdd, addButtonText }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">{children}</div>
      {onAdd && (
        <Button variant="outline" className="w-full" onClick={onAdd}>
          <Plus className="mr-2 h-4 w-4" />
          {addButtonText}
        </Button>
      )}
    </div>
  );
}
