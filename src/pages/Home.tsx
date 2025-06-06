import { Button, Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../features/counter/counterSlice";
import type { RootState } from "../store";

const Home: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Counter Example</h2>
      <p className="text-lg mb-4">Count: {count}</p>
      <div className="flex gap-2">
        <Button type="primary" onClick={() => dispatch(increment())}>
          Increment
        </Button>
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      </div>
    </Card>
  );
};

export default Home;
