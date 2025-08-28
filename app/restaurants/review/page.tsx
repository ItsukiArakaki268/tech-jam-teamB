'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea'; // Assuming you have a Textarea component

export default function ReviewPage() {
  const [restaurantName, setRestaurantName] = useState('');
  const [tags, setTags] = useState('');
  const [review, setReview] = useState('');
  const [reviewerName, setReviewerName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend API
    console.log({ restaurantName, tags, review, reviewerName });
    alert('Review submitted! (Check console for data)');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Post a Review</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="restaurantName">Restaurant Name</label>
              <Input
                id="restaurantName"
                type="text"
                placeholder="Search for a restaurant..."
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                className="bg-gray-700 border-gray-600"
              />
              {/* In a real app, this would be a search input that uses the Shop Search API */}
            </div>
            <div className="space-y-2">
              <label htmlFor="tags">Tags</label>
              <Input
                id="tags"
                type="text"
                placeholder="e.g., Good for dates, Quiet, Good value"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="bg-gray-700 border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="review">Review</label>
              <Textarea
                id="review"
                placeholder="Write your review here..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="bg-gray-700 border-gray-600 min-h-[150px]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="reviewerName">Your Name</label>
              <Input
                id="reviewerName"
                type="text"
                placeholder="Your Name"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                className="bg-gray-700 border-gray-600"
              />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-lg">Submit Review</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// You might need to create this Textarea component if it doesn't exist in shadcn/ui by default
// Example: components/ui/textarea.tsx
/*
import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
*/
