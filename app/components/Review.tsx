import React, { useState } from "react";
import { TodoType } from "../types";

type ReviewProps = {
  reviews: TodoType[];
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
};

const Review = ({ reviews, onDelete, onComplete }: ReviewProps) => {
  return (
    <div>
      <ul className="divide-y divide-gray-200 px-4">
        {reviews.map((review) => (
          <li key={review.id} className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="review1"
                  name="review1"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500
            border-gray-300 rounded"
                  onClick={() => onComplete(review.id)}
                />
                <span className="ml-3 block text-lg text-gray-50 font-medium mr-2">
                  {review.title}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onDelete(review.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded"
                >
                  ✖
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Review;
