import TodoPage from "./pages/TodoPage";
import ReviewPage from "./pages/reviewpage";

export default function Home() {
  return (
    <div className="flex flex-row justify-center items-start space-x-4">
      <div className="w-1/2">
        <TodoPage />
      </div>
      <div className="w-1/2">
        <ReviewPage />
      </div>
    </div>
  );
}
