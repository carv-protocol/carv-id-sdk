import { ToastPortal } from "./component/ToastPortal";
import CarvID from "./component/CarvID";

function App() {
  return (
    <div className="layout">
      <CarvID />

      <ToastPortal
        theme="light"
        position="top-center"
        limit={1}
        newestOnTop
        hideProgressBar
        autoClose={2500}
        closeButton={false}
        pauseOnFocusLoss={false}
      />
    </div>
  );
}

export default App;
