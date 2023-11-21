import TodoPage from "./pages/TodoPage";
import ReviewPage from "./pages/ReviewPage";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center space-x-4">
      <div className="w-full md:w-2/3 xl:w-3/4 max-w-4xl">
        <TodoPage />
      </div>
      <div className="w-full md:w-2/3 xl:w-3/4 max-w-4xl">
        <ReviewPage />
      </div>
    </div>
  );
}
