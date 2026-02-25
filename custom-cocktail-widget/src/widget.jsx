import React from "react";
import { createRoot } from "react-dom/client";

function Widget() {
  return <button onClick={() => alert("widget test - Clicked!")}>Widget test button</button>;
}

const el = document.getElementById("cc-widget");
if (el) {
  createRoot(el).render(<Widget />);
}
