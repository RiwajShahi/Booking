import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Loader2 } from 'lucide-react';

const Reviews = ({ venueId, reviews: initialReviews = [] }) => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'John Doe',
      rating: 5,
      comment: 'Amazing venue! The space was perfect for our event and the staff was very helpful.',
      date: '2024-03-15',
      likes: 12
    },
    {
      id: 2,
      name: 'Jane Smith',
      rating: 4,
      comment: 'Great location and beautiful decor. Would definitely recommend for any event.',
      date: '2024-03-10',
      likes: 8
    },
    {
      id: 3,
      name: 'Mike Johnson',
      rating: 5,
      comment: 'Excellent service and the venue exceeded our expectations. Perfect for our wedding!',
      date: '2024-03-05',
      likes: 15
    }
  ]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear any previous errors
    setError('');
  };

  const handleRatingChange = (rating) => {
    setNewReview(prev => ({
      ...prev,
      rating
    }));
  };

  const validateReview = () => {
    if (!newReview.name.trim()) {
      throw new Error('Please enter your name');
    }
    if (!newReview.comment.trim()) {
      throw new Error('Please enter your review');
    }
    if (newReview.comment.length < 10) {
      throw new Error('Review must be at least 10 characters long');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      validateReview();

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const review = {
        id: Date.now(),
        ...newReview,
        date: new Date().toISOString(),
        likes: 0
      };
      
      setReviews(prev => [review, ...prev]);
      setNewReview({
        rating: 5,
        comment: '',
        name: ''
      });
      setSuccess('Review submitted successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = (reviewId) => {
    setReviews(prev =>
      prev.map(review =>
        review.id === reviewId
          ? { ...review, likes: review.likes + 1 }
          : review
      )
    );
  };

  const averageRating = reviews.length
    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Review Summary */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reviews</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="text-4xl font-bold text-gray-800">{averageRating}</span>
            <div className="ml-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= averageRating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{reviews.length} reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* New Review Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg">
            {success}
          </div>
        )}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rating
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= newReview.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={newReview.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              name="comment"
              value={newReview.comment}
              onChange={handleInputChange}
              required
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Share your experience..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Review'
            )}
          </button>
        </div>
      </form>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-800">{review.name}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleLike(review.id)}
                className="flex items-center space-x-1 text-gray-500 hover:text-teal-600 transition-colors"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{review.likes}</span>
              </button>
            </div>
            <p className="mt-2 text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews; 