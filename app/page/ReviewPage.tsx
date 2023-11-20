"use client";

import React, { useEffect, useState } from "react";
import { TodoType } from "../types";
import Review from "../components/Review";
import { API_URL } from "@/constants/url";
import Link from "next/link";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/allReviews`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();

    // 1分ごとにタスクを再取得
    const intervalId = setInterval(fetchReviews, 60000);
    return () => clearInterval(intervalId);
  }, [reviews]);

  const handleDelete = async (id: number) => {
    const response = await fetch(`${API_URL}/deleteReview/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setReviews((prevReviews) =>
        prevReviews.filter((review: TodoType) => review.id !== id)
      );
    }
  };

  // toggleTodoCompletion関数
  const toggleTodoCompletion = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/reviewTime/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setReviews((prevReviews) =>
        prevReviews.filter((review: TodoType) => review.id !== id)
      );
    } catch (error) {
      console.error("Error updating todo completion:", error);
    }
  };
  return (
    <div className="max-w-md mx-auto bg-slate-800 shadow-lg rounded-lg overflow-hidden mt-32 py-4 px-4">
      <div className="px-4 py-2">
        <h1 className="text-gray-50 font-bold text-2xl uppercase">
          Review List
        </h1>
      </div>
      <div>
        <Review
          reviews={reviews}
          onDelete={handleDelete}
          onComplete={toggleTodoCompletion}
        />
      </div>
      <div>
        <Link href="/">
          <h2 className="text-purple-800 font-bold">☞ TODO LIST</h2>
        </Link>
      </div>
    </div>
  );
};

export default ReviewPage;
