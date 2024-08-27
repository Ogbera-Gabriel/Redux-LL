import { Minus, Plus } from 'lucide-react';
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
} from '@/features/counter/counterSlice';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

const Counter = () => {
  const [inputvalue, setInputValue] = useState("");

  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };
  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleReset = () => {
    setInputValue("");
    dispatch(reset());
  };

  const handleIncrementByAmount = () => {
    const value = parseInt(inputvalue) || 0;
    dispatch(incrementByAmount(value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-[250px] max-w-sm items-center space-x-2 mb-4">
        <Input
          type="number"
          placeholder="Enter Number to increment by"
          value={inputvalue}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex items-center">
        <Button onClick={handleIncrement}>
          <Plus />
        </Button>
        <span className="text-5xl font-bold px-4 text-center text-foreground">
          {count}
        </span>
        <Button onClick={handleDecrement}>
          <Minus />
        </Button>
      </div>

      <Button onClick={handleReset} className="mt-4">
        Reset
      </Button>

      <Button onClick={handleIncrementByAmount} className="mt-4">
        Increment by {inputvalue}
      </Button>
    </div>
  );
};

export default Counter;
