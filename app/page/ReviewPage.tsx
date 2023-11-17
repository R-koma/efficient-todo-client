"use client";

import React, { useEffect } from "react";
import { TodoType } from "../types";
import Review from "../components/Review";
import { useReviews } from "../hooks/useReviews";

const ReviewPage = () => {
  const { reviews, isLoading, error, mutate } = useReviews();

  useEffect(() => {
    const intervalId = setInterval(() => {
      mutate();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [mutate]);

  const filteredReviews =
    reviews?.filter(
      (review) =>
        filteredReviews.nextReviewDate &&
        new Date(review.nextReviewDate) <= new Date()
    ) || [];

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-32 py-4 px-4">
      <div className="px-4 py-2">
        <h1 className="text-gray-800 font-bold text-2xl uppercase">
          Review List
        </h1>
      </div>
      <ul className="divide-y divide-gray-200 px-4">
        {reviews?.map((review: TodoType) => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
    </div>
  );
};

export default ReviewPage;
