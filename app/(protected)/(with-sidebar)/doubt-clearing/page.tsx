import DoubtClearingEmbedd from "@/components/doubt-clearing-embedd";
import React from "react";
import PanelTopbar from "@/components/panel-topbar";

const DoubtClearingPage = () => {
  return (
      <div className="rounded-lg overflow-hidden">
        <PanelTopbar suite="WahTabla" service="Doubt Clearing" />
        <DoubtClearingEmbedd />
      </div>
  );
};

export default DoubtClearingPage;
