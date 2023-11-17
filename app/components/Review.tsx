import React, { useState } from "react";
import { TodoType } from "../types";
import { useTodos } from "../hooks/useTodos";
import { API_URL } from "@/constants/url";
import { useReviews } from "../hooks/useReviews";

type ReviewProps = {
  review: TodoType;
};

const Review = ({ review }: ReviewProps) => {
  const { reviews, isLoading, error, mutate } = useReviews();

  const handleDelete = async (id: number) => {
    const response = await fetch(`${API_URL}/deleteReview/${review.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const updatedTodos = reviews.filter(
        (review: TodoType) => review.id !== id
      );

      mutate(updatedTodos);
    }
  };

  const toggleTodoCompletion = async (id: number) => {
    const response = await fetch(`${API_URL}/reviewTime/${review.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    mutate();

    // if (response.ok) {
    //   const updatedReviews = reviews.filter(
    //     (review: TodoType) => review.id !== id
    //   );

    //   mutate(updatedReviews);

    // }
  };

  return (
    <div>
      <li className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="review1"
              name="review1"
              type="checkbox"
              className="h-4 w-4 text-teal-600 focus:ring-teal-500
          border-gray-300 rounded"
              onClick={() => toggleTodoCompletion(review.id)}
            />
            <span className="ml-3 block text-lg text-gray-900 font-medium mr-2">
              {review.title}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleDelete(review.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded"
            >
              ✖
            </button>
          </div>
        </div>
      </li>
    </div>
  );
};

export default Review;
